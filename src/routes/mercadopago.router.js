import {Router} from "express";
import {receiveIpnNotification} from "../controllers/mercadopago.controller.js"

const router = Router();

router.post("/insertar_webhook", receiveIpnNotification);
