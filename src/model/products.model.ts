import {bookshelfInstance} from '../config/dbconfig';
import Category from './category_model';
import Image from './image_model';

class Products extends bookshelfInstance.Model<Products>{
  get tableName() {
    return 'products';
  }

  category() {
    return this.belongsTo(Category, 'category_id'); 
  }

  images() {
    return this.hasMany(Image, 'product_id'); 
  }
}

export default Products;