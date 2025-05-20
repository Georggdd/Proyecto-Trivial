//Controlador para el botón de customizar

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const guardarPreguntas = async (preguntas) => {
  const resultados = [];

  for (const pregunta of preguntas) {
    try {
      const nuevaPregunta = await prisma.customizable.create({
        data: {
          pregunta: pregunta.pregunta,
          dificultad: pregunta.dificultad,
          puntuacion: pregunta.puntuacion,
          opcion1: pregunta.opcion1,
          opcion2: pregunta.opcion2,
          opcion3: pregunta.opcion3,
          opcion4: pregunta.opcion4,
          respuesta_correcta: pregunta.respuesta_correcta,
          explicacion: pregunta.explicacion
        }
      });
      resultados.push(nuevaPregunta);
    } catch (error) {
      console.error('Error al guardar pregunta:', error);
      throw error;
    }
  }

  return resultados;
};

export const verPreguntas = async () => {
  try {
    const preguntas = await prisma.customizable.findMany();
    console.log('📚 Preguntas en la base de datos:', preguntas);
    return preguntas;
  } catch (error) {
    console.error('❌ Error al consultar preguntas:', error);
    throw error;
  }
};
