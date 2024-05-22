import { bookshelfInstance } from '../config/dbconfig';
import Cart from './cart_model';

class User extends bookshelfInstance.Model<User> {
  type!: number;
  first_name!: string;
  last_name!: string;
  password!: string;

  get tableName() {
    return 'users';
  }

  static async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await User.where<User>({ email }).fetch();
      return user;
    } catch (error) {
      return null;
    }
  }

  cartItems() {
    return this.hasMany(Cart, 'product_id');
  }
}

export default User;
