import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const obtenerGrupos = async (req, res) => {
  try { //extrae los datos desde la base de datos
    const grupos = await prisma.grupo.findMany({
      select: {
        id: true,
        nombre: true,
        foto: true,
        puntosTotales: { //se ha creado una relación entre tablas
          select: {
            puntosTotales: true,
          },
        },
      },
    });

//almacena los datos extraidos en variables
    const gruposFormateados = grupos.map(g => ({
      id: g.id,
      nombre: g.nombre,
      foto: g.foto,
      puntos: g.puntosTotales?.puntosTotales ?? 0,
    }));

    res.json(gruposFormateados); //devuelve los datos al frontend.
  
} catch (error) {
    console.error("Error al obtener grupos:", error.message);
    res.status(500).json({ error: "Error al obtener grupos" });
  }
};