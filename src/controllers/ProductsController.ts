import { Response, Request } from 'express';
import { knexInstance } from '../config/dbconfig';
import { handleResponse } from '../utils/utils';
import { AuthRequest } from '../types/type';
import Cart from '../model/cart_model';
import Products from '../model/products.model';

export const product = async (req: Request, res: Response) => {
  try {
    let query = knexInstance('products')
      .select(
        'products.id',
        'products.title',
        'products.description',
        'products.price',
        'products.discountPercentage',
        'products.rating',
        'products.stock',
        'products.brand',
        'category.category_name as category',
        knexInstance.raw('GROUP_CONCAT(image.image_data) as images')
      )
      .leftJoin('category', 'products.category_id', '=', 'category.id')
      .innerJoin('image', 'products.id', '=', 'image.product_id')
      .groupBy('products.id', 'category.category_name');
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
    const products = await query;
    // Transform images from comma-separated string to array
    const productsWithImages = products.map((product) => ({
      ...product,
      images: product.images ? product.images.split(',') : [],
    }));
    return handleResponse(
      res,
      'Products fetched successfully',
      'Success',
      true,
      undefined,
      productsWithImages,
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
    const productWithImages = await knexInstance('products')
      .select(
        'products.id',
        'products.title',
        'products.description',
        'products.price',
        'products.discountPercentage',
        'products.rating',
        'products.stock',
        'products.brand',
        'category.category_name as category',
        knexInstance.raw('GROUP_CONCAT(image.image_data) as images')
      )
      .leftJoin('category', 'products.category_id', '=', 'category.id')
      .innerJoin('image', 'products.id', '=', 'image.product_id')
      .where('products.id', '=', req.body.id)
      .groupBy('products.id', 'category.category_name')
      .first();

    if (!productWithImages) {
      return handleResponse(
        res,
        'Product not found',
        'Not_Found',
        false,
        'Not_Found'
      );
    }

    const newCart = new Cart({
      user_id: req.user_id,
      product_id: req.body.id,
    });
    await newCart.save();

    const item = {
      id: productWithImages.id,
      title: productWithImages.title,
      description: productWithImages.description,
      price: productWithImages.price,
      discountPercentage: productWithImages.discountPercentage,
      rating: productWithImages.rating,
      stock: productWithImages.stock,
      brand: productWithImages.brand,
      category: productWithImages.category,
      thumbnail: `https://cdn.dummyjson.com/product-images/${productWithImages.id}/thumbnail.jpg`,
      images: productWithImages.images
        ? productWithImages.images.split(',')
        : [],
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
      'Internal_Server_Error'
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
    const cartItems = await knexInstance('cart').where(
      'user_id',
      '=',
      req.user_id as string
    );  

    if (!cartItems.length) {
      return handleResponse(
        res,
        'Cart is empty',
        'Not_Found',
        false,
        'Not_Found'
      );
    }

    const cartProductIds = cartItems.map((item) => item.product_id);

    const cartProducts = await knexInstance('products')
      .select(
        'products.id',
        'products.title',
        'products.description',
        'products.price',
        'products.discountPercentage',
        'products.rating',
        'products.stock',
        'products.brand',
        'category.category_name as category',
        knexInstance.raw('GROUP_CONCAT(image.image_data) as images')
      )
      .leftJoin('category', 'products.category_id', '=', 'category.id')
      .innerJoin('image', 'products.id', '=', 'image.product_id')
      .whereIn('products.id', cartProductIds)
      .groupBy('products.id', 'category.category_name');

    const cartProductsWithImages = cartProducts.map((product) => ({
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      discountPercentage: product.discountPercentage,
      rating: product.rating,
      stock: product.stock,
      brand: product.brand,
      category: product.category,
      thumbnail: `https://cdn.dummyjson.com/product-images/${product.id}/thumbnail.jpg`,
      images: product.images ? product.images.split(',') : [],
      quantity:
        cartItems.find((item) => item.product_id === product.id)?.quantity || 1,
    }));

    return handleResponse(
      res,
      'Cart items fetched',
      'Success',
      true,
      undefined,
      cartProductsWithImages
    );
  } catch (error: any) {
    console.error('Error fetching cart items:', error);
    return handleResponse(
      res,
      'Failed to fetch cart items',
      'Internal_Server_Error',
      false,
      'Internal_Server_Error'
    );
  }
};

//for cleaering car of specific user
export const destroyCart = async (req: AuthRequest, res: Response) => {
  try {
    const cart = await knexInstance('cart')
      .where('user_id', req.user_id)
      .delete();
    if (cart === 0) {
      return handleResponse(
        res,
        'Cart is already empty',
        'Not_Found',
        false,
        'Not_Found'
      );
    }
    return handleResponse(
      res,
      'Cart items deleted successfully',
      'Success',
      true
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
      return handleResponse(
        res,
        'Cart item not found',
        'Not_Found',
        false,
        'Not_Found'
      );
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

    const productWithImages = await knexInstance('products')
      .select(
        'products.id',
        'products.title',
        'products.description',
        'products.price',
        'products.discountPercentage',
        'products.rating',
        'products.stock',
        'products.brand',
        knexInstance.raw('GROUP_CONCAT(image.image_data) as images')
      )
      .innerJoin('image', 'products.id', '=', 'image.product_id')
      .where('products.id', '=', Number(id))
      .groupBy('products.id')
      .first();

    if (!productWithImages) {
      return handleResponse(
        res,
        'Product item not found',
        'Not_Found',
        false,
        'Not_Found'
      );
    }

    const productDetails = {
      id: productWithImages.id,
      title: productWithImages.title,
      description: productWithImages.description,
      price: productWithImages.price,
      discountPercentage: productWithImages.discountPercentage,
      rating: productWithImages.rating,
      stock: productWithImages.stock,
      brand: productWithImages.brand,
      thumbnail: `https://cdn.dummyjson.com/product-images/${productWithImages.id}/thumbnail.jpg`,
      images: productWithImages.images
        ? productWithImages.images.split(',')
        : [],
    };

    return handleResponse(
      res,
      'Item fetched successfully',
      'Success',
      true,
      'Success',
      productDetails
    );
  } catch (error: any) {
    console.error('Error fetching product:', error);
    return handleResponse(
      res,
      'Failed to find product',
      'Internal_Server_Error',
      false,
      'Internal_Server_Error'
    );
  }
};
