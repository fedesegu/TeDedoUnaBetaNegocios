
import pool from "../DB/configDB.js";
import UsersRequestDto from "../DAL/dtos/users-request.dto.js";
import UsersResponseDto from "../DAL/dtos/users-response.dto.js";
import { hashData } from "../utils/utils.js";

export const getAll = async () => {
    const [rows] = await pool.query("SELECT * FROM usuarios");
    return rows.map(row => new UsersResponseDto(row));
}

export const getById = async (id) => {
    const [rows] = await pool.query("SELECT * FROM usuarios WHERE id = ?", [id]);
    return new UsersResponseDto(rows[0]);
}

export const create = async (user) => {
    const hashPassword = await hashData(user.password);
    const userDto = new UsersRequestDto({ ...user, password: hashPassword });
    const [result] = await pool.query("INSERT INTO usuarios (name_usuarios, password_usuarios) VALUES (?, ?)", [userDto.username, userDto.password]);
    return { id: result.insertId, ...userDto };
}

export const deleteOne = async (id) => {
    await pool.query("DELETE FROM usuarios WHERE id = ?", [id]);
};


















// import { usersManager } from "../DAL/manager/userManager.js";
// import UsersRequestDto from "../DAL/dtos/users-request.dto.js";
// import UsersResponseDto from "../DAL/dtos/users-response.dto.js";
// import { hashData } from "../utils/utils.js";


//   export const getAll = async () => {
//     return usersManager.getAll();
//   }

//   export const getById = async(id)=> {
//     const user = await usersManager.getById(id);
//     const userDTO = new UsersResponseDto(user);
//     return userDTO;
//   }

//   export const create = async(user) => {
//     const hashPassword = await hashData(user.password);
//     const userDto = new UsersRequestDto({ ...user, password: hashPassword });
//     const createdUser = await usersManager.createOne(userDto);
//     return createdUser;
//   }

//   export const deleteOne = async (id) => {
//     return usersManager.deleteOne(id);
//   }


