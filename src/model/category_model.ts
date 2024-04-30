import {bookshelfInstance} from '../config/dbconfig';
class Category extends bookshelfInstance.Model<Category>{
  get tableName() {
    return 'category';
  }
}

export default Category;