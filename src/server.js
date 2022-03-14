import express from "express";
import path from "path";
import cors from "cors";
import fileUpload from "express-fileupload";
import User from "../middleware/UserModel.js";
import Food from "../middleware/FoodModel.js";
import Order from "../middleware/OrderModel.js";
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors("https://look-sequelize.herokuapp.com"));
app.use(fileUpload());
app.use(express.json());
app.use(express.static(path.join(process.cwd(), "client")));

app.get("/", (req, res) => res.send("index.html"));

app.post("/users", User.POST);
app.get("/users", User.GET);
app.post("/foods", Food.POST);
app.get("/foods", Food.GET);
app.post("/orders", Order.POST);
app.get("/orders/:user_id", Order.GET);
app.get("/orders", Order.GET);

app.listen(PORT, () =>
    console.log("Server is running http://localhost:" + PORT)
);
