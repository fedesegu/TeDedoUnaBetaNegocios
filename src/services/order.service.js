import pool from "../DB/configDB.js";

export const getOrderByName = async (customerName, code) => {
    const [rows] = await pool.query("SELECT * FROM ordenes WHERE customerName = ? AND code = ?", [customerName, code]);
    return rows;
}

export const create = async (id_product, customerName) => {
    try {
        const query = "INSERT INTO ordenes (productId, customerName) VALUES (?, ?)";
        const [result] = await pool.query(query, [id_product, customerName]);
        return { id: result.insertId, id_product, customerName };
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
