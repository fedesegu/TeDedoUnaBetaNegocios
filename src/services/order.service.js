import pool from "../DB/configDB.js";

const generateRandomNumber = () => {
    return Math.floor(1000 + Math.random() * 9000);
  };

export const getAllOrders = async () => {
    try {
        const [rows] = await pool.query("SELECT * FROM ordenes");
        return rows;
    } catch (err) {
        throw new Error('Error fetching orders: ' + err.message);
    }
};

export const getOrderByName = async (customerName, code) => {
    const [rows] = await pool.query("SELECT * FROM ordenes WHERE customerName = ? AND code = ?", [customerName, code]);
    return rows;
}

export const create = async (id_product, customerName) => {
    try {
        const randomNumber = generateRandomNumber();
        const query = "INSERT INTO ordenes (productId, payment_status, customerName, random_number) VALUES (?, 0, ?, ?)";
        const [result] = await pool.query(query, [id_product, customerName, randomNumber]);
        return { id: result.insertId, id_product, customerName, randomNumber};
    } catch (err) {
        throw new Error('Error creating order: ' + err.message);
    }
};










// import {orderManager} from "../DAL/manager/orderManager.js"

// // Función para obtener todas las órdenes de un usuario
// // const getOrdersByUserId = async (userId) => {
// //   try {
// //     const orders = await Order.find({ userId });
// //     return orders;
// //   } catch (error) {
// //     throw new Error('Error fetching orders: ' + error.message);
// //   }
// // };


//   export const getOrderByName = async (customerName, code) =>{
//     const order = await orderManager.findByName(customerName, code);
//     return order;
//   }








// Función para obtener una orden específica por su ID
// const getOrderById = async ({ customerName: customerName, code: code }) => {
//   try {
//     const order = await ordermodel.findOne({ customerName: customerName, code: code }); // _id: orderId
//     if (!order) {
//       throw new Error('Order not found');
//     }
//     return order;
//   } catch (error) {
//     throw new Error('Error fetching order: ' + error.message);
//   }
// };

// module.exports = {
//   //getOrdersByUserId,
//   getOrderById,
// };
