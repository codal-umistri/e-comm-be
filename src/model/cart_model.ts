import { bookshelfInstance } from '../config/dbconfig';
import Products from './products.model';
import User from './user_model';

class Cart extends bookshelfInstance.Model<Cart> {
  // id!: number;
  // user_id!: number;
  // product_id!: number;
  // quantity!: number;

  get tableName() {
    return 'cart';
  }

  user() {
    return this.belongsTo(User, 'user_id');
  }

  product() {
    return this.belongsTo(Products, 'product_id');
  }

  static async findbyid(id: string, user_id: string): Promise<Cart | null> {
    try {
      const notes = await Cart.where<Cart>({
        product_id: id,
        user_id: user_id,
      }).fetch();
      return notes;
    } catch (error) {
      return null;
    }
  }
}

export default Cart;
