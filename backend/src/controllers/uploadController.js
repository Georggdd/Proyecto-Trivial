import { createReadStream } from 'fs';
import csv from 'csv-parser';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const asignaturasValidas = [
  'idioma',
  'musica',
  'matematicas',
  'biologia',
  'geografia',
  'lengua',
];

const dificultadesValidas = ['facil', 'intermedia', 'dificil'];

export const procesarCSV = async (req, res) => {
  const filePath = req.file.path;
  const preguntas = [];

  const partidaId = parseInt(req.body.partidaId);
  console.log("📦 PartidaId recibido:", partidaId); // 👈 AÑADE ESTO
  if (!partidaId) {
    return res.status(400).json({ error: "Falta partidaId" });
  }

  createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => {
      preguntas.push(row);
    })
    .on('end', async () => {
      const errores = [];

      for (const pregunta of preguntas) {
        try {
          const asignatura = pregunta.asignatura?.toLowerCase();
          const dificultad = pregunta.dificultad?.toLowerCase();

          // Validación de campos obligatorios
          if (
            !pregunta.texto ||
            !asignatura ||
            !dificultad ||
            !pregunta.respuesta1 ||
            !pregunta.respuesta2 ||
            !pregunta.respuesta3 ||
            !pregunta.respuesta4 ||
            !pregunta.respuesta_correcta
          ) {
            errores.push(`Fila incompleta: ${JSON.stringify(pregunta)}`);
            continue;
          }

          if (
            !asignaturasValidas.includes(asignatura) ||
            !dificultadesValidas.includes(dificultad)
          ) {
            errores.push(`Asignatura o dificultad inválida: ${JSON.stringify(pregunta)}`);
            continue;
          }

          const respuestas = [
            { texto: pregunta.respuesta1, esCorrecta: pregunta.respuesta_correcta === '1' },
            { texto: pregunta.respuesta2, esCorrecta: pregunta.respuesta_correcta === '2' },
            { texto: pregunta.respuesta3, esCorrecta: pregunta.respuesta_correcta === '3' },
            { texto: pregunta.respuesta4, esCorrecta: pregunta.respuesta_correcta === '4' },
          ];

          const nuevaPregunta = await prisma.pregunta.create({
            data: {
              texto: pregunta.texto,
              asignatura,
              dificultad,
              partidaId,
            },
          });

          await prisma.respuesta.createMany({
            data: respuestas.map((r) => ({
              texto: r.texto,
              esCorrecta: r.esCorrecta,
              preguntaId: nuevaPregunta.id,
            })),
          });
        } catch (error) {
          console.error('❌ Error en fila:', pregunta, error);
          errores.push(`Error inesperado: ${error.message}`);
        }
      }

      if (errores.length > 0) {
        return res.status(400).json({
          message: 'El archivo se procesó con errores',
          errores,
        });
      }

      res.status(200).json({ message: 'Preguntas importadas correctamente' });
    });
};

