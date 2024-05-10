import { bookshelfInstance } from '../config/dbconfig';
import Cart from './cart_model';
import Category from './category_model';
import Image from './image_model';
import Order from './order_model';

class Products extends bookshelfInstance.Model<Products> {
  get tableName() {
    return 'products';
  }
  
  category() {
    return this.belongsTo(Category, 'category_id');
  }

  images() {
    return this.hasMany(Image, 'product_id');
  }

  cartItems() {
    return this.hasMany(Cart, 'product_id');
  }

  orderItems() {
    return this.hasMany(Order, 'product_id');
  }

  static async findbyid(id: string): Promise<Products | null> {
    try {
      const notes = await Products.where<Products>({
        id: id,
      }).fetch();
      return notes;
    } catch (error) {
      return null;
    }
  }
}

export default Products;
