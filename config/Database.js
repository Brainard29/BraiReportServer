import {Sequelize} from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const db = new Sequelize("heroku_05760d1226ad891","b05889809d53d3","064c999d",{
    host: "us-cdbr-east-06.cleardb.net",
    dialect: "mysql"
});

export default db;