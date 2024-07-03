import {orderModel} from "../../models/order.model.js";

class OrderManager {

    async findAll(){
        const response = await orderModel.find();
        return response;
    }

    async findById(id) {
        const response = await orderModel.findById(id);
        return response;
    }
    async findByName(customerName, code) {
        console.log("OrderManager findByName called with", customerName, code); // Debug log
        return await orderModel.findOne({ customerName, code });
    }


}
export const orderManager = new OrderManager();





// const Order = require('../models/order.model.js');

// const getOrders = async (req, res) => {
//   const orders = await Order.find(); //{ userId: req.user.userId }
//   res.json(orders);
// };
// const getOrderById = async (req, res) => {
//     try {
//       const {customerName, code} = req.body;
//       //const orderId = req.params.id;
//       const order = await Order.findOne({ customerName: customerName, code: code }); // { _id: orderId } userId: req.user.userId
  
//       if (!order) {
//         return res.status(404).json({ message: 'Order not found' });
//       }
  
//       res.json(order);
//     } catch (error) {
//       res.status(500).json({ message: 'Server error', error: error.message });
//     }
//   };

// module.exports = { getOrders, getOrderById };
