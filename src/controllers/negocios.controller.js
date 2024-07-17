import {getNegociosById, create, getUserBusinesses} from "../services/negocios.service.js";
import jwt from "jsonwebtoken";

export const getNegociosByids = async (req, res) => {
        try {
            const {user_id} = req.body;   
            if (!userid) {
                return res.status(400).json({ message: "user_id are required" });
            }
            const negocio = await getNegociosById(user_id);
            res.json(negocio);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    };
    export const createNegocio = async (req, res) =>{
        try {
           const {name_negocio} = req.body
           const negocio = await create (name_negocio);
           res.status(201).json(negocio);
        } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
        }
    }


export const getUserBusinessesController = async (req, res) => {
  try {
    // Verificar y decodificar el token JWT de las cookies
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'Authentication token is missing' });
    }

    // Decodificar el token JWT para obtener el userId
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Llamar a la función getUserBusinesses con el userId extraído
    const businesses = await getUserBusinesses(userId);

    // Devolver la lista de negocios en la respuesta
    return res.status(200).json(businesses);
  } catch (err) {
    // Manejar errores, incluyendo errores de autenticación
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

