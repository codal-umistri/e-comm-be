import express from 'express';
import { stripeSession } from '../controllers/StripeController';
import { StripService } from '../services/StripeService';

const router = express.Router();

router.post('/create-checkout-session',StripService ,stripeSession);

export default router;
