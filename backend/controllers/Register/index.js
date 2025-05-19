import { Sequelize } from "sequelize";
import { User } from "../../models/UserModel.js";
import bcrypt from 'bcryptjs';
import * as constant from "../../common/constant.js";

const validateEmail = (email) => {
    const regExp = /^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/;
    return email.match(regExp);
}

const userRegister = async (req, res) => {
    const {username, email, password, confirmPassword} = req.body;
    try {
        const user = await User.findOne({
            where: {
                [Sequelize.Op.or]: [
                    { email: email },
                    { username: username }
                ]
            }
        });

        if(!validateEmail(email)) return res.status(404).json({
            response_code: constant.RESPONSE_INVALID_CODE,
            messages: 'Email is not a valid!'
        });
        // cek ada user dengan username atau email yang sama atau tidak
        if(user) {  
            if(email === user.email) return res.status(404).json({
                response_code: constant.RESPONSE_INVALID_CODE,
                messages: 'Email already registered'
            });
            else if(username === user.username) return res.status(404).json({
                response_code: constant.RESPONSE_INVALID_CODE,
                messages: 'Username already taken'
            });
        }
        if(password.length < 10) return res.status(404).json({
            response_code: constant.RESPONSE_INVALID_CODE,
            messages:'Password need atleast 10 characters'
        });
        
        if(confirmPassword !== password) return res.status(404).json({
            response_code: constant.RESPONSE_INVALID_CODE,
            messages:'Password doesn\'t match'
        });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        await User.create({
            username: username,
            email: email,
            password: hashedPassword
        });
        res.status(200).json({
            messages: 'User Created Successfully!'
        });

    } catch (error) {
        console.log(error);
    }
};


export default userRegister;