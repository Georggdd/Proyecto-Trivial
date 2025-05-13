import React from "react";
import { Routes, Route } from "react-router-dom";
import PruebasElevenLabs from "../pages/Pruebas-elevenLabs";
import VistaCategorias from "../pages/VistaCategorias";
import Tablero from "../pages/Tablero";
import Login from "../pages/Login";
import Equipos from "../pages/Equipos";
import PadreRanking from "../components/PadreRanking";
import { Navigate } from "react-router-dom";


const AppRoutes = ({ handleUpload, preguntas, error }) => {
  return (
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
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/TarjetaEquipo" element={<Equipos />} />
      <Route path="/VR" element={<Navigate to="/VistaRanking" />} />
      <Route path="/VistaRanking" element={<PadreRanking />} />
      <Route path="/VistaCategorias" element={<VistaCategorias />} />
      <Route path="/eleven" element={<PruebasElevenLabs />} />
    </Routes>
  );
};

export default AppRoutes;
