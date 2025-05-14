import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import TarjetaEquipo from "../components/TarjetaEquipo";

function Equipos() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/tablero"); 
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col relative"
      style={{ backgroundImage: "url('/assets/Mesa.svg')" }}
    >
      <Header />

      <div className="flex-grow flex flex-col justify-center items-center text-white translate-y-[-40px] z-10">
        <h2 className="text-3xl mb-6">EQUIPOS</h2>

        <div className="flex flex-wrap justify-center items-center gap-6 max-w-7xl">
          {[...Array(5)].map((_, index) => (
            <TarjetaEquipo key={index} nombreInicial={`Equipo ${index + 1}`} />
          ))}
        </div>

        <button
          onClick={handleStart}
          className="mt-8 bg-black hover:bg-gray-800 text-white text-xl px-6 py-2 rounded-full flex items-center gap-2 transition"
        >
          START
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Equipos;