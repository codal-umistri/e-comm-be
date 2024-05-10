import { bookshelfInstance } from '../config/dbconfig';
import Order from './order_model';
import Product from './products.model';

class OrderItem extends bookshelfInstance.Model<OrderItem> {
  get tableName() {
    return 'order_items';
  }

  order() {
    return this.belongsTo(Order, 'order_id');
  }

  product() {
    return this.belongsTo(Product, 'product_id');
  }
}

export default OrderItem;
