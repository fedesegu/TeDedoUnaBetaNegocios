//import product service

export const getProduct = async (req, res) => {
    try {
        const product = await productManager.getProduct();
        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
