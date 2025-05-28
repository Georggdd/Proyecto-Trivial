// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';      // ◀── añadir
// Rutas
import authRoutes from './routes/authRoutes.js';
import partidaRoutes from './routes/partidaRoutes.js';
import equipoRoutes from './routes/equipoRoutes.js';
import preguntasRoutes from './routes/preguntas.routes.js';
import categoriaRoutes from './routes/categoriaRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Reconstruir __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// ### Servir estáticos de uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use(express.static(path.join(__dirname, '../public')));

// Rutas backend
app.use('/api/auth', authRoutes);
app.use('/api/partidas', partidaRoutes);
app.use('/api/equipos', equipoRoutes);
app.use('/api/preguntas', preguntasRoutes);
app.use('/api/categorias', categoriaRoutes);

app.get('/', (req, res) => {
  res.send('Servidor funcionando 🚀');
});

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});