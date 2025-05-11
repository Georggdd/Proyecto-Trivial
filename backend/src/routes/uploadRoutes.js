import express from 'express';
import upload from '../middlewares/uploadFile.js';
import { procesarCSV } from '../controllers/uploadController.js';

const router = express.Router();

router.post('/', upload.single('archivo'), procesarCSV);

export default router;
