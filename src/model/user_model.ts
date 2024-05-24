import { bookshelfInstance } from '../config/dbconfig';
import Cart from './cart_model';
import Otp from './otp_model';

class User extends bookshelfInstance.Model<User> {
  type!: number;
  first_name!: string;
  last_name!: string;
  password!: string;

  get tableName() {
    return 'users';
  }
  cartItems() {
    return this.hasMany(Cart, 'product_id');
  }

  otp() {
    return this.belongsTo(Otp, 'user_id');
  }

  static async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await User.where<User>({ email }).fetch();
      return user;
    } catch (error) {
      return null;
    }
  }
  static async findByid(id: string): Promise<User | null> {
    try {
      const user = await User.where<User>({ id }).fetch();
      return user;
    } catch (error) {
      return null;
    }
  }
}

export default User;
