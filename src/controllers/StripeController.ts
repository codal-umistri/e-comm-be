import { CustomRequest } from '../types/type';
import { Response } from 'express';
import Stripe from 'stripe';
import { handleResponses } from '../utils/utils';
// import dotenv from 'dotenv';
// dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
// console.log(process.env.STRIPE_SECRET_KEY);
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
    res.json({ id: session.id });
  } catch (error:any) {
    console.log(error);
    return handleResponses(res, error.message, 'Internal_Server_Error');
  }
};



