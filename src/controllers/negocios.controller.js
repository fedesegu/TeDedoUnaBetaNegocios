import {getNegociosById, create} from "../services/negocios.service.js";

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
