import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import orderRoutes from "./routes/order.router.js";
import usersRoutes from "./routes/user.router.js";
import productRoutes from "./routes/product.router.js"
import sessionRouter from "./routes/session.router.js";
import negociosRouter from "./routes/negocios.router.js";
import mercadoPagoRouter from "./routes/mercadopago.router.js"
import cors from "cors";

//comentario  2
import pool from "./DB/configDB.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:4000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true 
}));

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
app.use('/api/productos', productRoutes);
app.use('/api/session', sessionRouter);
app.use('/api/negocios', negociosRouter);
app.use('/api/mercadopago', mercadoPagoRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
    console.log('Servidor escuchando en http://0.0.0.0:${port}');
  });

