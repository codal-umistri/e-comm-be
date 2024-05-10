import { Response, Request } from 'express';
import { knexInstance } from '../config/dbconfig';
import { handleResponse } from '../utils/utils';
import { AuthRequest } from '../types/type';
import Cart from '../model/cart_model';
import Products from '../model/products.model';

export const product = async (req: Request, res: Response) => {
  try {
    let query = knexInstance('products')
      .select('products.*', 'category.category_name as category_name')
      .leftJoin('category', 'products.category_id', '=', 'category.id');

    const { keyword } = req.query;
    if (keyword) {
      query = query.where('title', 'like', `%${keyword}%`);
      // .orWhere('description', 'like', `%${keyword}%`);
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

    return handleResponse(
      res,
      'Fetched Successfully',
      'Success',
      true,
      undefined,
      products,
      'data'
    );
  } catch (error) {
    console.error('Error fetching products:', error);
    return handleResponse(
      res,
      'Failed to fetch products',
      'Internal_Server_Error',
      false,
      'Internal_Server_Error'
    );
  }
};

export const addToCart = async (req: AuthRequest, res: Response) => {
  try {
    const product = await knexInstance('products')
      .select('products.*', 'category.category_name as category_name')
      .leftJoin('category', 'products.category_id', '=', 'category.id')
      .where('products.id', '=', req.body.id)
      .first();

    if (!product) {
      return handleResponse(
        res,
        'Product not found',
        'Not_Found',
        false,
        'Not_Found'
      );
    }

    const images = await knexInstance('image')
      .where({ product_id: product.id })
      .select('image_data');

    const newCart = new Cart({
      user_id: req.user_id,
      product_id: req.body.id,
    });
    await newCart.save();

    const item = {
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

    return handleResponse(
      res,
      'Item added to cart',
      'Success',
      true,
      undefined,
      item
    );
  } catch (error: any) {
    console.error('Error adding item to cart:', error);
    return handleResponse(
      res,
      'Failed to add item to cart',
      'Internal_Server_Error',
      false,
      'Internal_Servr_Error'
    );
  }
};

export const removeFromCart = async (req: AuthRequest, res: Response) => {
  try {
    const cartitem = await Cart.findbyid(req.body.id, req.user_id as string);

    if (!cartitem) {
      return handleResponse(
        res,
        'There is no such item in the cart',
        'Not_Found',
        false,
        'Not_Found'
      );
    }

    const deletedItem = { ...cartitem.toJSON() };
    await cartitem.destroy();
    return handleResponse(
      res,
      'Item deleted',
      'Success',
      true,
      undefined,
      deletedItem
    );
  } catch (error: any) {
    console.error('Error deleting cart item:', error);
    return handleResponse(
      res,
      'Failed to delete cart item',
      'Internal_Server_Error',
      false,
      'Internal_Servr_Error'
    );
  }
};

export const getCartProducts = async (req: AuthRequest, res: Response) => {
  try {
    const cartitem = await knexInstance('cart').where(
      'user_id',
      '=',
      req.user_id as string
    );

    if (!cartitem) {
      return handleResponse(
        res,
        'Cart is empty',
        'Not_Found',
        false,
        'Not_Found'
      );
    }

    const cartProducts = await Promise.all(
      cartitem.map(async (item) => {
        const product = await knexInstance('products')
          .select('products.*', 'category.category_name as category_name')
          .leftJoin('category', 'products.category_id', '=', 'category.id')
          .where('products.id', '=', item.product_id)
          .first();
        if (!product) {
          return null;
        }

        const images = await knexInstance('image')
          .where({ product_id: product.id })
          .select('image_data');

        return {
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
          quantity: item.quantity,
        };
      })
    );

    const validCartProducts = cartProducts.filter(
      (product: any) => product !== null
    );

    return handleResponse(
      res,
      'Cart items fetched',
      'Success',
      true,
      undefined,
      validCartProducts
    );
  } catch (error: any) {
    console.error('Error fetching cart items:', error);
    return handleResponse(
      res,
      'Failed to fetch cart items',
      'Internal_Server_Error',
      false,
      'Internal_Servr_Error'
    );
  }
};

//for cleaering car of specific user
export const destroyCart = async (req: AuthRequest, res: Response) => {
  try {
    const id = await knexInstance('cart')
      .where('user_id', req.user_id)
      .delete();
    return handleResponse(
      res,
      'Cart items deleted successfully',
      'Success',
      true,
    );
  } catch (error: any) {
    console.error('Error deleting cart items:', error);
    return handleResponse(
      res,
      'Failed to delete cart items',
      'Internal_Server_Error',
      false,
      'Internal_Servr_Error'
    );
  }
};

export const addquantity = async (req: AuthRequest, res: Response) => {
  try {
    const cartitem = await Cart.findbyid(req.body.id, req.user_id as string);
    if (!cartitem) {
      return handleResponse(res,'Cart item not found',   'Not_Found',
        false,
        'Not_Found' );
    }
    await cartitem.save(
      { quantity: (await cartitem.get('quantity')) + 1 },
      { patch: true }
    );
    return handleResponse(
      res,
      'Cart item updated successfully',
      'Success',
      true, 
      undefined,
      cartitem.toJSON()
    );
  } catch (error: any) {
    console.error('Error updating cart item:', error);
    return handleResponse(
      res,
      'Failed to increse quantity of item',
      'Internal_Server_Error',
      false,
      'Internal_Servr_Error'
    );
  }
};

export const minusquantity = async (req: AuthRequest, res: Response) => {
  try {
    const cartitem = await Cart.findbyid(req.body.id, req.user_id as string);

    if (!cartitem) {
      return handleResponse(
        res,
        'Cart item not found',
        'Not_Found',
        false,
        'Not_Found'
      );
    }
    const quantity = await cartitem.get('quantity');
    if (quantity === 1) {
      return handleResponse(
        res,
        'Cart item cannot be updated',
        'Bad_Request',
        false,
        'Bad_Request'
      );
    }
    await cartitem.save({ quantity: quantity - 1 }, { patch: true });

    return handleResponse(
      res,
      'Cart item updated successfully',
      'Success',
      true,
      'Success',
      cartitem.toJSON()
    );
  } catch (error: any) {
    console.error('Error updating cart item:', error);
    return handleResponse(
      res,
      'Failed to decrease quantity of item',
      'Internal_Server_Error',
      false,
      'Internal_Servr_Error'
    );
  }
};

export const findProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    const product = await Products.findbyid(id as string);
    if (!product) {
      return handleResponse(
        res,
        'Product item not found',
        'Not_Found',
        false,
        'Not_Found'
      );
    }
    const images = await knexInstance('image')
      .where({ product_id: product.id })
      .select('image_data');

    const productWithImages = {
      id: await product.get('id'),
      title: await product.get('ttile'),
      description: await product.get('description'),
      price: await product.get('price'),
      discountPercentage: await product.get('discountPercentage'),
      rating: await product.get('rating'),
      stock: await product.get('stock'),
      brand: await product.get('brand'),
      thumbnail: `https://cdn.dummyjson.com/product-images/${product.id}/thumbnail.jpg`,
      images: images.map((image) => image.image_data),
    };

    return handleResponse(
      res,
      'Item fetched successfully',
      'Success',
      true,
      'Success',
      productWithImages
    );
  } catch (error: any) {
    console.error('Error fetching product:', error);
    return handleResponse(
      res,
      'Failed to find product',
      'Internal_Server_Error',
      false,
      'Internal_Servr_Error'
    );
  }
};
