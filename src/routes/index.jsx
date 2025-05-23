import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import VistaCategorias from '../pages/VistaCategorias';

function AppRoutes({ onUpload, preguntas, error }) {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/categorias"
        element={
          <VistaCategorias
            onUpload={onUpload}
            preguntas={preguntas}
            error={error}
          />
        }
      />
    </Routes>
  );
}

export default AppRoutes;