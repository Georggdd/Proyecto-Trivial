import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import preguntas from './data/preguntas.js';
import categorias from './data/categorias.js';

async function main() {
  try {
    // Borra todas las respuestas, preguntas y categorías existentes
    await prisma.respuesta.deleteMany();
    await prisma.pregunta.deleteMany();
    await prisma.categoria.deleteMany();
    console.log('Datos existentes eliminados');

    // Crear las categorías
    const categoriasCreadas = {};
    for (const categoria of categorias) {
      const createdCategoria = await prisma.categoria.create({
        data: {
          nombre: categoria.nombre
        }
      });
      categoriasCreadas[categoria.nombre] = createdCategoria.id;
      console.log(`✅ Categoría creada: ${categoria.nombre}`);
    }

    // Mapeo de asignaturas a categorías
    const mapeoAsignaturas = {
      'Ingles': 'Idiomas',
      'Matematicas': 'Matemáticas',
      'Biologia': 'Biología',
      'Geografia': 'Geografía',
      'Lengua': 'Lengua Castellana',
      'Musica': 'Música'
    };

    // Insertar las nuevas preguntas
    for (const pregunta of preguntas) {
      // Determinar la categoría basada en categoriaNombre o asignatura
      let nombreCategoria = pregunta.categoriaNombre;
      if (!nombreCategoria && pregunta.asignatura) {
        nombreCategoria = mapeoAsignaturas[pregunta.asignatura] || pregunta.asignatura;
      }

      const categoriaId = categoriasCreadas[nombreCategoria];

      if (!categoriaId) {
        console.error(`❌ No se encontró categoría para: ${nombreCategoria}`);
        continue;
      }

      try {
        const createdPregunta = await prisma.pregunta.create({
          data: {
            texto: pregunta.texto,
            dificultad: pregunta.dificultad,
            categoriaId: categoriaId,
            respuestas: {
              create: pregunta.respuestas.map((respuesta) => ({
                texto: respuesta.texto,
                esCorrecta: respuesta.esCorrecta,
              })),
            },
          },
        });

        console.log(`✅ Pregunta creada: ${createdPregunta.texto}`);
      } catch (error) {
        console.error(`❌ Error al crear pregunta: ${pregunta.texto}`);
        console.error(error);
      }
    }
  } catch (error) {
    console.error('Error en el proceso de seed:', error);
    throw error;
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
