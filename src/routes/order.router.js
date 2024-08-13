import {Router} from "express";
import {getOrderByCustomerName, createOrder, handlePaymentNotification} from "../controllers/order.controller.js";

const router = Router();

//router.use(authMiddleware);
//router.get('/', getOrders);
router.get('/name', getOrderByCustomerName);
router.post('/name', createOrder)
router.post('/notifications', handlePaymentNotification);

export default router; 

