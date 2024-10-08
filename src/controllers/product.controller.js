import { getProductById, createProduct, updatedProduct } from "../services/product.service.js";


export const getProduct = async (req, res) => {
    const {id_productos} = req.body
    try {
        const product = await getProductById(id_productos);
        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

export const createOneProduct = async (req, res) => {
    try {
        const product = await createProduct(name_productos, precio_productos, negocioid_productos);
        console.log("probando controlador de producto");
        res.status(201).json(product)
    } catch (error) {
        
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { id_productos, newPrice, negocio_id } = req.body;
        const result = await updatedProduct(req); 

        res.status(200).json(result); 
    } catch (error) {
        console.error('Error en el controlador updateProduct:', error);
        res.status(500).json({ error: 'Error al actualizar el producto' }); 
    }
};
