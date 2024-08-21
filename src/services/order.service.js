import pool from "../DB/configDB.js";
import mercadopago from "mercadopago";
import config from "../config/config.js"
import fetch from "node-fetch";

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
const getProductDetails = async (id_productos) => {
    try {
        const query = "SELECT name_productos, price FROM productos WHERE id_productos = ?";
        console.log(query);
        const [rows] = await pool.query(query, [id_productos]);
        if (rows.length > 0) {
            return rows[0];
        } else {
            throw new Error('Product not found');
        }
    } catch (err) {
        throw new Error('Error getting product details: ' + err.message);
    }
};

export const create = async (id_productos, customerName) => {

        const productDetails = await getProductDetails(id_productos);
        const randomNumber = generateRandomNumber();
        const query = "INSERT INTO ordenes (id_productos, payment_status, customerName, random_number) VALUES (?, 0, ?, ?)";
        const [result] = await pool.query(query, [id_productos, customerName, randomNumber]);
        const url = 'https://api.mercadopago.com/checkout/preferences';
const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer TEST-1787286201821420-081917-b64b89b6c480c4a6ca09c163e9abd359-164513396'
  },
  body: JSON.stringify({
    additional_info: "Discount 12.00",
    auto_return: "approved",
    back_urls: {
      success: "http://test.com/success",
      pending: "http://test.com/pending",
      failure: "http://test.com/failure"
    },
    differential_pricing: {
      id: 1
    },
    expiration_date_from: "2024-08-19T09:37:52.000-04:00",
    expiration_date_to: "2024-08-22T10:37:52.000-05:00",
    expires: false,
    external_reference: "1643827245",
    items: [
      {
        id: productDetails.id_productos,
        title: productDetails.name_productos,
        description: "Birra",
        picture_url: "http://www.myapp.com/myimage.jpg",
        category_id: "car_electronics",
        quantity: 1,
        currency_id: "ARS",
        unit_price: productDetails.price
      }
    ],
    marketplace: "NONE",
    marketplace_fee: 0,
    metadata: null,
    notification_url: "http://notificationurl.com",
    payer: {
      name: "John",
      surname: "Doe",
      email: "john@doe.com",
      phone: {
        area_code: "11",
        number: 988888888
      },
      identification: {
        type: "CPF",
        number: "19119119100"
      },
      address: {
        zip_code: "06233200",
        street_name: "Example Street",
        street_number: 123
      },
      date_created: "2024-04-01T00:00:00Z"
    },
    payment_methods: {
      excluded_payment_methods: [
        {
          id: "master"
        }
      ],
      excluded_payment_types: [
        {
          id: "ticket"
        }
      ],
      default_payment_method_id: "amex",
      installments: 10,
      default_installments: 5
    },
    shipments: {
      local_pickup: false,
      dimensions: "32 x 25 x 16",
      default_shipping_method: null,
      free_methods: [
        {
          id: null
        }
      ],
      free_shipping: false,
      receiver_address: {
        zip_code: "72549555",
        street_name: "Street address test",
        city_name: "São Paulo",
        state_name: "São Paulo",
        street_number: 100,
        country_name: "Brazil"
      }
    },
    // tracks: [
    //   {
    //     type: "google_ad",
    //     values: 
    //   }
    // ]
  })
};

try {
  const response = await fetch(url, options); 
  const data = await response.json(); 
  console.log(data); 

  return { 
      id: result.insertId, 
      id_product: id_productos, 
      customerName, 
      randomNumber, 
      mercadopagoResponse: data 
  }; 
} catch (error) {
  console.error('Error:', error);
  throw new Error('Error creating order: ' + error.message); 
}
};

 
    

