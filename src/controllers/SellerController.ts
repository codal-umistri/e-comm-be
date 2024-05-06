import { Response } from 'express';
import bcrypt from 'bcrypt';
import { handleResponse, loginHelper } from '../utils/utils';
import User from '../model/user_model';
import Seller from '../model/seller_model';
import { GdriveRequest } from '../types/type';

export const registerSeller = async (req: GdriveRequest, res: Response) => {
  try {
    const {
      first_name,
      last_name,
      gender,
      email,
      password,
      business_name,
      gst_no,
      state,
      city,
      pin_code,
      mobile_no,
      street_address,
      additional_address,
    } = req.body;

    let user = await User.findByEmail(req.body?.email);

    if (!user) {
      const hashedpassword = bcrypt.hashSync(password, 10);
      const type = 2;
      const newUser = new User({
        first_name,
        last_name,
        gender,
        email,
        password: hashedpassword,
        type,
      });

      await newUser.save();
      user = newUser;
    } else {
      user.set({
        first_name,
        last_name,
        password: bcrypt.hashSync(password, 10),
        type: 2,
      });

      await user.save();
    }

    const newseller = new Seller({
      user_id: user.id,
      business_name,
      gst_no,
      state,
      city,
      pin_code,
      mobile_no,
      street_address,
      additional_address,
      gst_certificate_url: req?.uploadedFiles
        ? req.uploadedFiles[0].webViewLink
        : '',
      aadhar_card_url: req?.uploadedFiles
        ? req.uploadedFiles[1].webViewLink
        : '',
      address_proof_url: req?.uploadedFiles
        ? req.uploadedFiles[2].webViewLink
        : '',
      pan_card_url: req?.uploadedFiles ? req.uploadedFiles[3].webViewLink : '',
    });

    await newseller.save();
    return loginHelper(res, user, 2);
  } catch (error: any) {
    if (error.code === 'ER_DUP_ENTRY') {
      console.error('Duplicate entry error:', error);
      return handleResponse(res, 'Registration failed: GST number already exists.', 'Bad_Request', false, 'Bad_Request');
    } else {
      console.error('Failed to register seller and upload files:', error);
      return handleResponse(res, 'Failed to register seller and upload files. Please try again later.', 'Internal_Server_Error', false, 'Internal_Server_Error');
    }
  }
};
