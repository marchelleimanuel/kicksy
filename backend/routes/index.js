import express from "express";
import getAllUser from "../controllers/user/GetUserController.js";
import updateUser from "../controllers/user/UpdateUserController.js";
import deleteUser from "../controllers/user/DeleteUserController.js";
import register from "../controllers/Register/index.js";
import login from "../controllers/Login/index.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

// users
router.get('/users', getAllUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.post('/users/register', register);
router.post('/users/login' ,login);

// admin




export default router;