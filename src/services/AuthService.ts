import { handleResponse } from '../utils/utils';
import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types/type';
import jwt, { TokenExpiredError } from 'jsonwebtoken'; // Import TokenExpiredError from jsonwebtoken
import dotenv from 'dotenv';
dotenv.config();

export const Auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const secretKey = process.env.SECRET_KEY;
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
      return handleResponse(res, 'Token not provided', 'Unauthorized', false, 'Unauthorized');
    }

    const decodedToken = jwt.verify(token, secretKey as string) as { id: string };
    req.user_id = decodedToken.id;
    
    next();
  } catch (error: any) {

    if (error instanceof TokenExpiredError) {
      return handleResponse(res, 'Token expired', 'Unauthorized', false, 'Expired');
    } else {
      return handleResponse(res, 'Invalid Token', 'Unauthorized', false, 'Unauthorized');
    }
  }
};
