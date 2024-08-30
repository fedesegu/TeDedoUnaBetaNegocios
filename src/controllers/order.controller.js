import { getOrderByName, create} from "../services/order.service.js";

// export const getOrders = async (req, res) => {
//     try {
//         const product = await getOrderByName();
//         res.json(product);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// };
// export const getOrderByCustomerName = async (req, res) => {
//     try {
//         const {customerName, code} = req.body;
//         const order = await getOrderByName(customerName,code);
//         res.json(order);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// };

export const getOrderByCustomerName = async (req, res) => {
    try {
        const { customerName, code } = req.body;
        console.log("Received customerName:", customerName, "and code:", code); 

        if (!customerName || !code) {
            return res.status(400).json({ message: "customerName and code are required" });
        }

        const product = await getOrderByName(customerName, code);
        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
export const createOrder = async (req, res) => {
    console.log('Request body:', req.body);  
    const { id_productos, customerName } = req.body;
    console.log('Product ID:', id_productos);  
    console.log('Customer Name:', customerName);  
    try {
        const order = await create(id_productos, customerName);
        res.status(201).json(order);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

export const handlePaymentNotification = async (req, res) => {
    try {
        const { query } = req;
        if (query.topic === 'payment') {
            const payment = await mercadopago.payment.findById(query.id);
            const external_reference = payment.body.external_reference;
            const status = payment.body.status;

            if (status === 'approved') {
                const updateQuery = "UPDATE ordenes SET payment_status = 1 WHERE id = ?";
                await pool.query(updateQuery, [external_reference]);
            }
        }
        res.status(200).send('OK');
    } catch (err) {
        console.error('Error handling payment notification:', err);
        res.status(500).send('Server error');
    }
};