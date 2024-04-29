import {bookshelfInstance} from '../config/dbconfig';


class Seller extends bookshelfInstance.Model<Seller>{
  get tableName() {
    return 'seller_information';
  }
}

export default Seller;