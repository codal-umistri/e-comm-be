import {bookshelfInstance} from '../config/dbconfig';

class Products extends bookshelfInstance.Model<Products>{
  get tableName() {
    return 'products';
  }
}

export default Products;