import express from 'express';
import { getPreguntaAleatoria } from '../controllers/preguntaController.js';

const router = express.Router();

router.get('/aleatoria', getPreguntaAleatoria);

export default router;
