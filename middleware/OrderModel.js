import { OrderModel, UserModel, FoodModel, Op } from "../model/model.js";

const POST = (req, res) => {
    try {
        const { user_id, food_id, count } = req.body;
        if (!user_id) throw new Error("you must select user");
        if (!food_id) throw new Error("you must select food");
        if (!count) throw new Error("How many foods");
        let newOrder = OrderModel.create(req.body);
        res.json({
            status: 200,
            massage: "order added",
            data: newOrder,
        });
    } catch (error) {
        res.json({
            status: 404,
            massage: error.massage,
        });
    }
};

const GET = async (req, res) => {
    try {
        let orders = await OrderModel.findAll({
            include: [FoodModel, UserModel],
            where: req.params || true,
        });
        res.json(orders);
    } catch (error) {
        res.json({
            status: 404,
            massage: error.massage,
        });
    }
};

const DELETE = async (req, res) => {
    try {
        let { order_id } = req.body;
        let order = await OrderModel.destroy({ where: { order_id } });
        await res.json({
            status: 200,
            massage: "Deleted order",
            data: order,
        });
    } catch (error) {
        res.json({
            status: 400,
            massage: error.massage,
        });
    }
};

export default { POST, GET, DELETE };
