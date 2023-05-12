import express from "express";
import {
    saveReport,
    getReports,
    uploadFile,
    updateReport,
    getReportById,
    searchReports
} from "../controller/UserController.js";

const router = express.Router();

router.get('/getReports',getReports);
router.get('/',searchReports);
router.get('/reports/:id', getReportById);
router.post('/reports',uploadFile.single('image'), saveReport);
router.patch('/reports/:id',uploadFile.single('image'), updateReport);

export default router;