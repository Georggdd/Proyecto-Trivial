import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import VistaCategorias from "./pages/VistaCategorias";
// import EquiposView from "./pages/EquiposView";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VistaCategorias />} />
        {/* Aquí es donde se redirigirá cuando la vista de Equipos esté lista */}
        {/* <Route path="/equipos" element={<EquiposView />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
