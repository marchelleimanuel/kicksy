import { User } from "../../models/UserModel.js";

const updateUser = async (req, res) => {
    const userId = req.params.id;
    const user = await User.findOne({
        where: {
            id: userId
        }
    });
    if(!user) {
        res.status(400).json({msg: 'User is not found!'})
    }
    else {
        try {
            const {username, email} = req.body;
            await User.update({
                username: username,
                email: email,
            },
            {
                where: {
                    id: userId
                }
            });
            res.send('User updated');
        } catch (error) {
            console.log(error);
        }
    }
}


export default updateUser;