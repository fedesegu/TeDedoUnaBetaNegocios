import express from "express";
import {getOrderByCustomerName} from "../controllers/order.controller.js";

const router = express.Router();

//router.use(authMiddleware);
//router.get('/', getOrders);
router.get('/name', getOrderByCustomerName);

export default router; 

