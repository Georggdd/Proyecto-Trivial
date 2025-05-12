import prisma from '../config/db.js';

export const crearEquipos = async (req, res) => {
  const { equipos, partidaId } = req.body;

  try {
    const nuevosEquipos = await Promise.all(
      equipos.map(eq =>
        prisma.equipo.create({
          data: {
            nombre: eq.nombre,
            integrantes: eq.integrantes.join(';'), // guardar como string
            partidaId,
          },
        })
      )
    );

    res.status(201).json(nuevosEquipos);
  } catch (error) {
    console.error('Error al crear equipos:', error);
    res.status(500).json({ error: 'Error al crear equipos' });
  }
};

export const obtenerEquiposPorPartida = async (req, res) => {
    const { partidaId } = req.query;
  
    if (!partidaId) return res.status(400).json({ error: 'partidaId requerido' });
  
    try {
      const equipos = await prisma.equipo.findMany({
        where: { partidaId: parseInt(partidaId) },
        orderBy: { puntos: 'desc' },
      });
  
      res.json(equipos);
    } catch (err) {
      console.error('Error al obtener equipos:', err);
      res.status(500).json({ error: 'Error al obtener equipos' });
    }
  }; 