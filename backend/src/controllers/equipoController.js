import prisma from '../config/db.js';

export const crearEquipos = async (req, res) => {
  const { equipos, partidaId } = req.body;
  if (!partidaId) return res.status(400).json({ error: 'partidaId requerido' });

  try {
    const nuevosEquipos = await Promise.all(
      equipos.map(eq =>
        prisma.equipo.create({
          data: {
            nombre      : eq.nombre,
            integrantes : eq.integrantes.join(';'),
            partidaId   : Number(partidaId),        // ← forzamos a Int
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

export const actualizarPuntos = async (req, res) => {
    const id = Number(req.params.id);
    const delta = Number(req.body.delta ?? 0);

    try {
        console.log('📝 Actualizando puntos:', { id, delta });

        // 1. Obtener equipo actual
        const equipoActual = await prisma.equipo.findUnique({
            where: { id }
        });

        if (!equipoActual) {
            console.log('❌ Equipo no encontrado:', id);
            return res.status(404).json({ error: 'Equipo no encontrado' });
        }

        // 2. Calcular nuevos puntos
        const nuevosPuntos = Number(equipoActual.puntos || 0) + delta;
        console.log('🔢 Cálculo:', { 
            puntosActuales: equipoActual.puntos, 
            incremento: delta, 
            total: nuevosPuntos 
        });

        // 3. Actualizar puntos
        const equipoActualizado = await prisma.equipo.update({
            where: { id },
            data: { 
                puntos: nuevosPuntos
            },
        });

        console.log('✅ Equipo actualizado:', equipoActualizado);
        res.json(equipoActualizado);

    } catch (err) {
        console.error('❌ Error:', err);
        res.status(500).json({ error: 'No se pudieron actualizar los puntos' });
    }
};