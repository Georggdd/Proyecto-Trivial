import express from 'express';
import multer from 'multer';//Para manejar formularios, necesario para subir archivos.
import { procesarArchivo } from '../controllers/uploadController.js';

const router = express.Router(); //Crea un nuevo enrutador de Express que permite definir rutas de forma modular (por ejemplo, en un archivo separado del server.js principal).
const upload = multer({ dest: 'uploads/' });//Inicializa multer y le indica que los archivos subidos se guarden temporalmente en la carpeta uploads/ del proyecto.

router.post('/', upload.single('archivo'), procesarArchivo);
/*Define una ruta POST / (relativa a donde se use este router).
  upload.single('archivo'): middleware de multer que permite subir un único archivo con el campo archivo (el name="archivo" del formulario).
  Luego, pasa el archivo a la función procesarArchivo, que se encargará de procesarlo, validarlo y guardar los datos en la base de datos.*/

export default router;
