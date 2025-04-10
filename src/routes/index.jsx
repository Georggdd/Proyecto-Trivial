import { Routes, Route, Navigate } from 'react-router-dom';
import VistaRanking from '../pages/VistaRanking';
import PadreRanking from '../components/PadreRanking';
// import Login from '../pages/Login';

// Importa aquí las demás páginas a medida que las vayas creando

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/VistaRanking" />} />
      <Route path="/VistaRanking" element={<PadreRanking />} />
      {/* <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} /> */}
      <Route path="*" element={<h2>Página no encontrada</h2>} />

      {/* Ejemplo:
      <Route path="/dashboard" element={<Dashboard />} />
      */}
    </Routes>
  );
}

export default AppRoutes;