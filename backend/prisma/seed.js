import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import preguntas from './data/preguntas.js'; // Solo importamos las preguntas nuevas

async function main() {
  // Borra todas las respuestas y preguntas existentes
  await prisma.respuesta.deleteMany();
  await prisma.pregunta.deleteMany();
  console.log('Preguntas y respuestas eliminadas');

  //  Carga las categorías existentes desde la base de datos
  const categoriasDB = await prisma.categoria.findMany();
  const categoriasMap = Object.fromEntries(
    categoriasDB.map((cat) => [cat.nombre, cat.id])
  );

  // Insertar las nuevas preguntas
  for (const pregunta of preguntas) {
    const categoriaId = categoriasMap[pregunta.categoriaNombre];

    if (!categoriaId) {
      console.warn(`Categoria no encontrada para: ${pregunta.texto}`);
      continue;
    }

    const createdPregunta = await prisma.pregunta.create({
      data: {
        texto: pregunta.texto,
        dificultad: pregunta.dificultad,
        puntuacion: pregunta.puntuacion,
        categoriaId: categoriaId,
        respuestas: {
          create: pregunta.respuestas.map((respuesta) => ({
            texto: respuesta.texto,
            esCorrecta: respuesta.esCorrecta,
            explicacion: respuesta.explicacion || null,
          })),
        },
      },
    });

    console.log(`✅ Pregunta creada: ${createdPregunta.texto}`);
  }
}

main()
  .then(async () => {
    console.log('Seed completo');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
