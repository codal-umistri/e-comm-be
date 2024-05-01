import { bookshelfInstance } from '../config/dbconfig';
import Products from './products.model';

class Image extends bookshelfInstance.Model<Image> {
  get tableName() {
    return 'image';
  }

  product() {
    return this.belongsTo(Products, 'product_id');
  }
}

export default Image;
