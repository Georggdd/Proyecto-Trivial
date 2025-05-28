import React from "react";

const Ranking = ({ nombre, puntos, foto, destacado }) => { //recibe los nombres del padre 
  return (
    <div className="flex items-center justify-center w-full gap-[1vw] pb-[1vh] px-[12vh]">
      {/* Imagen de la BBDD*/}
   <div className="w-[5vw] h-[5vw] overflow-hidden flex items-center justify-center rounded-full bg-white border-2 border-naranja">
  <img
    src={`http://localhost:3000/uploads/${foto}`}
    className="w-full h-full object-cover"
    alt={`Imagen del equipo ${nombre}`}
  />
</div>

      {/* Nombre del equipo */}

      <div className="w-2/4 bg-white rounded-full border-naranja border-2 text-naranja flex items-center justify-center min-h-[4vw] px-4 py-1 text-center">
        <h3
          className="font-personalizada text-[1.8vw] leading-tight"  >
          {nombre}
        </h3>
      </div>

      {/* Puntos */}
      <div className="w-1/4 bg-white rounded-full border-naranja border-2 text-naranja font-bold flex items-center justify-center min-h-full">
        <h3
          className={`font-personalizada text-[1.8vw] text-center ${destacado ? "animate-pulse scale-110" : ""
            }`}
        >
          {puntos}
        </h3>
      </div>
    </div>
  );
};

export default Ranking;