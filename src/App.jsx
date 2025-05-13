import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Tablero from "./pages/Tablero";
import VistaCategorias from "./pages/VistaCategorias";
import Login from "./pages/Login";
import axios from "axios"; // Importa axios para las peticiones al backend
import AppRoutes from "./routes/index"; // Importa tus rutas

function App() {
  const [preguntas, setPreguntas] = useState([]);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

  // Función para manejar el login exitoso
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      
      <AppRoutes />
    </Router>
  );
}

export default App;
