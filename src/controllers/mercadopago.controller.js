import {handleIpnNotification} from "../services/mercadopago.service.js";

export const receiveIpnNotification = async (req, res) => {
    const notificationData = req.body; 
    await handleIpnNotification(notificationData);
    res.sendStatus(200); 
};