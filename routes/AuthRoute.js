import express from "express";
//import {Login, logOut, Me, Register} from "../controller/Auth.js";
import { Login } from "../controller/Auth.js"

const router = express.Router();

router.post('/login', Login);

export default router;