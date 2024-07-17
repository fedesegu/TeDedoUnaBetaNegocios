import pool from "../DB/configDB.js";

// export const getNegociosById = async () => {
//     const [rows] = await pool.query("SELECT * FROM negocios WHERE userid_negocios = ?", [userid_negocios, name_negocios]);
//     return rows;
// }
export const create = async ( name_negocio) => {
    try {
        const query = "INSERT INTO negocio (name_negocio) VALUES (?)";
        const [result] = await pool.query(query, [name_negocio]);
        return { id: result.insertId, name_negocio };
    } catch (err) {
        throw new Error('Error creating negocio: ' + err.message);
    }
};

export const getUserBusinesses = async (userId) => {
    try {
      const [rows, fields] = await pool.execute(`
        SELECT n.id_negocio, n.name_negocio
        FROM asignaciones a
        JOIN negocio n ON a.negocioid_asignaciones = n.id_negocio
        WHERE a.userid_asignaciones = ?
      `, [userId]);
      return rows;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };