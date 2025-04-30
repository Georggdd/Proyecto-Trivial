import express from 'express';
import { crearEquipos } from '../controllers/equipoController.js';
import { obtenerEquiposPorPartida } from '../controllers/equipoController.js';

const router = express.Router();

router.post('/', crearEquipos);
router.get('/', obtenerEquiposPorPartida);

export default router;