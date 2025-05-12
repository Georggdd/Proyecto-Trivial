import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import partidaRoutes from './routes/partidaRoutes.js';
import equipoRoutes from './routes/equipoRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use('/api/partidas', partidaRoutes);
app.use('/api/equipos', equipoRoutes);

// Rutas
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});