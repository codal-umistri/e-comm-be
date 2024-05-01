import { Response, Request } from 'express';
import { knexInstance } from '../config/dbconfig';
import { handleResponses } from '../utils/utils';

export const product = async (req: Request, res: Response) => {
  try {
    let query = knexInstance('products')
      .select('products.*', 'category.category_name as category_name')
      .leftJoin('category', 'products.category_id', '=', 'category.id');

    const { keyword } = req.query;
    if (keyword) {
      query = query.where((builder) => {
        builder
          .where('title', 'like', `%${keyword}%`)
          .orWhere('description', 'like', `%${keyword}%`);
      });
    }
    const { category } = req.query;
    if (typeof category === 'string') {
      query = query.where('category.category_name', '=', category);
    }
    const { minPrice, maxPrice } = req.query;
    if (typeof minPrice === 'string' && typeof maxPrice === 'string') {
      query = query.whereBetween('price', [+minPrice, +maxPrice]);
    }

    const productsWithImages = await query;

    const products = await Promise.all(
      productsWithImages.map(async (product) => {
        const images = await knexInstance('image')
          .where({ product_id: product.id })
          .select('image_data');
        const productWithImages = {
          id: product.id,
          title: product.title,
          description: product.description,
          price: product.price,
          discountPercentage: product.discountPercentage,
          rating: product.rating,
          stock: product.stock,
          brand: product.brand,
          category: product.category_name,
          thumbnail: `https://cdn.dummyjson.com/product-images/${product.id}/thumbnail.jpg`,
          images: images.map((image) => image.image_data),
        };
        return productWithImages;
      })
    );

    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return handleResponses(
      res,
      'Failed to login user',
      'Internal_Server_Error'
    );
  }
};




