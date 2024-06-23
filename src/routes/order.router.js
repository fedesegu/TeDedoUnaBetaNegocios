const express = require('express');
const orderManager = require('../manager/orderManager.js');
const authMiddleware = require('../middlewares/jwt.middleware.js');
const router = express.Router();

//router.use(authMiddleware);
router.get('/', orderManager.getOrders);
router.get('/:id', orderManager.getOrderById);

module.exports = router;

