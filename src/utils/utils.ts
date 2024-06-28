import User from '../model/user_model';
import { Code, ResponseObj, StatusCodeMap } from '../types/type';
import jwt from 'jsonwebtoken';
import { Response } from 'express';
import { knexInstance } from '../config/dbconfig';

const StatusCode: StatusCodeMap = {
  Success: 200,
  Created: 201,
  Conflict: 409,
  Not_Found: 404,
  Internal_Server_Error: 500,
  Unauthorized: 401,
  Forbidden: 403,
  Bad_Request: 400,
  Email_Error: 502
};

export const COUPENCODE: Code[] = [
  {
    Code: 'ABC',
    discountPercentage: 25,
  },
  {
    Code: 'BCD',
    discountPercentage: 15,
  },
  {
    Code: 'CDE',
    discountPercentage: 10,
  },
  {
    Code: 'XYZ',
    discountPercentage: 5,
  },
];

export const handleValidationError = (res: Response, ErrorMessage: string) => {
  return res.status(StatusCode.Bad_Request).json({ message: ErrorMessage });
};

export const handleResponse = (
  res: Response,
  message: string,
  status: string,
  success: boolean,
  error_code?: string,
  item?: any,
  itemname: string = 'item',
  obj?: any
) => {
  let responseObj: ResponseObj;

  error_code
    ? (responseObj = { message, success, error_code })
    : (responseObj = { message, success, error_code });

  if (item !== undefined) {
    responseObj[itemname] = item.toJSON ? item.toJSON() : item;
  }
  if (obj) {
    responseObj.auth = obj;
  }

  return res.status(StatusCode[status]).json(responseObj);
};

export const loginHelper = (res: Response, user: User, IsLogin: number = 1) => {
  const secretKey = process.env.SECRET_KEY;
  const token = jwt.sign({ id: user.get('id') }, secretKey as string, {
    expiresIn: '2d',
  });

  if (IsLogin === 1) {
    return handleResponse(
      res,
      'Login successful',
      'Success',
      true,
      'Success',
      undefined,
      undefined,
      { token, name: user.get('first_name'), type: user.get('type') }
    );
  } else if (IsLogin === 0) {
    return handleResponse(
      res,
      'User registered successfully',
      'Created',
      true,
      'Created',
      user,
      'user',
      { token, name: user.get('first_name'), type: user.get('type') }
    );
  } else {
    return handleResponse(
      res,
      'Seller registration successful.',
      'Created',
      true,
      'Created',
      undefined,
      undefined,
      { token, name: user.get('first_name'), type: user.get('type') }
    );
  }
};

export function generateOtp() {
  // Generate a 5-digit OTP code
  return Math.floor(10000 + Math.random() * 90000).toString();
}


// export const handleDuplicate = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const user = await User.findByEmail(req.body?.email);

//   if (user) {
//     return handleResponses(res, 'User Already exists', 'Conflict');
//   }

//   next();
// };

export async function destroy(hash: string) {
  try {
    const result = await knexInstance('otp').where({ otp_hash: hash }).del();
    if (result) {
      console.log('OTP deleted successfully');
    } else {
      console.log('OTP not found');
    }
  } catch (error) {
    console.error('Error during OTP deletion:', error);
  }
}