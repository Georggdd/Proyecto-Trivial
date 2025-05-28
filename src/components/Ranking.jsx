import React from "react";
import ninioAvatar from "../assets/img/ninio.png";

export default function Ranking({
  nombre,
  puntos = 0,
  imagen,     // nombre de archivo o url remota
  destacado,  // para animar al líder (opcional)
}) {
  const puntosNormalizados = Number(puntos) || 0;
  const srcAvatar = imagen || ninioAvatar;

  return (
    <div className="flex items-center justify-center w-full gap-[1vw] pb-[1vh] px-[12vh]">
      {/* Avatar */}
      <div className="w-[5vw] h-[5vw] overflow-hidden flex items-center justify-center rounded-full bg-white border-2 border-naranja">
        <img
          src={srcAvatar.startsWith("http") ? srcAvatar : `http://localhost:3000/uploads/${srcAvatar}`}
          alt={`Imagen del equipo ${nombre}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Nombre del equipo */}
      <div className="w-2/4 bg-white rounded-full border-naranja border-2 text-naranja flex items-center justify-center min-h-[4vw] px-4 py-1 text-center">
        <h3 className="font-personalizada text-[1.8vw] leading-tight">
          {nombre}
        </h3>
      </div>

      {/* Puntos */}
      <div className="w-1/4 bg-white rounded-full border-naranja border-2 text-naranja font-bold flex items-center justify-center min-h-full">
        <h3
          className={`font-personalizada text-[1.8vw] text-center ${
            destacado ? "animate-pulse scale-110" : ""
          }`}
        >
          {puntosNormalizados}
        </h3>
      </div>
    </div>
  );
}
