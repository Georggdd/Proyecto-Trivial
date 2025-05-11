import prisma from '../config/db.js';

export const crearPartida = async (req, res) => {
  const { nombre, equipos } = req.body;

  if (!nombre || !Array.isArray(equipos)) {
    return res.status(400).json({ error: 'Nombre y lista de equipos son obligatorios' });
  }

  try {
    // Crear partida
    const nuevaPartida = await prisma.partida.create({
      data: {
        nombre: `Partida ${codigo}`, // puedes generar el nombre dinámico
      },
    });

    // Crear equipos asociados
    const nuevosEquipos = await Promise.all(
      equipos.map((equipo) =>
        prisma.equipo.create({
          data: {
            nombre: equipo.nombre,
            imagen: equipo.imagen ?? null,
            partidaId: nuevaPartida.id,
          },
        })
      )
    );

    res.status(201).json({
      partida: nuevaPartida,
      equipos: nuevosEquipos,
    });
  } catch (error) {
    console.error('Error al crear partida:', error);
    res.status(500).json({ error: 'Error al crear partida' });
  }
};