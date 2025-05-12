import express from "express";
import multer from "multer";
import csv from "csv-parser";
import fs from "fs";
import cors from "cors";

/*express: Framework de Node.js	para crear el servidor web y manejar rutas (endpoints).
multer:	Middleware. Permite subir archivos desde formularios (como el .csv).
csv-parser: Librería de lectura. Sirve para leer archivos .csv fila por fila.
fs: File System. Accede al sistema de archivos: leer, borrar, escribir archivos.
cors: Middleware. Permite peticiones desde otro dominio (frontend en React).
*/

const app = express();
app.use(cors()); // Permite la comunicación entre el front y el back.

// Configuración de Multer para guardar archivos en la carpeta 'uploads'.
const upload = multer({ dest: "uploads/" });

// Endpoint para subir archivos CSV
app.post("/upload", upload.single("archivo"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No se subió ningún archivo" });
  }
  /*app.post('/upload', ...): Crea un endpoint accesible desde el frontend mediante POST a /upload.
upload.single('archivo'): Usa Multer para aceptar un solo archivo (el input debe llamarse archivo).
(req, res): La función que maneja la petición y la respuesta.
En la última parte se verifica si realmente se subió un archiv, si no, responde con un error.*/

  //Preparación de arrays
  const preguntasPorDificultad = { facil: [], media: [], dificil: [] };
  const resultados = [];//Almacenará todas las preguntas válidas del CSV.
  const errores = []; //Guardará las filas que estén mal formateadas.

  // Lectura y validación del archivo CSV
  fs.createReadStream(req.file.path) //Lee el archivo .csv como flujo de datos.
    .pipe(csv()) //Envía cada línea del CSV al lector csv-parser.
    .on("data", (data) => { //	Se ejecuta para cada fila del archivo.

      // Validar cada fila
      const isValid = //Comprueba si la fila tiene todas las columnas y que la respuesta correcta esté entre las opciones.
        data.pregunta &&
        data.opcion1 &&
        data.opcion2 &&
        data.opcion3 &&
        data.opcion4 &&
        data.respuesta_correcta &&
        data.dificultad && 
        [data.opcion1, data.opcion2, data.opcion3, data.opcion4].includes(
          data.respuesta_correcta
        );

        if (isValid) {
          // Clasificamos las preguntas por dificultad
          if (data.dificultad === "facil") {
            preguntasPorDificultad.facil.push(data);
          } else if (data.dificultad === "media") {
            preguntasPorDificultad.media.push(data);
          } else if (data.dificultad === "dificil") {
            preguntasPorDificultad.dificil.push(data);
          } else {
            errores.push(`Fila con dificultad desconocida: ${JSON.stringify(data)}`);
          }
          resultados.push(data); // Guardamos las preguntas válidas
        } else {
          errores.push(`Fila inválida: ${JSON.stringify(data)}`); // Si la fila no es válida, la añadimos a errores
        }
      })
    .on("end", () => { //Cuando termina de leer el archivo
      fs.unlinkSync(req.file.path); //Elimina el archivo .csv subido (para no ocupar espacio innecesario en el servidor).

      if (errores.length > 0) {
        return res.status(400).json({
          error: "Algunas filas son inválidas",
          detalles: errores,
          preguntasValidas: resultados,
        });
      }

      // Respondemos con las preguntas organizadas por dificultad
      res.json({
        mensaje: "Archivo procesado correctamente",
        preguntas: preguntasPorDificultad,
      });
    })
    .on("error", (error) => {
      res.status(500).json({ error: "Error al procesar el archivo CSV" });
    });
});

//Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor backend en http://localhost:${PORT}`);
});
