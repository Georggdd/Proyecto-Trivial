import express from 'express';
import { downloadResultadoExcel } from '../controllers/downloadController.js';

const router = express.Router();

router.get('/download-grupos', downloadResultadoExcel);

export default router;
