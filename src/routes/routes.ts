import express from 'express';
import { stripeSession } from '../controllers/StripeController';
import { CheckOtp, ForgotPassword, loginUser, registerUser, sendPasswordResetOtp} from '../controllers/UserController';
import { validateRegisterInputs, validateLoginInputs, validateSellerInputs, validateSendPasswordResetOtpInputs, validateForgotPasswordInputs, validateOtpInputs } from '../validations/validations';
import { registerSeller } from '../controllers/SellerController';
import { upload } from '../services/Multer';
import { GdriveService } from '../services/GdriveService';
import { addToCart, addquantity, destroyCart, findProduct, getCartProducts, minusquantity, product, removeFromCart} from '../controllers/ProductsController';
import { Auth } from '../services/AuthService';
import { StripHelper } from '../services/StripeHelper';

const router = express.Router();

router.post('/create-checkout-session', Auth, StripHelper, stripeSession);
router.post('/register', validateRegisterInputs, registerUser);
router.post('/login', validateLoginInputs, loginUser);
router.post('/seller', upload.any(), validateSellerInputs, GdriveService, registerSeller);
router.post('/addproductincart', Auth, addToCart);
router.post('/send-password-reset-otp', validateSendPasswordResetOtpInputs, sendPasswordResetOtp);
router.post('/check-otp', validateOtpInputs, CheckOtp);
router.get('/products',product);
router.get('/getproducts', Auth, getCartProducts);
router.get('/getproduct', findProduct);
router.delete('/removeproductfromcart', Auth, removeFromCart );  
router.delete('/clearCart', Auth, destroyCart);
router.patch('/add-quantity', Auth, addquantity);
router.patch('/minus-quantity', Auth, minusquantity);
router.patch('/forgot-password', validateForgotPasswordInputs, ForgotPassword);


export default router;



 
