import prisma from '../config/db.js';

export const crearPartida = async (req, res) => {
  const { codigo } = req.body;

  try {
    const nueva = await prisma.partida.create({
      data: {
        codigo,
      },
    });

    res.status(201).json(nueva);
  } catch (error) {
    console.error('Error al crear partida:', error);
    res.status(500).json({ error: 'Error al crear partida' });
  }
};