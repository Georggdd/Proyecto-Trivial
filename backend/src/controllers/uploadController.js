import fs from 'fs';
import csv from 'csv-parser';
import xlsx from 'xlsx';
import { guardarPreguntas } from './customController.js';

export const procesarArchivo = async (req, res) => {
  const archivo = req.file;
  if (!archivo) {
    return res.status(400).json({ error: 'No se ha subido ningún archivo' });
  }

  const resultados = [];
  const errores = [];
  let respuestaEnviada = false;

  const procesarFila = (data) => {
    const opciones = {
      a: data.opcion_a,
      b: data.opcion_b,
      c: data.opcion_c,
      d: data.opcion_d,
    };
    const correcta = data.correcta?.toLowerCase();

    const isValid =
      data.pregunta &&
      opciones.a &&
      opciones.b &&
      opciones.c &&
      opciones.d &&
      ["a", "b", "c", "d"].includes(correcta) &&
      data.dificultad &&
      data.explicacion;

    if (isValid) {
      resultados.push({
        pregunta: data.pregunta,
        opcion1: opciones.a,
        opcion2: opciones.b,
        opcion3: opciones.c,
        opcion4: opciones.d,
        respuesta_correcta: opciones[correcta],
        dificultad: data.dificultad,
        explicacion: data.explicacion,
      });
    } else {
      errores.push(`Fila inválida: ${JSON.stringify(data)}`);
    }
  };

  try {
    const ext = archivo.originalname.split('.').pop().toLowerCase();

    if (ext === 'csv') {
      fs.createReadStream(archivo.path)
        .pipe(csv())
        .on('data', procesarFila)
        .on('end', async () => {
          fs.unlinkSync(archivo.path);
          await manejarResultado(res, resultados, errores);
        })
        .on('error', (err) => manejarError(res, err, archivo.path));
    } else if (ext === 'xlsx' || ext === 'xls') {
      const workbook = xlsx.readFile(archivo.path);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = xlsx.utils.sheet_to_json(sheet, { defval: "" });

      jsonData.forEach(procesarFila);
      fs.unlinkSync(archivo.path);
      await manejarResultado(res, resultados, errores);
    } else {
      fs.unlinkSync(archivo.path);
      return res.status(400).json({ error: 'Formato de archivo no soportado' });
    }
  } catch (error) {
    console.error('❌ Error interno:', error);
    if (!respuestaEnviada) {
      res.status(500).json({ error: 'Error interno del servidor' });
      respuestaEnviada = true;
    }
  }
};

async function manejarResultado(res, resultados, errores) {
  if (errores.length > 0) {
    return res.status(400).json({
      error: 'Algunas filas son inválidas',
      detalles: errores,
      preguntasValidas: resultados,
    });
  }

  try {
    await guardarPreguntas(resultados);
    return res.json({
      mensaje: 'Archivo procesado y preguntas guardadas',
      preguntas: resultados,
    });
  } catch (dbError) {
    console.error('❌ Error al guardar en la base de datos:', dbError);
    return res.status(500).json({ error: 'Error al guardar en la base de datos' });
  }
}

function manejarError(res, err, path) {
  fs.unlinkSync(path);
  console.error('❌ Error al parsear archivo:', err);
  return res.status(500).json({ error: 'Error al procesar el archivo' });
}
