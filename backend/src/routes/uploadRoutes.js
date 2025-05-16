import express from 'express';
import multer from 'multer';
import { procesarArchivo } from '../controllers/uploadController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('archivo'), procesarArchivo);

export default router;
