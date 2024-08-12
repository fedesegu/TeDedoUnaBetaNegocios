import express from "express";
//import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import orderRoutes from "./routes/order.router.js";
import usersRoutes from "./routes/user.router.js";
import viewsRouter from "./routes/views.router.js";
import sessionRouter from "./routes/session.router.js";
import negociosRouter from "./routes/negocios.router.js";

import pool from "./DB/configDB.js";

dotenv.config();

const app = express();
app.use(express.json());

// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.error(err));

app.get('/datos', async (req, res) => {
    try {
        const [results] = await pool.query('SELECT * FROM tu_tabla');
        res.json(results);
    } catch (error) {
        res.status(500).send(error);
    }
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.use('/api/users', usersRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/views', viewsRouter);
app.use('/api/session', sessionRouter);
app.use('/api/negocios', negociosRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
