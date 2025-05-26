import express from 'express';
import { downloadGruposExcel } from '../controllers/downloadController.js';

const router = express.Router();

router.get('/download-grupos', downloadGruposExcel);

export default router;
