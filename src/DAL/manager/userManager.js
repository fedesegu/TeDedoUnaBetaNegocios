import pool from '../config/configDB.js'; 

export async function findByEmail(email) {
  try {
    const connection = await pool.getConnection(); // Obtiene una conexión del pool

    const [rows] = await connection.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    connection.release(); // Libera la conexión al pool después de usarla

    if (rows.length === 0) {
      return null; 
    }

    return rows[0]; 
  } catch (error) {
    console.error('Error al buscar usuario por correo electrónico:', error);
    throw error; 
  }
}

import pool from '../config/configDB.js';
import bcrypt from 'bcrypt'; // Asegúrate de tener instalado bcrypt

// ... (resto de tu código)

export async function createOne(userData) {
  try {
    const connection = await pool.getConnection();

    // Hashea la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(userData.password, 10); // 10 es el número de rondas de hashing, puedes ajustarlo según tus necesidades de seguridad

    const [result] = await connection.execute(
      'INSERT INTO users (email, password, nombre, apellido, edad, alias, avatar) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [userData.email, hashedPassword, userData.nombre, userData.apellido, userData.edad, userData.alias, userData.avatar]
    );

    connection.release();

    return result.insertId; // Devuelve el ID del usuario recién creado
  } catch (error) {
    console.error('Error al crear usuario:', error);
    throw error; 
  }
}
















// import {usersModel} from "../../models/user.model.js";

// class UsersManager {
//     async findAll() {
//         const response = await usersModel.find();
//         return response; 
//     }
//     async findById(id) {
//         const response = await usersModel.findById(id);
//         return response;
//     }
//     async createOne(obj) {
//         const response = await usersModel.create(obj);
//         return response;
//     }
//     async updateOne(id, obj) {
//         const result = await usersModel.updateOne({ _id: id }, obj);
//         return result;
//     }
// }

// export const usersManager = new UsersManager();