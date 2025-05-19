//Controlador para subir y porcesar un archivo externo

import fs from 'fs';
import csv from 'csv-parser';
import xlsx from 'xlsx';
import { guardarPreguntas } from './customController.js';

export const procesarArchivo = async (req, res) => { //Para manejar un POST que sube un archivo.
  const archivo = req.file; //Extrae el archivo subido en la porpiedad file del objeto req.
  if (!archivo) {
    return res.status(400).json({ error: 'No se ha subido ningún archivo' });
  }

  const resultados = []; //Almacena las preguntas válidas.
  const errores = []; //Almacena errores encontrados.
  let respuestaEnviada = false;// Evita enviar múltiples respuestas HTTP.

//Función para procesar el archivo
  const procesarFila = (data) => {//Toma cada fila del archivo y la valida. 
    const opciones = { //Extrae las respuestas a,b,c y d del archivo.
      a: data.opcion_a,
      b: data.opcion_b,
      c: data.opcion_c,
      d: data.opcion_d,
    };
    const correcta = data.correcta?.toLowerCase();

    const isValid = //Verifica que todos los campos necesarios estén presentes y que la opción correcta sea válida.
      data.pregunta &&
      opciones.a &&
      opciones.b &&
      opciones.c &&
      opciones.d &&
      ["a", "b", "c", "d"].includes(correcta) &&
      data.dificultad &&
      data.explicacion;

    if (isValid) { //Si la fila es válida, se formatea y se guarda en resultados. Si no, se añade un error a errores.
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


  //Lógica de lectura del archivo
  try {
    const ext = archivo.originalname.split('.').pop().toLowerCase();//Obtiene la extensión del archivo.
    //Caso CSV
    if (ext === 'csv') {
      fs.createReadStream(archivo.path)
        .pipe(csv())  //Se parsea el archivo CSV en streaming.
        .on('data', procesarFila) //Por cada fila encontrada, se llama a `procesarFila`.
        .on('end', async () => {
          fs.unlinkSync(archivo.path); //Borra el archivo temporal.
          await manejarResultado(res, resultados, errores);//Procesa el resultado.
        })
        .on('error', (err) => manejarError(res, err, archivo.path));//Manejo de errores.
    
      //Caso excel  
      } else if (ext === 'xlsx' || ext === 'xls') {
      const workbook = xlsx.readFile(archivo.path);
      const sheetName = workbook.SheetNames[0];//Solo se lee la primera hoja.
      const sheet = workbook.Sheets[sheetName];
      const jsonData = xlsx.utils.sheet_to_json(sheet, { defval: "" });//Convierte la hoja a JSON.

      jsonData.forEach(procesarFila);
      fs.unlinkSync(archivo.path);
      await manejarResultado(res, resultados, errores);
    } else {
      fs.unlinkSync(archivo.path);
      return res.status(400).json({ error: 'Formato de archivo no soportado' });
    }

    //Manejo de errores generales
  } catch (error) {
    console.error('❌ Error interno:', error);
    if (!respuestaEnviada) {
      res.status(500).json({ error: 'Error interno del servidor' });
      respuestaEnviada = true;
    }
  }
};

//Función auxiliar para procesar resultados
async function manejarResultado(res, resultados, errores) {
  //Si hay errores en la fila se ejecuta esto:
  if (errores.length > 0) {
    return res.status(400).json({
      error: 'Algunas filas son inválidas',
      detalles: errores,
      preguntasValidas: resultados,
    });
  }

  //Si todo está correcto de ejectura esto otro:
  try {
    await guardarPreguntas(resultados);//Llama a función que guarda en la BD.
    return res.json({
      mensaje: 'Archivo procesado y preguntas guardadas',
      preguntas: resultados,
    });
  } catch (dbError) {
    console.error('❌ Error al guardar en la base de datos:', dbError);
    return res.status(500).json({ error: 'Error al guardar en la base de datos' });
  }
}

//Manejo de errores al leer archivo
function manejarError(res, err, path) {
  fs.unlinkSync(path);
  console.error('❌ Error al parsear archivo:', err);
  return res.status(500).json({ error: 'Error al procesar el archivo' });
}
