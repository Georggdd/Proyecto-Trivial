// src/routes/AppRoutes.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Páginas principales (controller‑ranking)
import Login from "../pages/Login";
import ExcelDescarga from "../pages/conversion";
import VistaCategorias from "../pages/VistaCategorias";
import VistaRanking from "../pages/VistaRanking";

// Vistas añadidas desde la rama Back‑end
import PruebasElevenLabs from "../pages/Pruebas-elevenLabs";
import Tablero from "../pages/Tablero";
import Equipos from "../pages/Equipos";
import PadreRanking from "../components/PadreRanking";

export default function AppRoutes({ onUpload, preguntas, error }) {
  return (
    <Routes>
      {/* Redirección por defecto a /login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Página de autenticación */}
      <Route path="/login" element={<Login />} />

      {/* Rutas de controller‑ranking */}
      <Route path="/conversion" element={<ExcelDescarga />} />
      <Route 
        path="/VistaCategorias" 
        element={
          <VistaCategorias 
            onUpload={onUpload} 
            preguntas={preguntas} 
            error={error}
          />
        } 
      />
      <Route path="/VistaRanking" element={<VistaRanking />} />

      {/* Rutas importadas desde Back‑end */}
      <Route path="/pruebas-elevenlabs" element={<PruebasElevenLabs />} />
      <Route path="/tablero" element={<Tablero />} />
      <Route path="/equipos" element={<Equipos />} />
      <Route path="/ranking" element={<PadreRanking />} />
    </Routes>
  );
}
