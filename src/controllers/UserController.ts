import { Request, Response } from 'express';
import { handleResponse, loginHelper } from '../utils/utils';
import bcrypt from 'bcrypt';
import User from '../model/user_model';
import { RegisterPayload, LoginPayload } from '../types/type';

export const registerUser = async (req: Request, res: Response) => {
  const { first_name, last_name, gender, email, password }: RegisterPayload =
    req.body;

  try {
    const user = await User.findByEmail(req.body?.email);

    if (user) {
      return handleResponse(res,'User already exists','Conflict', false, 'Conflict');
    }
    const hashedpassword = bcrypt.hashSync(password, 10);
    const type = 1;
    const newUser = new User({
      first_name,
      last_name,
      gender,
      email,
      password: hashedpassword,
      type,
    });

    await newUser.save();
    return loginHelper(res, newUser, 0);
  } catch (error: any) {
    console.log('Failed to register user');
    return handleResponse(
      res,
      'Failed to register user',
      'Internal_Server_Error',
      false,
      'Internal_Server_Error'
    );
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password }: LoginPayload = req.body;
  try {
    const user = await User.findByEmail(email);

    if (!user) {
      return handleResponse(
        res,
        'User not Found',
        'Not_Found',
        false,
        'Not_Found'
      );
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.get('password')
    );

    if (!isPasswordValid) {
      return handleResponse(
        res,
        'Invalid password',
        'Unauthorized',
        false,
        'Unauthorized'
      );
    }

    return loginHelper(res, user);
  } catch (error: any) {
    console.error('Failed to login user:', error);
    return handleResponse(
      res,
      'Failed to login user',
      'Internal_Server_Error',
      false,
      'Internal_Server_Error'
    );
  }
};
