import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import VistaCategorias from '../pages/VistaCategorias';
import VistaRanking from '../pages/VistaRanking';
import ExcelDescarga from '../pages/conversion';
// Importa aquí las demás páginas a medida que las vayas creando

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<ExcelDescarga />} />
      <Route path="/VistaCategorias" element={<VistaCategorias />} />
      <Route path="/VistaRanking" element={<VistaRanking />} />
      
      {/* Ejemplo:
      <Route path="/dashboard" element={<Dashboard />} />
      */}
    </Routes>
  );
}

export default AppRoutes;
