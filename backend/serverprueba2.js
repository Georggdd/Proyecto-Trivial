import express from "express";
import cors from "cors";
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// ✅ AQUÍ defines la ruta correctamente
app.get("/api/grupos", async (req, res) => {
  try {
    const grupos = await prisma.grupo.findMany({
      select: {
        id: true,
        nombre: true,
        foto: true,
      }
    });
    res.json(grupos);
  } catch (error) {
    console.error("Error al obtener grupos:", error.message);
    res.status(500).json({ error: "Error al obtener grupos" });
  }
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});