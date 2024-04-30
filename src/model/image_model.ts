import { bookshelfInstance } from '../config/dbconfig';

class Image extends bookshelfInstance.Model<Image> {
  get tableName() {
    return 'image';
  }
}

export default Image;
