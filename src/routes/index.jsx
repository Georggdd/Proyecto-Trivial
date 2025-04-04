import { Routes, Route, Navigate } from 'react-router-dom';
import VistaRanking from '../pages/VistaRanking';

// Importa aquí las demás páginas a medida que las vayas creando

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/VistaRanking" />} />
      <Route path="/VistaRanking" element={<VistaRanking />} />
      {/* <Route path="*" element={<h2>Página no encontrada</h2>} /> */}
     {/* <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} /> */}

      {/* Ejemplo:
      <Route path="/dashboard" element={<Dashboard />} />
      */}
    </Routes>
  );
}

export default AppRoutes;