// src/controllers/customizableController.js

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/**
 * Guarda un array de preguntas customizables en la base de datos.
 * Utiliza createMany para hacer un único query y skipDuplicates
 * para ignorar filas ya existentes según las columnas únicas.
 *
 * @param {Array<Object>} preguntas — Cada elemento debe tener:
 *    pregunta, dificultad, puntuacion,
 *    opcion1, opcion2, opcion3, opcion4,
 *    respuesta_correcta, explicacion
 * @returns {Promise<Prisma.BatchPayload>}
 */
export const guardarPreguntas = async (preguntas) => {
  // Preparamos los datos en el formato que prisma.customizable.createMany espera
  const datos = preguntas.map((p) => ({
    pregunta:           p.pregunta,
    dificultad:         p.dificultad,
    puntuacion:         Number(p.puntuacion) || 10,
    opcion1:            p.opcion1,
    opcion2:            p.opcion2,
    opcion3:            p.opcion3,
    opcion4:            p.opcion4,
    respuesta_correcta: p.respuesta_correcta,
    explicacion:        p.explicacion || '',
    esCustom:           true,    // Marca que viene de archivo custom
  }));

  try {
    // Inserción masiva con skipDuplicates para no fallar en duplicados
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
 * @returns {Promise<Prisma.Customizable[]>}
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
