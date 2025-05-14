import express from 'express';
import multer from 'multer';
import csv from 'csv-parser';
import xlsx from 'xlsx';
import fs from 'fs';
import cors from 'cors';
import { guardarPreguntas } from './controllers/Controller_Customizable.js';
/*express: Framework de Node.js	para crear el servidor web y manejar rutas (endpoints).
multer:	Middleware. Permite subir archivos desde formularios (como el .csv).
csv-parser: Librería de lectura. Sirve para leer archivos .csv fila por fila.
fs: File System. Accede al sistema de archivos: leer, borrar, escribir archivos.
cors: Middleware. Permite peticiones desde otro dominio (frontend en React).
*/

const app = express();
app.use(cors()); // Permite la comunicación entre el front y el back.

// Configuración de Multer para guardar archivos en la carpeta 'uploads'.
const upload = multer({ dest: 'uploads/' });

// Endpoint para subir archivos CSV
app.post('/upload', upload.single('archivo'), async (req, res) => {
  const archivo = req.file;
  if (!archivo) {
    return res.status(400).json({ error: 'No se ha subido ningún archivo' });
  }
/*app.post('/upload', ...): Crea un endpoint accesible desde el frontend mediante POST a /upload.
upload.single('archivo'): Usa Multer para aceptar un solo archivo (el input debe llamarse archivo).
(req, res): La función que maneja la petición y la respuesta.
En la última parte se verifica si realmente se subió un archiv, si no, responde con un error.*/

  const resultados = [];
  const errores = [];
  let respuestaEnviada = false;
  //Crea dos arrays: uno para las preguntas válidas (resultados) y otro para los errores. También un flag para evitar responder dos veces.

  const procesarFila = (data) => { //Esta función se llamda por cada fila del archivo y, si es válida, la transforma a un formato que la base de datos puede guardar.
    const opciones = {             //El parámetro data representa una fila del archivo ya convertida en objeto js.
      a: data.opcion_a,
      b: data.opcion_b,
      c: data.opcion_c,
      d: data.opcion_d,
    };
    const correcta = data.correcta?.toLowerCase(); //"?":si data.correcta no existe, no lanza un error, simplemente devuelve undefined.

    const isValid = //Comprueba si la fila tiene todas las columnas y que la respuesta correcta esté entre las opciones.
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
      errores.push(`Fila inválida: ${JSON.stringify(data)}`); //Si la fila no es válida, se convierte a cadena con JSON.stringify(data) y se guarda en el array de errores para que después podamos notificar qué filas han fallado.
    }
  };

  try {
    const ext = archivo.originalname.split('.').pop().toLowerCase(); // Extrae la extensión del archivo (csv, xlsx, xls) para saber cómo procesarlo.

    if (ext === 'csv') { //Para csv
      fs.createReadStream(archivo.path) //Se crea un flujo del lectura desde la ruta donde Muler guardó el archivo.
        .pipe(csv()) //Pasa el contenido del archivo a través del parser de CSV, que convierte cada línea en un objeto js.
        .on('data', procesarFila) //Cada vez que se lee una fila del CSV, se dispara el evento 'data', y esa fila se pasa a la función procesarFila(data) para que la valide y convierta al formato correcto.
        .on('end', async () => {
          fs.unlinkSync(archivo.path);//Elimina el archivo temporal del disco para no ocupar espacio.
          await manejarResultado(res, resultados, errores); //Responde al frontend con los resultados o errores, y guarda en la base de datos.
        })
        .on('error', (err) => manejarError(res, err, archivo.path));//Si ocurre un error mientras se lee o parsea el archivo, ejecutamos una función para eliminar el archivo y enviar un error.
    } else if (ext === 'xlsx' || ext === 'xls') { //Si no es csv, se comprueba si el archivo es un excel, ya sea .xlsx o .xls
      const workbook = xlsx.readFile(archivo.path); //Leer el archivo Excel y cargarlo como un objeto de tipo "workbook" (libro de Excel completo).
      const sheetName = workbook.SheetNames[0]; //Obtenemos el nombre de la primera hoja del Excel
      const sheet = workbook.Sheets[sheetName]; //Accedemos al contenido de esa hoja, que es un objeto con las celdas (A1, B1, etc.).
      const jsonData = xlsx.utils.sheet_to_json(sheet, { defval: "" });//Convertimos la hoja a un array de objetos JSON.
      
      jsonData.forEach(procesarFila);//Procesamos cada fila, validándola y transformándola con procesarFila.
      fs.unlinkSync(archivo.path);
      await manejarResultado(res, resultados, errores);
    } else {
      fs.unlinkSync(archivo.path); // Si no es CSV ni Excel, se elimina el archivo y se responde al usuario con un error 400.
      return res.status(400).json({ error: 'Formato de archivo no soportado' });
    }
  } catch (error) {
    console.error('❌ Error interno:', error);
    if (!respuestaEnviada) {
      res.status(500).json({ error: 'Error interno del servidor' });
      respuestaEnviada = true;
    }
  }
});

async function manejarResultado(res, resultados, errores) { //res:es el objeto de respuesta de Express, lo usaremos para responder al frontend.
  if (errores.length > 0) {
    return res.status(400).json({
      error: 'Algunas filas son inválidas',
      detalles: errores,
      preguntasValidas: resultados,
    });
  }//Si hay errores en filas, devuelve un error 400 con las filas inválidas
   //Si todo está bien, llama a guardarPreguntas() y responde con éxito.


  try {
    await guardarPreguntas(resultados); //Llamamos a la función guardarPreguntas que se encarga de insertar las preguntas en la base de datos.
    return res.json({
      mensaje: 'Archivo procesado y preguntas guardadas',
      preguntas: resultados,
    });
  } catch (dbError) {
    console.error('❌ Error al guardar en la base de datos:', dbError);
    return res.status(500).json({ error: 'Error al guardar en la base de datos' });
  }
}

function manejarError(res, err, path) {//Función para manejar errores inesperados durante la lectura del archivo (por ejemplo, si está corrupto).
  fs.unlinkSync(path); ////Elimina inmediatamente el archivo 
  console.error('❌ Error al parsear archivo:', err);
  return res.status(500).json({ error: 'Error al procesar el archivo' });
} 

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor backend en http://localhost:${PORT}`);
}); //Inicia el servidor
