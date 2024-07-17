import { Router } from "express";
import {getUserBusinessesController, createNegocio} from "../controllers/negocios.controller.js";
const router = Router();

router.get("/", getUserBusinessesController);
router.post("/", createNegocio);

export default router