import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Tablero from './pages/Tablero';
// Importa otras páginas aquí en el futuro, como Login, Lobby, etc.

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/tablero" element={<Tablero />} />
        {/* Ejemplo de rutas adicionales */}
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/lobby" element={<Lobby />} /> */}
      </Routes>
    </Router>
  );
}

export default App;