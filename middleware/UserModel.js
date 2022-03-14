import { UserModel, Op } from "../model/model.js";

const POST = async (req, res) => {
    try {
        const { username, contact } = req.body;
        if (!username || !contact)
            throw new Error("Username or contact not found");
        let newUser = await UserModel.create({
            username,
            contact,
        });
        return res.json({
            status: 200,
            massage: "new user added",
            data: newUser,
        });
    } catch (error) {
        res.json({
            status: 404,
            message: error.message,
        });
    }
};

const GET = async (req, res) => {
    try {
        let users = await UserModel.findAll();
        res.json(users);
    } catch (error) {
        res.json({
            status: 404,
            massage: error.massage,
        });
    }
};

const DELETE = async (req, res) => {
    try {
        let { user_id } = req.body;
        let user = await UserModel.destroy({ where: { user_id } });
        await res.json({
            status: 200,
            massage: "Deleted user",
            data: user,
        });
    } catch (error) {
        res.json({
            status: 400,
            massage: error.massage,
        });
    }
};

export default { POST, GET, DELETE };
