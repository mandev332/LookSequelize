import path from "path";
import { FoodModel, Op } from "../model/model.js";

const POST = async (req, res) => {
    try {
        const { file } = req.files;
        if (!["image/jpg", "image/png", "image/jpeg"].includes(file.mimetype))
            throw new Error("you must upload image.jpg");
        let filename = file.name.replace(/\s/g, "");

        let { food_name } = req.body;
        if (!food_name) food_name = filename.split(".")[0];
        let response = file.mv(
            path.join(process.cwd(), "client", "img", filename)
        );
        let newFood = await FoodModel.create({
            food_name,
            food_img: "/img/" + filename,
        });
        res.json({
            status: 200,
            massage: "food added",
            data: newFood,
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
        let foods = await FoodModel.findAll();
        res.json(foods);
    } catch (error) {
        res.json({
            status: 404,
            massage: error.massage,
        });
    }
};

export default { POST, GET };
