import {Router} from "express";
import {createOneProduct, updateProduct} from "../controllers/product.controller.js";


const router = Router();

router.post("/crear_producto", createOneProduct); 
router.post("/actualizar_producto", updateProduct);
router.get("/:pid", )

export default router;