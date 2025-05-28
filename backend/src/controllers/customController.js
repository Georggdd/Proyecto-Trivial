import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/**
 * Guarda un array de preguntas customizables en la base de datos.
 *
 * @param {Array<Object>} preguntas — Cada elemento debe tener:
 *    pregunta, dificultad, puntuacion,
 *    opcion1, opcion2, opcion3, opcion4,
 *    respuesta_correcta, explicacion
 * @returns {Promise<Prisma.BatchPayload>}
 */
export const guardarPreguntas = async (preguntas) => {
  const datos = preguntas.map((p) => ({
    pregunta:            p.pregunta,
    opcion1:             p.opcion1,
    opcion2:             p.opcion2,
    opcion3:             p.opcion3,
    opcion4:             p.opcion4,
    respuesta_correcta:  p.respuesta_correcta,
    puntuación:          parseInt(p['puntuación'], 10) || 10,
    explicación:         p['explicación'] || '',
    esCustom:            true,
  }));

  try {
    const resultado = await prisma.customizable.createMany({
      data: datos,
      skipDuplicates: true,
    });
    return resultado;
  } catch (error) {
    console.error('❌ Error al guardar preguntas customizadas:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

/**
 * Recupera todas las preguntas customizables almacenadas.
 *
 * @returns {Promise<Array>}
 */
export const verPreguntas = async () => {
  try {
    const preguntas = await prisma.customizable.findMany();
    console.log('📚 Preguntas customizables en BD:', preguntas.length);
    return preguntas;
  } catch (error) {
    console.error('❌ Error al consultar preguntas customizadas:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
