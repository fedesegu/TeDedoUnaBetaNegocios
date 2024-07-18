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
const getProductDetails = async (id_product) => {
    try {
        const query = "SELECT name, price, quantity FROM productos WHERE id = ?";
        const [rows] = await pool.query(query, [id_product]);
        if (rows.length > 0) {
            return rows[0];
        } else {
            throw new Error('Product not found');
        }
    } catch (err) {
        throw new Error('Error getting product details: ' + err.message);
    }
};

export const create = async (id_product, customerName) => {
    try {
        const productDetails = await getProductDetails(id_product);
        const randomNumber = generateRandomNumber();
        const query = "INSERT INTO ordenes (productId, payment_status, customerName, random_number) VALUES (?, 0, ?, ?)";
        const [result] = await pool.query(query, [id_product, customerName, randomNumber]);

        const preference = {
            items: [
                {
                    title: productDetails.name,
                    quantity: productDetails.quantity,
                    unit_price: productDetails.price,
                },
            ],
            external_reference: String(result.insertId),
            back_urls: {
                success: "http://www.your-site.com/success",
                failure: "http://www.your-site.com/failure",
                pending: "http://www.your-site.com/pending",
            },
            auto_return: "approved",
        };

        const response = await mercadopago.preferences.create(preference);

        return { id: result.insertId, id_product, customerName, randomNumber, init_point: response.body.init_point };
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
