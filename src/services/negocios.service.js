import pool from "../DB/configDB.js";

export const getNegociosById = async () => {
    const [rows] = await pool.query("SELECT * FROM negocios WHERE userid_negocios = ?", [userid_negocios, name_negocios]);
    return rows;
}
export const create = async (userid_negocios, name_negocios) => {
    try {
        const query = "INSERT INTO negocios (userid_negocios, name_negocios) VALUES (?, ?)";
        const [result] = await pool.query(query, [userid_negocios, name_negocios]);
        return { id: result.insertId, userid_negocios, name_negocios };
    } catch (err) {
        throw new Error('Error creating negocio: ' + err.message);
    }
};