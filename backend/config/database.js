import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const db = new Sequelize(`${process.env.DB_NAME}`, `${process.env.DB_USERNAME}`,`${process.env.DB_PASSWORD}`, {
    host: `${process.env.DB_HOST}`,
    port: `${process.env.DB_PORT}`,
    dialect: "postgres"
});

export default db;