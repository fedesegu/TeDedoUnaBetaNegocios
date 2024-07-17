import { Router } from "express";
import {getNegociosByids, createNegocio} from "../controllers/negocios.controller";
const router = Router();

router.get("/", getNegociosByids);
router.post("/", createNegocio);

export default router