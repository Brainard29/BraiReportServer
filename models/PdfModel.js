import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const PdfFile = db.define('pdf-files',{
    name: {
        type: DataTypes.STRING,
    },
    paths: {
        type: DataTypes.STRING
    },
},{
    freezeTableName: true
});

export default PdfFile;

(async()=>{
    await db.sync();
})();