import express from 'express';
import { stripeSession } from '../controllers/StripeController';
import { StripService } from '../services/StripeService';
import { loginUser, registerUser } from '../controllers/UserController';
import { validateInputs, validateLoginInputs } from '../validations/validations';

const router = express.Router();

router.post('/create-checkout-session', StripService , stripeSession);
router.post('/register', validateInputs, registerUser);
router.post('/login', validateLoginInputs, loginUser);

export default router;
