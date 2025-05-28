import React from "react";
import ninioAvatar from "../assets/img/ninio.png";
// Importa tu avatar por defecto desde public vía URL:
// (con Vite funciona igual: la ruta empieza por '/assets/...' y el bundler lo expone)

export default function Ranking({ nombre, puntos = 0, imagen }) {
  const puntosNormalizados = Number(puntos) || 0;
  // Si 'imagen' viene null/undefined/'' caerá al import
  const srcAvatar = imagen || ninioAvatar;
  return (
    <div className="
      w-full flex items-center gap-4 rounded-xl p-2
      bg-naranja-50 border-2 border-orange-500
    ">
      {/* Avatar */}
      <div className="basis-[15%] flex-shrink-0 min-w-[60px]">
        <img
          src={srcAvatar}
          alt={nombre}
          className="w-full h-auto rounded-full"
        />
      </div>

      {/* Nombre */}
      <div className="flex-grow text-center font-bold text-naranja">
        <p className="truncate text-[1.1rem] sm:text-[1.4rem]">
          {nombre}
        </p>
      </div>

      {/* Puntos */}
      <div className="basis-[20%] flex-shrink-0 text-center font-bold text-naranja">
        <p className="text-[1.1rem] sm:text-[1.4rem]">
          {puntosNormalizados}
        </p>
      </div>
    </div>
  );
}
