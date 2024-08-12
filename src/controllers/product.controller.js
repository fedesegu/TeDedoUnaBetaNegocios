import { getProductById, createProduct } from "../services/product.service.js";

export const getProduct = async (req, res) => {
    try {
        const product = await getProduct();
        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

export const createOneProduct = async (req, res) => {
    try {
        const product = await createOneProduct(name_productos, negocioid_productos);
        res.status(201).json(product)
    } catch (error) {
        
    }
}