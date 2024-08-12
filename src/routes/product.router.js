import express from "express";
import { createOneProduct } from "../controllers/product.controller";

const router = Router();

router.post("/crear_producto", createOneProduct); 