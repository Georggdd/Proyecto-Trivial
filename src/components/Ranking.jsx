import React from "react";

const Ranking = ({ nombre, puntos, destacado }) => {
  return (
    <div className="w-full flex items-center gap-4">
      {/* Imagen */}
      <div className="basis-[15%] flex-shrink-0 min-w-[60px]">
        <img src="/assets/img/ninio.png" alt="Avatar" className="w-full h-auto" />
      </div>

      {/* Nombre */}
      <div className="flex-grow bg-white text-naranja rounded-full border-2 border-naranja px-4 py-2 text-center font-bold overflow-hidden">
        <p className="truncate text-[1.1rem] sm:text-[1.4rem]">{nombre}</p>
      </div>

      {/* Puntos */}
      <div className="basis-[20%] flex-shrink-0 bg-white text-naranja rounded-full border-2 border-naranja px-4 py-2 text-center font-bold">
        <p className={`${destacado ? "animate-pulse scale-110" : ""} text-[1.1rem] sm:text-[1.4rem]`}>
          {puntos}
        </p>
      </div>
    </div>
  );
};

export default Ranking;
