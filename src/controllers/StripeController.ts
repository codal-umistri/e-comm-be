import { CustomRequest } from '../types/type';
import { Response } from 'express';
import Stripe from 'stripe';
import { handleResponse } from '../utils/utils';
import dotenv from 'dotenv';
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
export const stripeSession = async (req: CustomRequest, res: Response) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU'],
      },
      billing_address_collection: 'auto',
      line_items: req.lineitems,
      mode: 'payment',
      success_url: process.env.SUCCESS_URL,
      cancel_url: process.env.CANCEL_URL,
    });
    // res.json({
    //   success: true,
    //   message: 'Stripe session created successfully',
    //   id: session.id,
    // });
    return handleResponse(res,'Stripe session created successfully', 'Success', true);
  } catch (error: any) {
    console.error('Error creating stripe session:', error);
    // return res
    //   .status(500)
    //   .json({ success: false, message: 'Failed to create stripe session' });
    return handleResponse(res,'Failed to create stripe session', 'Internal_Server_Error', false, 'Internal_Server_Error');
  }
};
