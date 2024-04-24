import { Request } from 'express';
export interface Code {
  Code: string;
  discountPercentage: number;
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
export interface StatusCodeMap {
  [message: string]: number;
}
export interface RegisterPayload{
  first_name: string;
  last_name: string;
  gender: string;
  email: string;
  password: string;
  is_seller: boolean;
}
export interface LoginPayload{
  email:string, 
  password:string
}

