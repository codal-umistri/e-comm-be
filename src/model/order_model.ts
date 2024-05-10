import { bookshelfInstance } from '../config/dbconfig';
import OrderItem from './order-items_model';
import User from './user_model';

class Order extends bookshelfInstance.Model<Order> {
  get tableName() {
    return 'order';
  }

  user() {
    return this.belongsTo(User, 'user_id');
  }

  orderitems() {
    return this.hasMany(OrderItem, 'order_id');
  }

  static async findBysessionid(sessionId: string): Promise<Order | null> {
    try {
      const order = await Order.where<Order>({ session_id: sessionId }).fetch();
      return order;
    } catch (error) {
      console.error('Error fetching order by session ID:', error);
      return null;
    }
  }
  static async findByid(id: string): Promise<Order | null> {
    try {
      const order = await Order.where<Order>({ id}).fetch();
      return order;
    } catch (error) {
      console.error('Error fetching order by session ID:', error);
      return null;
    }
  }
}

export default Order;
