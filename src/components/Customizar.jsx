import React, { useState } from "react";
import Feature_Categorias from "../components/Feature_Categorias";

const Customizar = ({ setSelectedFile, partidaId }) => {
  const [mensaje, setMensaje] = useState("");
  const [errores, setErrores] = useState([]);

  const handleArchivoChange = async (e) => {
    const archivo = e.target.files[0];
    if (!archivo) return;

    if (!partidaId) {
      console.error("❌ partidaId no está definido");
      setMensaje("Error interno: partidaId no válido");
      return;
    }

    const formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("partidaId", partidaId.toString()); // ✅ forzamos string

    try {
      const res = await fetch("http://localhost:4000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        console.log("✅ CSV subido con éxito");
        setMensaje("Archivo subido correctamente");
        setErrores([]);
        setSelectedFile(archivo);
      } else {
        console.error("❌ Error al subir CSV:", data.error);
        setMensaje("Error al procesar el archivo");
        setErrores(data.detalles || []);
        setSelectedFile(null);
      }
    } catch (err) {
      console.error("❌ Error de red al subir CSV:", err);
      setMensaje("No se pudo conectar al servidor");
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <Feature_Categorias
        texto="Customizar"
        onClick={() => document.getElementById("archivo").click()}
        className="w-[400px] h-[100px] text-3xl"
      />

      {/* Input oculto para subir archivo */}
      <input
        id="archivo"
        type="file"
        accept=".csv"
        onChange={handleArchivoChange}
        className="hidden"
      />

      {/* Mensajes de estado */}
      {mensaje && <p className="text-white">{mensaje}</p>}
      {errores.length > 0 && (
        <ul className="text-red-400 text-sm">
          {errores.map((err, i) => (
            <li key={i}>{err}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Customizar;
