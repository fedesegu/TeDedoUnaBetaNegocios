import {Router} from "express";
import {receiveIpnNotification, sendInitPoint} from "../controllers/mercadopago.controller.js"

const router = Router();

router.post("/insertar_webhook", receiveIpnNotification);
router.post("/enviar_initPoint", sendInitPoint);

export default router;