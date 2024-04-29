import { handleResponses } from '../utils/utils';
import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types/type';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const Auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const secretKey = process.env.SECRET_KEY;
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
      return handleResponses(res, 'Token not provided', 'Unauthorized');
    }

    const decodedToken = jwt.verify(token, secretKey as string) as { id: string };
    req.user_id = decodedToken.id ;
    next();
  } catch (error: any) {
    return handleResponses(res, 'Invalid Token', 'Unauthorized');
  }
};