import prisma from '../config/db.js';

export const crearEquipo = async (req, res) => {
  // Si hay fichero, construimos la ruta relativa para los uploads
  const avatarMini = req.file 
    ? `/uploads/${req.file.filename}`  // Solo la ruta relativa, el frontend construirá la URL completa
    : null;

  const { nombre, integrantes, partidaId } = req.body;
  
  try {
    const equipo = await prisma.equipo.create({
      data: {
        nombre,
        integrantes: Array.isArray(integrantes) 
          ? integrantes.join(';') 
          : integrantes,
        partidaId: Number(partidaId),
        avatarMini,
      },
    });
    res.status(201).json(equipo);
  } catch (error) {
    console.error('Error al crear equipo:', error);
    res.status(500).json({ error: 'Error al crear equipo' });
  }
};

export const obtenerEquiposPorPartida = async (req, res) => {
  const { partidaId } = req.query;
  if (!partidaId) {
    return res.status(400).json({ error: 'partidaId requerido' });
  }

  try {
    const equipos = await prisma.equipo.findMany({
      where: { partidaId: Number(partidaId) },
      orderBy: { puntos: 'desc' },
      select: {
        id: true,
        nombre: true,
        integrantes: true,
        puntos: true,
        avatarMini: true,
      },
    });
    res.json(equipos);
  } catch (err) {
    console.error('Error al obtener equipos:', err);
    res.status(500).json({ error: 'Error al obtener equipos' });
  }
};

export const actualizarPuntos = async (req, res) => {
  const id = Number(req.params.id);
  const delta = Number(req.body.delta ?? 0);

  try {
    const equipoActual = await prisma.equipo.findUnique({
      where: { id },
    });
    if (!equipoActual) {
      return res.status(404).json({ error: 'Equipo no encontrado' });
    }

    const nuevosPuntos = (equipoActual.puntos || 0) + delta;
    const equipoActualizado = await prisma.equipo.update({
      where: { id },
      data: { puntos: nuevosPuntos },
    });

    res.json(equipoActualizado);
  } catch (err) {
    console.error('Error al actualizar puntos:', err);
    res.status(500).json({ error: 'No se pudieron actualizar los puntos' });
  }
};