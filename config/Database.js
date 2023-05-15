import {Sequelize} from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const db = new Sequelize("heroku_5579fef6a42a99f","ba59fe0e2c1af8","1e0ea26d",{
    host: "us-cdbr-east-06.cleardb.net",
    dialect: "mysql"
});

export default db;