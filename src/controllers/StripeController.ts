import { CustomRequest } from '../types/type';
import { Response } from 'express';
import Stripe from 'stripe';
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
    res.json({ id: session.id });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error occurred while creating session');
  }
};
