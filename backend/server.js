import express from 'express'; //Framework para construir aplicaciones web en Node.js.
import multer from 'multer';//Middleware para manejar la subida de archivos, en este caso, se usará para manejar los archivos CSV.
import csv from 'csv-parser';//Biblioteca para leer y analizar archivos CSV.
import fs from 'fs';//Módulo nativo de Node.js para trabajar con el sistema de archivos, se usará para leer y eliminar el archivo después de procesarlo.
import cors from 'cors';//Middleware que permite que el servidor backend reciba peticiones de un dominio diferente (en este caso, de React, el frontend).

const app = express();
app.use(cors()); // Permite peticiones desde React.

const upload = multer({ dest: 'uploads/' });
//Configura un almacenamiento temporal para los archivos subidos. Los archivos se guardarán en la carpeta uploads/ del servidor. 
//dest define el directorio donde Multer guardará los archivos temporalmente.

// Ruta para la subida de archivos
app.post('/upload', upload.single('archivo'), (req, res) => {
  /*app.post('/upload'): Define una ruta POST en el servidor para recibir las solicitudes de subida de archivos.
    upload.single('archivo'): Multer se encarga de manejar la subida del archivo. archivo es el nombre del campo del formulario en el frontend que contiene el archivo. Solo se admite un archivo por solicitud.
   (req, res): Los parámetros req y res son los objetos de solicitud y respuesta de Express.*/
  const archivoCSV = req.file; //Multer coloca el archivo subido en el objeto req.file. Si no se ha subido ningún archivo, req.file será undefined.
  if (!archivoCSV) { //Verifica si no se ha subido ningún archivo. Si es así, responde con un error 400 y un mensaje indicando que no se ha subido un archivo.
    return res.status(400).json({ error: 'No se ha subido ningún archivo' });
  }

  const resultados = [];//Un array para almacenar las preguntas que han sido validadas correctamente.
  const errores = [];//Un array para almacenar las filas del archivo CSV que no sean válidas.

  try {
    fs.createReadStream(req.file.path)//Lee el archivo CSV desde el sistema de archivos utilizando la ruta temporal donde Multer lo guardó.
      .pipe(csv()) //Pasa el archivo a través del csv-parser para convertir el contenido del archivo CSV en objetos JavaScript.
      .on('data', (data) => {//Por cada fila del archivo CSV, el evento data es disparado, y data es un objeto que contiene los datos de esa fila.
        const opciones = { //Crea un objeto con las opciones de respuesta (a, b, c, d) de cada fila.
          a: data.opcion_a,
          b: data.opcion_b,
          c: data.opcion_c,
          d: data.opcion_d,
        };

        const correcta = data.correcta?.toLowerCase();//Extrae la respuesta correcta de la fila, asegurándose de que esté en minúsculas (en caso de que la respuesta esté en mayúsculas).

        // Validación de las filas
        const isValid = //Valida si la fila tiene todos los campos necesarios y que la respuesta correcta esté en uno de los valores permitidos 
          data.pregunta &&
          opciones.a &&
          opciones.b &&
          opciones.c &&
          opciones.d &&
          ["a", "b", "c", "d"].includes(correcta);

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
        //Si la fila es válida, se guarda en el array resultados un objeto con los detalles de la pregunta.
        //Si la fila no es válida, se agrega un mensaje de error al array errores.
      })
      .on('end', () => {//Cuando se termina de leer el archivo, el evento end es disparado.
        fs.unlinkSync(req.file.path); // Elimina el archivo después de procesarlo

        if (errores.length > 0) {
          res.status(400).json({
            error: 'Algunas filas son inválidas',
            detalles: errores,
            preguntasValidas: resultados,
          });
        } else {
          res.json({
            mensaje: 'Archivo procesado correctamente',
            preguntas: resultados,
          });
          //Si hay errores en el archivo, se responde con un error 400, los detalles de los errores y las preguntas válidas.
          //Si no hay errores, se responde con un mensaje indicando que el archivo se procesó correctamente y se incluyen las preguntas válidas.
        }
      });
  } catch (error) {
    console.error("❌ Error interno del servidor:", error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }//Si ocurre un error durante el procesamiento, se captura en el bloque catch y se responde con un error 500 (error interno del servidor).
});

const PORT = 3000;//Establece el puerto en el que el servidor escuchará las peticiones.
app.listen(PORT, () => {//Inicia el servidor en el puerto especificado y muestra un mensaje en la consola indicando que el servidor está funcionando.
  console.log(`Servidor backend en http://localhost:${PORT}`);
});
