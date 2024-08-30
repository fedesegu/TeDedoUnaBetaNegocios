import pool from "../DB/configDB.js"

// export const createProduct = async () =>{
//     try {
//         const query = "INSERT INTO productos (name_productos, negocioid_productos)"
//         const [row] = await pool.query(query, [name_productos, negocioid_productos])
//         return {id: row.insertId, name_productos, negocioid_productos}
//     } catch (error) {
//         throw new Error('Error creating producto: ' + err.message);
//     }
// }

export const createProduct = async (req) => {
    try {
        // 1. Validar usuario logueado
        if (!req.user) {
            throw new Error('Usuario no autenticado'); 
        }

        const { name_productos, price, negocio_id } = req.body;

        // 2. Validar que se proporcione un negocio_id
        if (!negocio_id) {
            throw new Error('Debe seleccionar un negocio para crear el producto');
        }

        // 3. Verificar si el negocio_id proporcionado pertenece al usuario logueado
        const negociosQuery = `
            SELECT negocio_id 
            FROM asignaciones 
            WHERE usuario_id = ?
        `;
        const [negocioRows] = await pool.query(negociosQuery, [req.user.id]); 

        const negociosDelUsuario = negocioRows.map(row => row.negocio_id);

        if (!negociosDelUsuario.includes(negocio_id)) {
            throw new Error('El negocio seleccionado no pertenece al usuario');
        }

        // 4. Insertar el producto con el ID del negocio 
        const query = "INSERT INTO productos (name_productos, price, negocioid_productos) VALUES (?,?,?)";
        const [row] = await pool.query(query, [name_productos, price, negocio_id]);

        return { id: row.insertId, name_productos, price, negocioid_productos: negocio_id };

    } catch (error) {
        throw new Error('Error creating producto: ' + error.message);
    }
}


export const getProductById = async(id_productos)=>{
    try {
        const [rows] = await pool.query("SELECT * FROM ordenes WHERE id_productos = ?", [id_productos]);
        return rows;
    } catch (error) {
    }
} 
// export const updatedProduct = async(id_productos)=>{
//         try {
//             const query = "UPDATE productos SET price = ? WHERE id = ?";
//             const [result] = await pool.query(query, [newPrice, id_productos]);
    
//             if (result.affectedRows === 0) {
//                 throw new Error('Product not found or no change in price');
//             }
    
//             return { message: 'Product updated successfully', id_productos, newPrice };
//         } catch (error) {
//             console.error('Error updating product:', error);
//             throw new Error('Error updating product: ' + error.message);
//         }

//     };

    export const updatedProduct = async (req, id_productos) => { 
        try {
            // 1. Validar usuario logueado
            if (!req.user) {
                throw new Error('Usuario no autenticado'); 
            }
    
            const { newPrice, negocio_id } = req.body; 
    
            // 2. Verificar si el negocio_id proporcionado pertenece al usuario logueado
            const negociosQuery = `
                SELECT negocio_id 
                FROM asignaciones 
                WHERE usuario_id = ?
            `;
            const [negocioRows] = await pool.query(negociosQuery, [req.user.id]); 
    
            const negociosDelUsuario = negocioRows.map(row => row.negocio_id);
    
            if (!negociosDelUsuario.includes(negocio_id)) {
                throw new Error('El negocio seleccionado no pertenece al usuario');
            }
    
            // 3. Verificar si el producto pertenece al negocio
            const productQuery = `
                SELECT id 
                FROM productos
                WHERE id = ? AND negocioid_productos = ?
            `;
            const [productRows] = await pool.query(productQuery, [id_productos, negocio_id]);
    
            if (productRows.length === 0) {
                throw new Error('El producto no pertenece al negocio seleccionado');
            }
    
            // 4. Actualizar el producto
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
    