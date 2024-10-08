
import { getAll, getById, create } from "../services/user.service.js";
//import { jwtValidation } from "../middlewares/jwt.middleware.js";
//import { authMiddleware } from "../middlewares/auth.middleware.js";
//import { transporter } from "../utils/nodemailer.js"
import passport from "passport";
import CustomError from "../errors/error.generate.js";
import { ErrorMessages, ErrorName } from "../errors/errors.enum.js";
import { updatedOne } from "../services/user.service.js"


export const findUserById = (req, res) => {
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        const { idUser } = req.params;
        const user = await getById(idUser);
        if (!user) {
                return CustomError.generateError(ErrorMessages.USER_NOT_EXIST,404,ErrorName.USER_NOT_EXIST);
            }
        res.json({ message: "User", user });
}};

export const createUser =  async (req, res) => {
    const { name_usuarios, password_usuarios } = req.body;
    if (!name_usuarios || !password_usuarios) {
        return CustomError.generateError(ErrorMessages.ALL_FIELDS_REQUIRED,400,ErrorName.ALL_FIELDS_REQUIRED);

    }
    const createdUser = await create(req.body);
    res.status(200).json({ message: "User created", user: createdUser });
};

export const findAllUsers = async (req, res) => {
    const users = await getAll();
    return users
}

export const updateUser = async (req, res) =>{

}




// export const findUserByEmail = async (req, res) => {
//     const { UserEmail } = req.body;
//     const user = await findByEmail(UserEmail);
//     if (!user) {
//         return CustomError.generateError(ErrorMessages.USER_NOT_EXIST,404,ErrorName.USER_NOT_EXIST);

//     }
//     res.status(200).json({ message: "User found", user });
// };



// export const oldUsers = async (req, res) => {
//     try {
//         const users = await findAll();
//         const now = new Date();
//         const oldUsersList = [];
//         for (let index = 0; index < users.length; index++) {
//             const element = users[index];
//             const diferenciaEnDias = (now - element.last_connection) / (1000 * 60 * 60 * 24);
//             if (diferenciaEnDias >= 2) {
//                 oldUsersList.push(element)
//             }
//         }
//         return oldUsersList;
//     } catch (error) {
//         console.error("OldUsers Error:", error);
//         res.status(500).send("Server internal error");
//     }
// };

// export const deleteUsers = async (req, res) => {
//     const {users} = req.body;
//     for (let index = 0; index < users.length; index++) {
//         const element = users[index];
//         const result = deleteOneUser(element._id);
//         await transporter.sendMail({
//             from: "federicosegu@gmail.com",
//             to: element.email,
//             subject: "Perfil",
//             html: `<bSe ha eliminado su usuario por falta de actividad, por favor registrese nuevamente.</b>`,
//         });
//     }
// };



// export const updateUserNow = async (req, res) => {
//     const { uid } = req.params;
//     const { role, email } = req.body;
//     try {        
//     const userToUpdate = await getById(uid);
 
//     if (!userToUpdate) {
//         return res.status(404).json({ message: "User not found" });
//     }

//     if ( userToUpdate.role === role) {
//         return res.status(400).json({ message: "Your role is the same as the one you want to change" });
//     }
//     if (role === "premium") {
//         if (!userToUpdate.documents[0] || !userToUpdate.documents[1] || !userToUpdate.documents[2]) {
//             return res.status(400).json({ message: "Please update your documentation first" });
//         }
//     }
//     if (userToUpdate._doc.email !== email ){
//         return res.status(400).json({ message: "The information provided are incorrect" });
//     }
//     if (userToUpdate.role !== role) {
//         const newUser = { ...userToUpdate._doc, role: role };
//         console.log(newUser, "new user");
//         const updatedUser = await updateUser(uid, newUser);
//         res.status(200).json({ message: "User updated", user: updatedUser });
//         } else {
//             res.status(400).json({ message: "Nothing has changed" });
//         }
//     }
//     catch (error) {
//             res.status(500).json({ message: error.message });
//         }
//     }

// export const updatePerfil = async (req,res) => {
//     const { uid } = req.params;
//     try {
//         const user = await findById(uid);
//         const dni = req.files.dni;
//         const address = req.files.address;
//         const bank = req.files.bank;
//         const response = await updatePerfilDoc(uid, { dni, address, bank });
//         res.status(201).json({ message: "Documents add" });
//     } catch (error) {
//         res.status(500).json({ message: "Server internal error" });
//     }
// }    

// export const updateFoto = async (req, res) => {
//     const { uid } = req.params;
//     try {
//         const user = await findById(uid);
//         const foto = req.files.profiles;
//         const response = await updatePerfilFoto(uid, {foto})
//         res.status(201).json({ message: "Photo add" });
//     } catch (error) {
//         res.status(500).json({ message: "Server internal error" });
//     }
// }



// import { userService } from '../services/user.service.js';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';


// export const register = async (req, res) => {
//   const { username, password } = req.body;
//   const user = await userService.registerUser(username, password);
//   res.status(201).json({ user });
// };

// export const login = async (req, res) => {
//   const { username, password } = req.body;
//   const user = await userService.findUserByUsername(username);
//   if (!user || !(await bcrypt.compare(password, user.password))) {
//     return res.status(401).json({ message: 'Invalid credentials' });
//   }
//   const token = jwt.sign({ userId: user._id }, 'secret', { expiresIn: '1d' });
//   res.cookie('token', token, { httpOnly: true });
//   res.json({ user });
// };


