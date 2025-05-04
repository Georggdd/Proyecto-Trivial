import React from "react";
import { useTurnoStore } from "../hooks/useTurnoStore";

const Ranking = ({ nombre, puntos, destacado }) => {
  const turnoActual = useTurnoStore((state) => state.turnoActual);
  const equipos = useTurnoStore((state) => state.equipos);
  const esTurno = equipos[turnoActual]?.nombre === nombre;

  return (
    <div className="relative w-full flex items-center gap-4 rounded-xl p-2 overflow-hidden">
      {/* Fondo morado animado solo si es el turno */}
      {esTurno && (
        <div className="absolute inset-0 bg-purple-700 animate-pulse opacity-70 z-0" />
      )}

      {/* Contenido encima del fondo */}
      <div className="relative z-10 basis-[15%] flex-shrink-0 min-w-[60px]">
        <img
          src={equipos[turnoActual]?.nombre === nombre && equipos[turnoActual]?.imagen
            ? equipos[turnoActual].imagen
            : "/assets/img/ninio.png"}
          alt="Avatar"
          className="w-full h-auto rounded-full"
        />
      </div>

      <div className="relative z-10 flex-grow bg-white text-naranja rounded-full border-2 border-naranja px-4 py-2 text-center font-bold overflow-hidden">
        <p className="truncate text-[1.1rem] sm:text-[1.4rem]">{nombre}</p>
      </div>

      <div className="relative z-10 basis-[20%] flex-shrink-0 bg-white text-naranja rounded-full border-2 border-naranja px-4 py-2 text-center font-bold">
        <p className={`${destacado ? "animate-pulse scale-110" : ""} text-[1.1rem] sm:text-[1.4rem]`}>
          {puntos ?? 0}
        </p>
      </div>
    </div>
  );
};

export default Ranking;
