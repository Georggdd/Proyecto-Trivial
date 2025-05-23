
import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
//import VistaCategorias from "./pages/VistaCategorias";
import AppRoutes from "./routes/index";
import axios from "axios"; // Importa axios para las peticiones al backend

function App() {
  const [preguntas, setPreguntas] = useState([]);
  const [error, setError] = useState(null);

  // Función para manejar la subida del CSV
    const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("archivo", file); // "archivo" debe coincidir con el nombre en multer (backend)

    try {
      const response = await axios.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setPreguntas(response.data.preguntas);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || "Error al procesar el archivo");
      console.error("Error:", err.response?.data);
    }
  };

  return (
    <Router>
      <AppRoutes 
        onUpload={handleUpload} 
        preguntas={preguntas} 
        error={error} 
      />
    </Router>
  );
}

export default App;

