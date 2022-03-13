import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    // {
    //     // host: "localhost",
    //     username: "postgres",
    //     password: "1",
    //     database: "look",
    //     dialect: "postgres",
    //     logging: false,
    // }

    "postgres://amcikics:yt7e0mphW71ZU30gFAJtlzwc0bR2zGPs@john.db.elephantsql.com/amcikics",
    {
        logging: false,
    }
);

!(async function () {
    try {
        sequelize.authenticate();
        console.log("database connected");
    } catch (error) {
        console.log("error: database not connected");
    }
})();

export default sequelize;
