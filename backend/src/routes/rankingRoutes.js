import express from "express";
import { obtenerGrupos } from "../controllers/rankingController.js";

const router = express.Router();

// Ruta para obtener los grupos
router.get("/grupos", obtenerGrupos);

export default router;