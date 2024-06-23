const OrderManager = require('../manager/orderManager.js');

const getOrders = async (req, res) => {
    try {
        const product = await orderManager.getOrders();
        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
const getOrderById = async (req, res) => {
    try {
        const {customerName, code} = req.body;
        const product = await orderManager.getOrderById(customerName,code);
        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


module.exports = {
    getOrders,
    getOrderById
};
