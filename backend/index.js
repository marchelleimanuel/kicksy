import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./config/database.js";
import UserRouter from "./routes/index.js";
import { User } from "./models/UserModel.js";


dotenv.config();
const PORT = process.env.APP_PORT;

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(UserRouter);

// koneksi database
try {
    await db.authenticate();
    console.log('Database connected!');
} catch (err) {
    console.log(err);
}

app.listen(PORT, () => {
    console.log(`Server is running in port ${PORT}`);
});