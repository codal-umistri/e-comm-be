import { bookshelfInstance } from '../config/dbconfig';
import User from './user_model';

class Otp extends bookshelfInstance.Model<Otp> {
  get tableName() {
    return 'otp';
  }

  user() {
    return this.belongsTo(User, 'user_id');
  }

  static async findByOtpCode(otpCode: string): Promise<Otp | null> {
    try {
      const otp = await Otp.where<Otp>({ otp_code: otpCode }).fetch();
      return otp;
    } catch (error) {
      return null;
    }
  }

  static async findById(id: string): Promise<Otp | null> {
    try {
      const otp = await Otp.where<Otp>({ id }).fetch();
      return otp;
    } catch (error) {
      return null;
    }
  }
  static async findByHash(hash: string): Promise<Otp | null> {
    try {
      const otp = await Otp.where<Otp>({ otp_hash:hash }).fetch();
      return otp;
    } catch (error) {
      return null;
    }
  }
  static async findByHashAndCode(hash: string, otp_code: string): Promise<Otp | null> {
    try {
      const otp = await Otp.where<Otp>({ otp_hash:hash, otp_code }).fetch();
      return otp;
    } catch (error) {
      return null;
    }
  }
}

export default Otp;
