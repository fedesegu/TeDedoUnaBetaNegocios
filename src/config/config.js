import dotenv from "dotenv";

dotenv.config();

export default {
    mysql: {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
    },
    secret_jwt: process.env.SECRET_KEY_JWT,
    environment: process.env.ENVIRONMENT,
    gmail_user: process.env.GMAIL_USER,
    gmail_password: process.env.GMAIL_PASSWORD,
    stripe_secret_key: process.env.REACT_APP_STRIPE_KEY,
};