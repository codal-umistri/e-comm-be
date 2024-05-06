import express from 'express';
import { stripeSession } from '../controllers/StripeController';
import { loginUser, registerUser} from '../controllers/UserController';
import { validateRegisterInputs, validateLoginInputs, validateSellerInputs } from '../validations/validations';
import { registerSeller } from '../controllers/SellerController';
import { upload } from '../services/Multer';
import { GdriveService } from '../services/GdriveService';
import { StripHelper } from '../services/StripeHelper';
import { addToCart, addquantity, destroyCart, findProduct, getCartProducts, minusquantity, product, removeFromCart} from '../controllers/ProductsController';
import { Auth } from '../services/AuthService';

const router = express.Router();

router.post('/create-checkout-session', StripHelper , stripeSession);
router.post('/register', validateRegisterInputs, registerUser);
router.post('/login', validateLoginInputs, loginUser);
router.post('/seller', upload.any(), validateSellerInputs, GdriveService, registerSeller);
router.get('/products',product);
router.post('/addproductincart', Auth, addToCart);
router.get('/getproducts', Auth, getCartProducts);
router.delete('/removeproductfromcart', Auth, removeFromCart );  
router.delete('/clearCart', Auth, destroyCart);
router.get('/getproduct', findProduct);



router.patch('/add-quantity',Auth ,addquantity);
router.patch('/minus-quantity',Auth, minusquantity);
export default router;



 
