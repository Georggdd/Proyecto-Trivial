import React from "react";

const Ranking = ({ nombre, puntos, destacado }) => {
  return (
    <div className="flex items-center justify-center w-full gap-[1vw] pb-[1vh] px-[12vh]">
      {/* Imagen */}
      <div className="bg-transparent">
        <img
          src="/assets/img/ninio.png"
          className="w-[5vw] h-auto"
          alt="Imagen del equipo"
        />
      </div>

      {/* Nombre del equipo */}

    
      <div className="w-2/4 bg-white rounded-full border-naranja border-2 text-naranja flex items-center justify-center min-h-full">
        <h3 className="font-personalizada text-[1.8vw]">{nombre}</h3>
      </div>

{/* /* CON PUNTOS SUSPENSIVOS*/ }

      {/* <div className="w-2/4 bg-white rounded-full border-naranja border-2 text-naranja flex items-center justify-center min-h-full px-4 py-1 overflow-hidden whitespace-nowrap text-ellipsis">
        <h3 className="font-personalizada text-[1.8vw] text-center truncate">{nombre}</h3>
      </div>  */}

   {/* <div className="w-2/4 bg-white rounded-full border-naranja border-2 text-naranja flex items-center justify-center min-h-[4vw] px-4 py-1 text-center">
  <h3
    className="font-personalizada text-[1.6vw] leading-tight"  >
    {nombre}
  </h3>
</div> */}

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