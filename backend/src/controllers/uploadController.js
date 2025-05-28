// src/controllers/uploadController.js

import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import xlsx from 'xlsx';
import { guardarPreguntas } from './customizableController.js';

// Asegúrate de que exista la carpeta uploads
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

export const procesarArchivo = async (req, res) => {
  console.log('📝 Procesando archivo de preguntas customizadas…');

  if (!req.file) {
    console.error('❌ No se ha subido ningún archivo');
    return res.status(400).json({ error: 'No se ha subido ningún archivo' });
  }

  const filePath = req.file.path;
  console.log('📁 Archivo recibido:', req.file.originalname);

  const resultados = [];
  const errores = [];

  // Valida y transforma cada fila
  const procesarFila = (data) => {
    // Extrae campos y normaliza
    const texto      = data.pregunta?.trim();
    const categoria  = data.categoria?.trim();
    const dificultad = data.dificultad?.trim().toLowerCase();
    const puntuacion = parseInt(data.puntuacion, 10);
    const opcionA    = data.opcion_a?.trim();
    const opcionB    = data.opcion_b?.trim();
    const opcionC    = data.opcion_c?.trim();
    const opcionD    = data.opcion_d?.trim();
    const correcta   = data.correcta?.trim().toLowerCase();
    const explicacion= data.explicacion?.trim() || '';

    // Validación mínima
    const valida =
      texto &&
      categoria &&
      ['a','b','c','d'].includes(correcta) &&
      !isNaN(puntuacion) &&
      opcionA && opcionB && opcionC && opcionD;

    if (!valida) {
      errores.push(`Fila inválida: ${JSON.stringify(data)}`);
      return;
    }

    // Mapea letra correcta a texto
    const respuestaCorrecta = { a: opcionA, b: opcionB, c: opcionC, d: opcionD }[correcta];

    resultados.push({
      pregunta:           texto,
      categoria,
      dificultad,
      puntuacion,
      opcion1:            opcionA,
      opcion2:            opcionB,
      opcion3:            opcionC,
      opcion4:            opcionD,
      respuesta_correcta: respuestaCorrecta,
      explicacion,
    });
  };

  // Función para limpiar archivo y enviar error
  const finConError = (status, payload) => {
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    return res.status(status).json(payload);
  };

  try {
    const ext = path.extname(req.file.originalname).toLowerCase();

    if (ext === '.csv') {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', procesarFila)
        .on('end', async () => {
          await manejarResultado(res, resultados, errores);
          fs.unlinkSync(filePath);
        })
        .on('error', (err) => finConError(500, { error: 'Error al leer CSV' }));
    } else if (ext === '.xlsx' || ext === '.xls') {
      const workbook = xlsx.readFile(filePath);
      const sheet1   = workbook.SheetNames[0];
      const filas    = xlsx.utils.sheet_to_json(workbook.Sheets[sheet1], { defval: '' });
      filas.forEach(procesarFila);
      await manejarResultado(res, resultados, errores);
      fs.unlinkSync(filePath);
    } else {
      return finConError(400, { error: 'Formato de archivo no soportado' });
    }
  } catch (err) {
    console.error('❌ Error procesando archivo:', err);
    return finConError(500, { error: 'Error interno al procesar archivo' });
  }
};

async function manejarResultado(res, resultados, errores) {
  if (errores.length) {
    console.warn(`⚠️ ${errores.length} filas inválidas`);
    return res.status(400).json({
      error: 'Algunas filas inválidas',
      detalles: errores,
      validas: resultados.length,
    });
  }

  try {
    const { count } = await guardarPreguntas(resultados);
    return res.json({
      mensaje: `${count} preguntas importadas correctamente`,
    });
  } catch (dbErr) {
    console.error('❌ Error al guardar en BD:', dbErr);
    return res.status(500).json({ error: 'Falló al guardar en la base de datos' });
  }
}
