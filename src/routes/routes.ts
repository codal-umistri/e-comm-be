import express from 'express';
import { stripeSession } from '../controllers/StripeController';
import { loginUser, registerUser} from '../controllers/UserController';
import { validateRegisterInputs, validateLoginInputs, validateSellerInputs } from '../validations/validations';
import { registerSeller } from '../controllers/SellerController';
import { upload } from '../services/Multer';
import { GdriveService } from '../services/GdriveService';
import { StripHelper } from '../services/StripeHelper';

const router = express.Router();

router.post('/create-checkout-session', StripHelper , stripeSession);
router.post('/register', validateRegisterInputs, registerUser);
router.post('/login', validateLoginInputs, loginUser);
router.post('/seller', upload.any(), validateSellerInputs, GdriveService, registerSeller);

export default router;



 
