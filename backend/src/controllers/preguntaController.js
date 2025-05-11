import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getPreguntaAleatoria = async (req, res) => {
  const { asignatura, dificultad } = req.query;

  if (!asignatura) {
    return res.status(400).json({ error: 'Falta la asignatura' });
  }

  try {
    const preguntas = await prisma.pregunta.findMany({
      where: {
        asignatura,
        ...(dificultad ? { dificultad } : {}),
      },
      include: {
        respuestas: true,
      },
    });

    if (preguntas.length === 0) {
      return res.status(404).json({ error: 'No hay preguntas disponibles' });
    }

    const aleatoria = preguntas[Math.floor(Math.random() * preguntas.length)];
    res.json(aleatoria);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la pregunta' });
  }
};
