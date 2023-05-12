import express from "express";
import { getPdf, updatePdf, uploadPdf, uploadFile } from '../controller/PdfController.js'

const router = express.Router();

router.get('/getPdf', getPdf);
router.post('/uploadFile',uploadPdf.single('name'),uploadFile);
router.patch('/updatePdf/:id',uploadPdf.single('name'),updatePdf);

export default router;
