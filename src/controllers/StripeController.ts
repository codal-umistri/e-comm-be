import { CartItem, CustomRequest } from '../types/type';
import { Response } from 'express';
import Stripe from 'stripe';
import { COUPENCODE, handleResponse } from '../utils/utils';
import dotenv from 'dotenv';
import Order from '../model/order_model';
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const stripeSession = async (req: CustomRequest, res: Response) => {
  const { products, promoCode } = req.body;

  const CoupenDiscount = promoCode
    ? COUPENCODE.find((item) => item.Code === promoCode)
    : null;

  const lineItems = products.map((product: CartItem) => {
    let unitPrice = product.price * product.quantity;
    if (product.discountPercentage) {
      unitPrice -= Math.round((unitPrice * product.discountPercentage) / 100);
    }
    if (CoupenDiscount) {
      unitPrice -= (unitPrice * CoupenDiscount.discountPercentage) / 100;
    }
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: product.title,
          images: [product.images[0]],
        },
        unit_amount: Math.round(unitPrice * 100),
      },
      quantity: product.quantity,
    };
  });
  
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU'],
      },
      billing_address_collection: 'auto',
      line_items: lineItems,
      mode: 'payment',
      success_url: process.env.SUCCESS_URL,
      cancel_url: process.env.CANCEL_URL,
    });

    const order = await Order.findByid(req?.order_id as string);
    if (!order) {
      console.error('there is order error');
    } else {
      await order.save({ session_id: session.id }, { patch: true });
    }
    return res.json({ id: session.id });
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
