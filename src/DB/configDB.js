import mysql from "mysql2/promise";
import config from "../config/config.js";

const pool = mysql.createPool(config.mysql);

pool.getConnection()
    .then(connection => {
        console.log('Conectado a la base de datos.');
        connection.release();
    })
    .catch(err => {
        console.error('Error conectando a la base de datos:', err.stack);
    });

export default pool;
