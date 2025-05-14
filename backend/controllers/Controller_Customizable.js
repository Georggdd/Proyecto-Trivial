import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Inserta un array de preguntas en la base de datos.
 * @param {Array} resultados — Cada elemento debe tener las propiedades:
 *   pregunta, opcion1, opcion2, opcion3, opcion4, respuesta_correcta, dificultad, explicacion
 */
export async function guardarPreguntas(resultados) {//En resultados se almacenan las preguntas válidas procesadas del archivo.
  try { 

// Usamos createMany para lanzar un solo query.
await prisma.customizable.createMany({ 
  data: resultados.map(p => ({ //Data espera un array de objetos, donde cada objeto representa una fila a insertar.
                               //.map() para transformar cada pregunta (p) en el formato que espera Prisma.
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
  skipDuplicates: true,    //Le dice a Prisma que ignore las filas que ya existan con los mismos valores (según los campos únicos definidos).
});                        //Evita errores si alguien sube dos veces el mismo archivo o preguntas duplicadas.
  } catch (err) {
    console.error('❌ Error al guardar en la base de datos:', err);
    throw err;
  } finally {
    await prisma.$disconnect();//Cerramos la conexión a la base de datos.
  }
}
