import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import partidaRoutes from './routes/partidaRoutes.js';
import equipoRoutes from './routes/equipoRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import preguntaRoutes from './routes/preguntaRoutes.js';

dotenv.config();

const app = express();

app.use(cors({ origin: 'http://localhost:5173' })); // Ajusta si tu frontend usa otro puerto
app.use(express.json());

// Rutas API
app.use('/api/auth', authRoutes);
app.use('/api/partidas', partidaRoutes);
app.use('/api/equipos', equipoRoutes);
app.use('/upload', uploadRoutes); 
app.use('/api/preguntas', preguntaRoutes);

export default app;