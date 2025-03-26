import { useState } from "react";
import Categorias from "./components/Feature_Categorias";

function App() {
  return (
    <div>
      <Categorias texto="CATEGORÍAS" />
      <Categorias texto="CUSTOMIZAR" />
      <Categorias texto="EQUIPOS" />
    </div>
  );
}

export default App;
