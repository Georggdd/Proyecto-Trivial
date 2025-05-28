import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import multer from 'multer'; // si lo usas en algún error handler

// Importar rutas
import uploadRoutes   from './routes/uploadRoutes.js';
import authRoutes     from './routes/authRoutes.js';
import rankingRoutes  from './routes/rankingRoutes.js';
import downloadRoutes from './routes/downloadRoutes.js';
import resetRoutes    from './routes/resetRoutes.js';    // si aún lo necesitas

// Importar utilidades
import { configurarEventosDeCierre } from './utils/shutdownHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS: permite tu frontend de Vite y credenciales
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

// JSON body parser
app.use(express.json());

// Servir archivos estáticos
// → Publica tu carpeta de uploads en /uploads
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Rutas de API
app.use('/api/upload',    uploadRoutes);    // subida de preguntas
app.use('/api/auth',      authRoutes);
app.use('/api/ranking',   rankingRoutes);
app.use('/api/download',  downloadRoutes);
app.use('/api/reset',     resetRoutes);     // si lo usas

// Manejo de errores de multer (subidas)
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      error: 'Error al subir archivo',
      details: err.message,
    });
  }
  next(err);
});

// Cierre limpio
configurarEventosDeCierre();

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend escuchando en http://localhost:${PORT}`);
});




