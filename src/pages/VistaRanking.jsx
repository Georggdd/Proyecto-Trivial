import React from "react";
import Ranking from "../components/Ranking";
import Header from "../components/Header";

const VistaRanking = ({ equipo = [] }) => {
  // Datos por defecto (pruebas)
  if (equipo.length === 0) {
    equipo = [
      { nombre: "Equipo A", puntos: 120 },
      { nombre: "Equipo B", puntos: 90 },
      { nombre: "Equipo C", puntos: 85 },
    ];
  }

  return (
    <div className="min-h-screen bg-[url('/assets/Mesa.svg')] bg-cover bg-center flex flex-col relative z-0">
      {/* ✅ Header */}
      <Header />

      {/* 🎉 Banderines */}
      <div className="w-full flex justify-center items-center py-12 sm:py-16 lg:py-20">
        <img
          src="/assets/img/banderines.png"
          alt="Banderines"
          className="w-full max-w-screen-xl h-auto object-cover"
        />
      </div>

      {/* 🏆 Bloque principal con ranking y mensaje */}
      <div className="flex justify-center items-center gap-8 lg:gap-16 px-4 flex-wrap md:flex-nowrap">
        {/* 🎯 Recuadro con fondo decorativo */}
        <div className="relative w-full max-w-5xl min-h-[550px] flex flex-col justify-center items-center px-4">
          {/* Fondo SVG como imagen completa */}
          <img
            src="/assets/img/FondoRank.svg"
            alt="Fondo Ranking"
            className="absolute inset-0 w-full h-full object-contain z-0"
          />

          {/* Contenido de los rankings */}
          <div className="relative z-10 w-full px-6 sm:px-12 py-4 space-y-6">
            {equipo
              .sort((a, b) => b.puntos - a.puntos)
              .map((eq, idx) => (
                <Ranking
                  key={idx}
                  nombre={eq.nombre}
                  puntos={eq.puntos}
                  destacado={idx === 0}
                />
              ))}
          </div>
        </div>

        {/* 💬 Mensaje + flecha */}
        <div className="flex flex-col items-center text-[#c26884] space-y-6 mt-10 lg:mt-0">
          <div className="text-center leading-tight">
            <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-md">
              Hasta
              <br />
              pronto
              <br />
              equipos
            </p>
          </div>

          <img
            src="/assets/flecha.svg"
            alt="Flecha"
            className="w-10 h-10 lg:w-14 lg:h-14 animate-bounce"
          />
        </div>
      </div>
    </div>
  );
};

export default VistaRanking;