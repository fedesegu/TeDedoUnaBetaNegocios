const Order = require('../models/order.model.js');

// Función para obtener todas las órdenes de un usuario
// const getOrdersByUserId = async (userId) => {
//   try {
//     const orders = await Order.find({ userId });
//     return orders;
//   } catch (error) {
//     throw new Error('Error fetching orders: ' + error.message);
//   }
// };

// Función para obtener una orden específica por su ID
const getOrderById = async (orderId) => {
  try {
    const order = await Order.findOne({ _id: orderId});
    if (!order) {
      throw new Error('Order not found');
    }
    return order;
  } catch (error) {
    throw new Error('Error fetching order: ' + error.message);
  }
};

module.exports = {
  //getOrdersByUserId,
  getOrderById,
};
