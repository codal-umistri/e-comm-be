import { Request, Response } from 'express';
import { handleResponses } from '../utils/utils';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();
import User from '../model/user_model';
import {  RegisterPayload,LoginPayload } from '../types/type';


export const registerUser = async ( req: Request, res: Response ) => 
{
  const {
    first_name,
    last_name,
    gender,
    email,
    password,
    is_seller,
  }: RegisterPayload = req.body;

  const hashedpassword = bcrypt.hashSync(password, 10);

  try {
    const user = await User.findByEmail(email);

    if (user) {
      return handleResponses(res, 'User Already exists', 'Conflict');
    }

    const newUser = new User({
      first_name,
      last_name,
      gender,
      email,
      password: hashedpassword,
      is_seller,
    });

    await newUser.save();
    return handleResponses(res, 'User registered successfully', 'Created', newUser, 'user');
  } catch (error: any) {
    return handleResponses(res, 'Failed to register user', 'Internal_Server_Error');
  }
};

export const loginUser = async ( req:Request, res:Response ) =>
{
  const { email, password }:LoginPayload = req.body;
  const secretKey = process.env.SECRET_KEY;
  try {
    const user = await User.findByEmail(email);
  
    if (!user) {
      return handleResponses(res, 'User Not Found', 'Not_Found');
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.get('password'));
  
    if (!isPasswordValid) {
      return handleResponses(res, 'Invalid password', 'Unauthorized');
    }
  
    const token = jwt.sign({ id: user.get('id') }, secretKey as string, {expiresIn: '2d'});

    return handleResponses(res, 'Login successful', 'Success', undefined, undefined, undefined, {token, name: user.get('first_name'), is_seller: user.get('is_seller')});
  }
  catch (error:any) {
    return handleResponses(res, 'Failed to login user', 'Internal_Server_Error'); 
  }
  
};
