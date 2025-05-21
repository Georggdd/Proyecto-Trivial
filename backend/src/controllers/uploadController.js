import fs from 'fs';
import csv from 'csv-parser';
import xlsx from 'xlsx';
import path from 'path';
import { guardarPreguntas } from './customController.js';

// Asegurarse de que el directorio uploads existe
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

export const procesarArchivo = async (req, res) => {
  console.log('📝 Procesando archivo...');
  
  if (!req.file) {
    console.error('❌ No se recibió ningún archivo');
    return res.status(400).json({ error: 'No se ha subido ningún archivo' });
  }

  console.log('📁 Archivo recibido:', req.file.originalname);

  const resultados = [];
  const errores = [];
  let respuestaEnviada = false;

  const procesarFila = (data) => {
    console.log('🔄 Procesando fila:', data);
    
    const isValid = 
      data.pregunta &&
      data.categoria &&
      data.dificultad &&
      data.opcion_a &&
      data.opcion_b &&
      data.opcion_c &&
      data.opcion_d &&
      ["a", "b", "c", "d"].includes(data.correcta?.toLowerCase()) &&
      data.puntuacion;

    if (isValid) {
      const respuestaCorrecta = {
        a: data.opcion_a,
        b: data.opcion_b,
        c: data.opcion_c,
        d: data.opcion_d
      }[data.correcta.toLowerCase()];

      resultados.push({
        pregunta: data.pregunta,
        categoria: data.categoria,
        dificultad: data.dificultad.toLowerCase(),
        puntuacion: parseInt(data.puntuacion) || 10,
        opcion1: data.opcion_a,
        opcion2: data.opcion_b,
        opcion3: data.opcion_c,
        opcion4: data.opcion_d,
        respuesta_correcta: respuestaCorrecta,
        explicacion: data.explicacion || `La respuesta correcta es: ${respuestaCorrecta}`
      });
      console.log('✅ Fila válida procesada');
    } else {
      errores.push(`Fila inválida: ${JSON.stringify(data)}`);
      console.log('❌ Fila inválida:', data);
    }
  };

  try {
    const ext = req.file.originalname.split('.').pop().toLowerCase();
    
    if (ext === 'csv') {
      fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data', procesarFila)
        .on('end', async () => {
          await manejarResultado(res, resultados, errores);
          fs.unlinkSync(req.file.path);
        })
        .on('error', (err) => manejarError(res, err, req.file.path));
    } else if (ext === 'xlsx' || ext === 'xls') {
      const workbook = xlsx.readFile(req.file.path);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = xlsx.utils.sheet_to_json(sheet, { defval: "" });

      jsonData.forEach(procesarFila);
      await manejarResultado(res, resultados, errores);
      fs.unlinkSync(req.file.path);
    } else {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: 'Formato de archivo no soportado' });
    }
  } catch (error) {
    console.error('❌ Error al procesar archivo:', error);
    if (!respuestaEnviada) {
      res.status(500).json({ error: 'Error interno del servidor' });
      respuestaEnviada = true;
    }
  }
};

async function manejarResultado(res, resultados, errores) {
  if (errores.length > 0) {
    console.log('⚠️ Se encontraron errores:', errores.length);
    return res.status(400).json({
      error: 'Algunas filas son inválidas',
      detalles: errores,
      preguntasValidas: resultados,
    });
  }

  try {
    await guardarPreguntas(resultados);
    console.log('✅ Preguntas guardadas exitosamente');
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
  console.error('❌ Error al leer archivo:', err);
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }
  return res.status(500).json({ error: 'Error al procesar el archivo' });
}
