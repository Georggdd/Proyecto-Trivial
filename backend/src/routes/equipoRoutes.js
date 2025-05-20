import express from 'express';
import { crearEquipos } from '../controllers/equipoController.js';
import { obtenerEquiposPorPartida } from '../controllers/equipoController.js';
import { actualizarPuntos } from '../controllers/equipoController.js';

const router = express.Router();

router.post('/', crearEquipos);
router.get('/', obtenerEquiposPorPartida);
router.patch('/:id/puntos', actualizarPuntos);

export default router;