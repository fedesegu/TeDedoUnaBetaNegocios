import express from "express";
import {getOrderByCustomerName, createOrder} from "../controllers/order.controller.js";

const router = express.Router();

//router.use(authMiddleware);
//router.get('/', getOrders);
router.get('/name', getOrderByCustomerName);
router.post('/name', createOrder)

export default router; 

