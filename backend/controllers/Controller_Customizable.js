import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Inserta un array de preguntas en la base de datos.
 * @param {Array} resultados — Cada elemento debe tener las propiedades:
 *   pregunta, opcion1, opcion2, opcion3, opcion4, respuesta_correcta, dificultad, explicacion
 */
export async function guardarPreguntas(resultados) {
  try {
    // Usamos createMany para lanzar un solo query,
    // y skipDuplicates evita errores si ya existe alguna fila idéntica.

await prisma.customizable.createMany({
  data: resultados.map(p => ({
    pregunta:          p.pregunta,
    opcion1:           p.opcion1,
    opcion2:           p.opcion2,
    opcion3:           p.opcion3,
    opcion4:           p.opcion4,
    respuesta_correcta: p.respuesta_correcta,
    dificultad:        p.dificultad,
    explicacion:       p.explicacion,
   // puntuacion:        parseInt(p.puntuacion || '1'), 
  })),
  skipDuplicates: true,
});
  } catch (err) {
    console.error('❌ Error al guardar en la base de datos:', err);
    throw err;
  } finally {
    await prisma.$disconnect();
  }
}
