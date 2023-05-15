import session from "express-session";
import SequelizeStore from "connect-session-sequelize";
import db from "./config/Database.js";
import express from "express";
import cors from "cors";
import UserRoute from "./routes/UserRoutes.js";
import AuthRoute from "./routes/AuthRoute.js";
import PdfRoute from "./routes/PdfRoute.js";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from "dotenv";
dotenv.config();

const app = express();

const port = process.env.PORT

app.use(session({
    secret: "BraiReport",
    resave: false,
    saveUninitialized: true,
}));
//app.use(cors());
app.use(cors({ credentials: true, origin: 'https://main--enchanting-heliotrope-82856e.netlify.app/' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(__dirname + "/public"))

app.use(UserRoute);
app.use(AuthRoute);
app.use(PdfRoute);

app.listen(port, ()=> {
    console.log(`Server up and running...`);
});


