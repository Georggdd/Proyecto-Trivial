import express from 'express';
import multer from 'multer';
import {
  crearEquipo,
  obtenerEquiposPorPartida,
  actualizarPuntos
} from '../controllers/equipoController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// POST /api/equipos → recibe un solo equipo con campo 'avatar'
router.post(
  '/',
  upload.single('avatar'),
  crearEquipo
);

router.get('/', obtenerEquiposPorPartida);
router.patch('/:id/puntos', actualizarPuntos);

export default router;