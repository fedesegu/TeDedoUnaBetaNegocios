
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
export const getByEmail = async(email) => {
    const [rows] = await pool.query("SELECT * FROM usuarios WHERE email = ?", [email]);
    return new UsersResponseDto(rows[0]);
}

export const create = async (user) => {
    //const hashPassword = await hashData(user.password_usuarios);
    const userDto = new UsersRequestDto({ name_usuarios: user.name_usuarios, 
        password_usuarios: user.password_usuarios});
    const [result] = await pool.query("INSERT INTO usuarios (name_usuarios, password_usuarios) VALUES (?, ?)", [userDto.name_usuarios, userDto.password_usuarios]);
    return { id: result.insertId, ...userDto };
}

export const deleteOne = async (id) => {
    await pool.query("DELETE FROM usuarios WHERE id = ?", [id]);
};

export const updatedOne = async (id) => {
    try {
        if(!req.user){
            throw new Error('Usuario no autenticado'); 
        }
       const {newPassword, id } = req.body;
       const newPasswordHasheado = await hashData(newPassword);
       const query = await pool.query("UPDATE usuarios SET password = ? WHERE id = ? ")
       const [result] = pool.query(query, [newPasswordHasheado, id])
    } catch (error) {
        
    }
}

















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


