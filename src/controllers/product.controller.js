//import product service

export const getProduct = async (req, res) => {
    try {
        const product = await getProduct();
        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

export const createProduct = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}