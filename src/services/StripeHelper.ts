import { NextFunction, Response } from 'express';
import { CustomRequest } from '../types/type';
import { COUPENCODE, handleResponse } from '../utils/utils';
import Order from '../model/order_model';
import OrderItem from '../model/order-items_model';

export const StripHelper = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { products, promoCode } = req.body;
    const order = new Order({
      user_id: req?.user_id,
      payment_status: 'pending',
    });

    await order.save();

    const CoupenDiscount = promoCode
      ? COUPENCODE.find((item) => item.Code === promoCode)
      : null;

    for (const item of products) {
      let unitPrice = item.price * item.quantity;
      if (item.discountPercentage) {
        unitPrice -= Math.round((unitPrice * item.discountPercentage) / 100);
      }
      if (CoupenDiscount) {
        unitPrice -= (unitPrice * CoupenDiscount.discountPercentage) / 100;
      }
      const order_id = await order.get('id');
      req.order_id = order_id;
      const orderitem = new OrderItem({
        order_id,
        product_id: item.id,
        quantity: item.quantity,
        unit_price: unitPrice,
      });
      await orderitem.save();
    }
  
    next();
  } catch (error: any) {
    console.log(error);
    return handleResponse(
      res,
      'Error occurred while creating session',
      'Internal_Server_Error',
      false,
      'Internal_Servr_Error'
    );
  }
};
