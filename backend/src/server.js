// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Rutas
import authRoutes from './routes/authRoutes.js';
import partidaRoutes from './routes/partidaRoutes.js';
import equipoRoutes from './routes/equipoRoutes.js';
import preguntasRoutes from './routes/preguntas.routes.js'; // ✅ añadir
import categoriaRoutes from './routes/categoriaRoutes.js'; // ✅ añadir

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000; // ✅ usa 3000 porque tu frontend apunta ahí

app.use(cors());
app.use(express.json());

// Rutas backend
app.use('/api/auth', authRoutes);
app.use('/api/partidas', partidaRoutes);
app.use('/api/equipos', equipoRoutes);
app.use('/api/preguntas', preguntasRoutes); // ✅ importante
app.use('/api/categorias', categoriaRoutes);

app.get('/', (req, res) => {
  res.send('Servidor funcionando 🚀');
});

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
