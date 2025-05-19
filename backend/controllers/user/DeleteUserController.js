import { User } from "../../models/UserModel.js";

const deleteUser = async (req, res) => {
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
            await User.destroy({
                where: {
                    id: userId
                }
            });
            res.send('User deleted');
        } catch (error) {
            console.log(error);
        }
    }
}

export default deleteUser;