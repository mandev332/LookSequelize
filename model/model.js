import sequelize from "./pg.js";

import { DataTypes, Model, Op } from "sequelize";

class UserModel extends Model {}
class FoodModel extends Model {}
class OrderModel extends Model {}

UserModel.init(
    {
        user_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING(20),
            validate: {
                len: [3, 20],
            },
        },
        contact: {
            type: DataTypes.STRING(12),
            unique: true,
            validate: {
                is: /^998[0-9]{2}[0-9]{3}[0-9]{2}[0-9]{2}/g,
            },
        },
    },
    {
        sequelize,
        tableName: "users",
    }
);

FoodModel.init(
    {
        food_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        food_name: {
            type: DataTypes.STRING(25),
            allowNull: false,
        },
        food_img: {
            type: DataTypes.STRING(256),
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "foods",
    }
);

OrderModel.init(
    {
        order_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        // food_id: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: FoodModel,
        //         key: "food_id",
        //     },
        // },
        // user_id: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: UserModel,
        //         key: "user_id",
        //     },
        // },

        count: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "orders",
    }
);

OrderModel.belongsTo(UserModel, {
    foreignKey: "user_id",
    onDelete: "cascade",
});
OrderModel.belongsTo(FoodModel, {
    foreignKey: "food_id",
    onDelete: "cascade",
});

!(async function () {
    sequelize.sync();
})();

export { UserModel, FoodModel, OrderModel, Op, sequelize };
