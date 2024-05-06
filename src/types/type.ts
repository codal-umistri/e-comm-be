import { Request } from 'express';
export interface Code {
  Code: string;
  discountPercentage: number;
}
export interface File {
  fileId: string;
  fileName: string;
  mimeType: string;
  webViewLink: string;
}
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}
export interface CartItem {
  item: Product;
  quantity: number;
}
export interface CustomRequest extends Request {
  lineitems?: {
    price_data: {
      currency: string;
      product_data: {
        name: string;
        images: string[];
      };
      unit_amount: number;
    };
    quantity: number;
  }[];
}
export interface AuthRequest extends Request {
  user_id?: string;
}
export interface GdriveRequest extends Request {
  uploadedFiles?:any[]
}
export interface StatusCodeMap {
  [message: string]: number;
}
export interface RegisterPayload {
  first_name: string;
  last_name: string;
  gender: string;
  email: string;
  password: string;
}
export interface LoginPayload {
  email: string;
  password: string;
}
export interface ResponseObj {
  message: string;
  [key: string]: any;
  key?: any;
}
