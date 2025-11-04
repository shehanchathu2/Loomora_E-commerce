import express from 'express';
import { placeOrder, placeOrderStripe, getAllOrders,verifyStripe, getUserOrders, updateStatus } from '../controllers/orderController.js';
import adminAuthendicate from "../middleware/adminAuthMiddleware.js";
import auth from '../middleware/auth.js';

const orderRouter = express.Router()

//admin
orderRouter.post('/list', adminAuthendicate, getAllOrders);
orderRouter.post('/status', adminAuthendicate, updateStatus);


//pament gateway
orderRouter.post('/placeorder',auth ,placeOrder);
orderRouter.post('/stripe',auth ,placeOrderStripe);

//frontend user
orderRouter.post('/userOrders', auth, getUserOrders);


//verify payment
orderRouter.post('/verifyStripe',auth,verifyStripe)


export default orderRouter;