import {Sequelize} from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const db = new Sequelize("brai4413_security_report","brai4413_admin","?r^dQNW%f9@P",{
    host: "api2.braireport.site",
    dialect: "mysql"
});

export default db;