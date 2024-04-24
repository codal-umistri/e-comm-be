import {bookshelfInstance} from '../config/dbconfig';


class User extends bookshelfInstance.Model<User> {
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

}

export default User;
