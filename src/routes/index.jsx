import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
// Importa aquí las demás páginas a medida que las vayas creando

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      {/* Ejemplo:
      <Route path="/dashboard" element={<Dashboard />} />
      */}
    </Routes>
  );
}

export default AppRoutes;