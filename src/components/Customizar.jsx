import React, { useState } from "react";
import Feature_Categorias from "./Feature_Categorias";

const Customizar = ({ setSelectedFile, onUpload, selectedFile }) => {
// Estado para mostrar mensajes relacionados con el archivo
  const [mensaje, setMensaje] = useState("");
// Estado para almacenar cualquier error que pueda ocurrir al procesar el archivo
  const [errores, setErrores] = useState([]);

  // Función para manejar el cambio de archivo cuando el usuario selecciona un archivo
  const handleArchivoChange = async (e) => {
    const archivo = e.target.files[0];// Obtiene el archivo seleccionado por el usuario
    if (!archivo) return; // Si no hay archivo seleccionado, no hacer nada

    setSelectedFile(archivo); // Se guarda localmente para mostrar el nombre
    setMensaje("Subiendo archivo...");
    setErrores([]);// Reinicia cualquier error anterior

    try {
      await onUpload(archivo); // Llama a la función onUpload pasada como prop para subir el archivo al backend
      setMensaje("✅ Archivo subido correctamente");
    } catch (err) {
      console.error(err);
      setMensaje("❌ No se pudo procesar el archivo");
      setErrores([err.message || "Error desconocido"]);// Almacena el mensaje de error (si existe)
      setSelectedFile(null);// Si el archivo no se pudo subir, limpia el archivo seleccionado
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <Feature_Categorias
        texto={
          <span className="block w-full truncate text-center text-[clamp(1rem,2.5vw,1.5rem)]">
            {selectedFile ? selectedFile.name : "Customizar"}
          </span>
        }
        //Este es el estado que guarda el archivo que el usuario ha seleccionado. Si selectedFile contiene un valor (es decir, si se ha seleccionado un archivo), se muestra el nombre del archivo con selectedFile.name.
        onClick={() => document.getElementById("archivo").click()}// Simula un click en el input de tipo file
        className="w-[400px] h-[100px]"
      />
      <input
        id="archivo"
        type="file"
        accept=".csv"
        onChange={handleArchivoChange}
        className="hidden"
      />
      {mensaje && <p className="text-white">{mensaje}</p>} {/* Muestra el mensaje de estado, si existe */}
      {errores.length > 0 && (
        <ul className="text-red-400 text-sm text-left mt-2"> {/* Muestra los errores si existen */}
          {errores.map((err, i) => (
            <li key={i}>{err}</li>
            //Recorre cada error y lo muestra
          ))}
        </ul>
      )}
    </div>
  );
};

export default Customizar;
