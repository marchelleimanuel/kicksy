import { User } from "../../models/UserModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import * as constant from "../../common/constant.js";
import { Op } from "sequelize";
dotenv.config();

const userLogin = async (req,res) => {
    try {
        const { emailOrUsername, password }= req.body;

        const user = await User.findOne({
            where: {
                [Op.or]: {
                    email: emailOrUsername,
                    username: emailOrUsername
                }
            }
        });
        
        if(!user) return res.status(404).json({
            response_code: constant.RESPONSE_INVALID_CODE,
            messages: 'Email/Username doesn\'t ada'
        });

        const comparePassword = await bcrypt.compare(password, user.password);
        if(!comparePassword) return res.status(404).json({
            response_code: constant.RESPONSE_INVALID_CODE,
            messages: 'Password is incorrect!'
        });

        const userId = user.id;
        const username = user.username;
        const userEmail = user.email;
        const userRole = user.role;

        const accessToken = jwt.sign({userId, username, userEmail}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '50s'
        });

        const refreshToken = jwt.sign({userId, username, userEmail}, process.env.REFRESH_TOKEN, {
            expiresIn: '1d'
        });

        await User.update({token: refreshToken},{
            where: {
                email: userEmail
            }
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        let data = {
            accessToken: accessToken,
            username: username,
            userEmail: userEmail,
            user_role: userRole
        }

        res.status(200).json({
            data: data,
        });
    } catch (error) {
        console.log(error);
    }

};


export default userLogin;