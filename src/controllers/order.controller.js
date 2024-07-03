import { getOrderByName } from "../services/order.service.js";

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
        console.log("Received customerName:", customerName, "and code:", code); // Debug log

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
