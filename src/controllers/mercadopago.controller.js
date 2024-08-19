import {handleIpnNotification} from "../services/mercadopago.service.js";
import { initPoint } from "../services/order.service.js";

export const receiveIpnNotification = async (req, res) => {
    const notificationData = req.body; 
    await handleIpnNotification(notificationData);
    res.sendStatus(200); 
};

export const sendInitPoint = async (req, res) =>{
    try {
        res.json({ initPoint }); 
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };

