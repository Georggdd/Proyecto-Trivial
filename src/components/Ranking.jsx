import React from "react";
import { useTurnoStore } from "../hooks/useTurnoStore";

/**
 * Muestra un equipo con su avatar, nombre y puntos.
 * - Resalta en morado si es el turno de ese equipo.
 * - Late en naranja si va 1.º en la tabla (prop `destacado`).
 */
const Ranking = ({ nombre, puntos = 0, imagen, destacado = false }) => {
  const turnoActual = useTurnoStore((s) => s.turnoActual);
  const equipos     = useTurnoStore((s) => s.equipos);
  const esTurno     = equipos[turnoActual]?.nombre === nombre;

  // Asegurar que puntos sea un número válido
  const puntosNormalizados = Number(puntos) || 0;

  return (
    <div className="relative w-full flex items-center gap-4 rounded-xl p-2 overflow-hidden">
      {/* Fondo morado animado -solo- cuando es su turno */}
      {esTurno && (
        <div className="absolute inset-0 bg-purple-700 opacity-70 animate-pulse z-0" />
      )}

      {/* Avatar */}
      <div className="relative z-10 basis-[15%] flex-shrink-0 min-w-[60px]">
        <img
          src={imagen ?? "/assets/img/ninio.png"}
          alt="Avatar"
          className="w-full h-auto rounded-full"
        />
      </div>

      {/* Nombre */}
      <div className="relative z-10 flex-grow bg-white text-naranja border-2 border-naranja rounded-full px-4 py-2 text-center font-bold overflow-hidden">
        <p className="truncate text-[1.1rem] sm:text-[1.4rem]">{nombre}</p>
      </div>

      {/* Puntos */}
      <div className="relative z-10 basis-[20%] flex-shrink-0 bg-white text-naranja border-2 border-naranja rounded-full px-4 py-2 text-center font-bold">
        <p
          className={`${
            destacado ? "animate-pulse scale-110" : ""
          } text-[1.1rem] sm:text-[1.4rem]`}
        >
          {puntosNormalizados}
        </p>
      </div>
    </div>
  );
};

export default Ranking;
