import pool from "../DB/configDB.js";

export const getNegociosById = async () => {
    const [rows] = await pool.query("SELECT * FROM negocios WHERE userid_negocios = ?", [userid_negocios, name_negocios]);
    return rows;
}
export const create = async ( name_negocio) => {
    try {
        const query = "INSERT INTO negocio (name_negocio) VALUES (?)";
        const [result] = await pool.query(query, [name_negocio]);
        return { id: result.insertId, name_negocio };
    } catch (err) {
        throw new Error('Error creating negocio: ' + err.message);
    }
};