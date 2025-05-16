import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import uploadRoutes from './routes/uploadRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { configurarEventosDeCierre } from './utils/shutdownHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/upload', uploadRoutes);       // Ruta para subir archivos
app.use('/api/auth', authRoutes);       // Autenticación de usuarios

configurarEventosDeCierre(); // Configura eventos SIGINT, SIGTERM, exit

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend en http://localhost:${PORT}`);
});




