
import express from 'express';

import { userSignup, userLogin } from '../controller/user-controller.js';
import { 
    getProductById, 
    getProducts, 
    getProductsByCategory   //  ADD THIS
} from '../controller/product-controller.js';
import { addpaymentgateway } from '../controller/dummyPayment-controller.js';

const router = express.Router();

// Auth
router.post('/signup', userSignup);
router.post('/login', userLogin);

// Products
router.get('/products', getProducts);
router.get('/product/:id', getProductById);
router.post('/payment', addpaymentgateway);  // PAYMENT ROUTE

//  NEW CATEGORY ROUTE
router.get('/products/category/:category', getProductsByCategory);

export default router;
