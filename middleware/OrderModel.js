import { OrderModel, UserModel, FoodModel, Op } from "../model/model.js";

const POST = (req, res) => {
    try {
        const { order_user, order_food } = req.body;
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

export default { POST, GET };
