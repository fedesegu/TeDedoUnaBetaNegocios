import {getNegociosById} from "../services/negocios.service";

export const getNegociosByids = async (req, res) => {
        try {
            const {user_id} = req.body;   
            if (!userid) {
                return res.status(400).json({ message: "user_id are required" });
            }
            const negocio = await getNegociosByid(user_id);
            res.json(negocio);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    };
