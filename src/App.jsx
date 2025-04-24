import PruebasElevenLabs from './pages/Pruebas-elevenlabs'
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Tablero from "./pages/Tablero";
import VistaCategorias from "./pages/VistaCategorias";
import Login from "./pages/Login";
import axios from "axios"; // Importa axios para las peticiones al backend

function App() {
  const [preguntas, setPreguntas] = useState([]);
  const [error, setError] = useState(null);

  // Función para manejar la subida del CSV
  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("archivo", file); // "archivo" debe coincidir con el nombre en multer (backend)

    try {
      const response = await axios.post(
        "http://localhost:3000/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setPreguntas(response.data.preguntas); // Guarda las preguntas procesadas
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || "Error al procesar el archivo");
      console.error("Error:", err.response?.data);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/Eleven" element={<PruebasElevenLabs />} />
        <Route
          path="/Categorias"
          element={
            <VistaCategorias
              onUpload={handleUpload}
              preguntas={preguntas}
              error={error}
            />
          }
        />
        <Route path="/tablero" element={<Tablero />} />
        <Route path="/login" element={<Login />} />
        {/* Ejemplo de rutas adicionales */}
        {/* <Route path="/lobby" element={<Lobby />} /> */}
        {/* <Route path="/equipos" element={<EquiposView />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
