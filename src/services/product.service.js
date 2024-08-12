import pool from "../DB/configDB.js"

export const createProduct = async () =>{
    try {
        const query = "INSERT INTO productos (name_productos, negocioid_productos)"
        const [row] = await pool.query(query, [name_productos, negocioid_productos])
        return {id: result.insertId, name_productos, negocioid_productos}
    } catch (error) {
        throw new Error('Error creating producto: ' + err.message);
    }
}
export const getProductById = async(id_productos)=>{
    try {
        const [rows] = await pool.query("SELECT * FROM ordenes WHERE id_productos = ?", [id_productos]);
        return rows;
    } catch (error) {
    }
} 
export const updatedProduct = async(id_productos)=>{
        try {
            const query = "UPDATE productos SET price = ? WHERE id = ?";
            const [result] = await pool.query(query, [newPrice, id_productos]);
    
            if (result.affectedRows === 0) {
                throw new Error('Product not found or no change in price');
            }
    
            return { message: 'Product updated successfully', id_productos, newPrice };
        } catch (error) {
            console.error('Error updating product:', error);
            throw new Error('Error updating product: ' + error.message);
        }

    };