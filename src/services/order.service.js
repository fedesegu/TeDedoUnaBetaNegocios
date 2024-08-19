import pool from "../DB/configDB.js";

export let initPoint;

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

//         const preference = {
//             items: [
//                 {
//                     title: productDetails.name,
//                     quantity: productDetails.quantity,
//                     unit_price: productDetails.price,
//                 },
//             ],
//             external_reference: String(result.insertId),
//             back_urls: {
//                 success: "http://www.your-site.com/success",
//                 failure: "http://www.your-site.com/failure",
//                 pending: "http://www.your-site.com/pending",
//             },
//             auto_return: "approved",
//         };

//         const response = await mercadopago.preferences.create(preference, {
//             headers: {
//                 'Authorization': `Bearer `,
//                 'Content-Type': 'application/json'
//             }
//         });

//    
//return { id: result.insertId, id_product, customerName, randomNumber, init_point: response.body.init_point };
const client = new MercadoPago({  accessToken: config.access_token });
const preference = new Preference(client);

const body = {
  items: [
    {
      id: productDetails.id_product,
      title: productDetails.title,
      description: productDetails.description,
      picture_url: 'http://www.myapp.com/myimage.jpg',
      category_id: 'car_electronics',
      quantity: 1,
      currency_id: 'BRL',
      unit_price: 10,
    },
  ],
  marketplace_fee: 0,
  payer: {
    name: 'Test',
    surname: 'User',
    email: 'your_test_email@example.com',
    phone: {
      area_code: '11',
      number: '4444-4444',
    },
    identification: {
      type: 'CPF',
      number: '19119119100',
    },
    address: {
      zip_code: '06233200',
      street_name: 'Street',
      street_number: 123,
    },
  },
  back_urls: {
    success: 'http://test.com/success',
    failure: 'http://test.com/failure',
    pending: 'http://test.com/pending',
  },
  differential_pricing: {
    id: 1,
  },
  expires: false,
  additional_info: 'Discount: 12.00',
  auto_return: 'all',
  binary_mode: true,
  external_reference: '1643827245',
  marketplace: 'marketplace',
  notification_url: 'http://notificationurl.com',
  operation_type: 'regular_payment',
  payment_methods: {
    default_payment_method_id: 'master',
    excluded_payment_types: [
      {
        id: 'ticket',
      },
    ],
    excluded_payment_methods: [
      {
        id: '',
      },
    ],
    installments: 5,
    default_installments: 1,
  },
  shipments: {
    mode: 'custom',
    local_pickup: false,
    default_shipping_method: null,
    free_methods: [
      {
        id: 1,
      },
    ],
    cost: 10,
    free_shipping: false,
    dimensions: '10x10x20,500',
    receiver_address: {
      zip_code: '06000000',
      street_number: 123,
      street_name: 'Street',
      floor: '12',
      apartment: '120A',
    },
  },
  statement_descriptor: 'Test Store',
};

const response = await preference.create({ body })
  .then(console.log)
  .catch(console.log);

initPoint = response.body.init_point;


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
