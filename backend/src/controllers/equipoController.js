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

    export const registrarRespuestaPartida = async (req, res) => {
  const equipoId = Number(req.params.id);
  const { preguntaId, respuestaId, esCorrecta, puntosObtenidos } = req.body;

  // Validación básica
  if (
    !preguntaId ||
    !respuestaId ||
    esCorrecta === undefined ||
    puntosObtenidos === undefined
  ) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }

  try {
    // 1. Verificar que los registros existen
    const [equipo, pregunta, respuesta] = await Promise.all([
      prisma.equipo.findUnique({ where: { id: equipoId } }),
      prisma.pregunta.findUnique({ where: { id: preguntaId } }),
      prisma.respuesta.findUnique({ where: { id: respuestaId } }),
    ]);

    if (!equipo || !pregunta || !respuesta) {
      return res.status(404).json({ error: 'Equipo, pregunta o respuesta no encontrados' });
    }

    // 2. Insertar nueva respuesta
    await prisma.respuestaPartida.create({
      data: {
        equipoId,
        preguntaId,
        respuestaId,
        esCorrecta,
        puntosObtenidos,
      },
    });

    // 3. Sumar puntos automáticamente al equipo
    await prisma.equipo.update({
      where: { id: equipoId },
      data: {
        puntos: {
          increment: puntosObtenidos,
        },
      },
    });

    // 4. Consultar historial completo
    const historial = await prisma.respuestaPartida.findMany({
      where: { equipoId },
      orderBy: { id: 'asc' },
      include: {
        pregunta: true,
        respuesta: true,
      },
    });

    // 5. Obtener puntos actualizados
    const equipoActualizado = await prisma.equipo.findUnique({
      where: { id: equipoId },
      select: { puntos: true },
    });

    res.status(201).json({
      equipoId,
      puntosTotales: equipoActualizado.puntos,
      historial,
    });

  } catch (err) {
    console.error('Error al actualizar puntos:', err);
    res.status(500).json({ error: 'No se pudieron actualizar los puntos' });
  }
};