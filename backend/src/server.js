import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path'; // para acceder a las imágenes subidas en uploads


//Importar rutas
import uploadRoutes from './routes/uploadRoutes.js';
import authRoutes from './routes/authRoutes.js';
import rankingRoutes from './routes/rankingRoutes.js';
import downloadRoutes from './routes/downloadRoutes.js';

//importar utilidades
import { configurarEventosDeCierre } from './utils/shutdownHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

//Acceder a la imagen desde http://localhost:3000/uploads/nombre.jpg
//provisional hasta tener el código de Paulino
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Rutas
app.use('/api/upload', uploadRoutes); // Changed from /upload to /api/upload
app.use('/api/auth', authRoutes);
app.use("/api/ranking", rankingRoutes);
app.use('/api', downloadRoutes); //descarga resultados

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ 
      error: 'Error al subir archivo',
      details: err.message 
    });
  }
  next(err);
});

configurarEventosDeCierre(); //cierra el servidor correctamente

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend en http://localhost:${PORT}`);
});




