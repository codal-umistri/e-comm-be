import { NextFunction, Response } from 'express';
import { CartItem, CustomRequest } from '../types/type';
import { COUPENCODE, handleResponses } from '../utils/utils';

export const StripHelper = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      products,
      promoCode,
    }: { products: CartItem[]; promoCode?: string } = req.body;

    const CoupenDiscount = promoCode
      ? COUPENCODE.find((item) => item.Code === promoCode)
      : null;

    const lineItems = products.map((product: CartItem) => {
      let unitPrice = product.item.price * product.quantity;
      if (product.item.discountPercentage) {
        unitPrice -= Math.round(
          (unitPrice * product.item.discountPercentage) / 100
        );
      }
      if (CoupenDiscount) {
        unitPrice -= (unitPrice * CoupenDiscount.discountPercentage) / 100;
      }
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.item.title,
            images: [product.item.images[0]],
          },
          unit_amount: Math.round(unitPrice * 100),
        },
        quantity: product.quantity,
      };
    });
    req.lineitems = lineItems;
    next();
  } catch (error: any) {
    console.log('instripe helper');
    return handleResponses(res, error.message, 'Internal_Server_Error');
  }
};
