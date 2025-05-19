import { User } from "../../models/UserModel.js";

const getAllUser = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'username', 'email'],
        });
        res.send(users);
    } catch (error) {
        console.log(error);
    }
}


export default getAllUser;