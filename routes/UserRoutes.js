import express from "express";
import {
    saveReport,
    getReports,
    uploadFile,
    updateReport,
    getReportById
} from "../controller/UserController.js";

const router = express.Router();

router.get('/getReports',getReports);
router.get('/reports/:id', getReportById);
router.post('/reports',uploadFile.single('image'), saveReport);
router.patch('/reports/:id', updateReport);

export default router;