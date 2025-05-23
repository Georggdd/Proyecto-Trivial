import express from 'express';
import { resetPreguntasCustomizables } from '../controllers/resetController.js';

const router = express.Router();

router.delete('/preguntas', resetPreguntasCustomizables);

export default router;
