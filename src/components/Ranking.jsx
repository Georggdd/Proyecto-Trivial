import React from "react";

const Ranking = ({ nombre, puntos, destacado }) => {

  return (
    <>
      {/* //  <-----------inicio CONTENEDOR individual----------------> */}

      <div className="flex items-center justify-center w-full gap-5 
 rounded-full relative">

        {/* //  <-----------IMAGEN---------------> */}
        <div className=" bg-transparent"> {/* bg: sin fondo, ml para dejar margen a la izquierda */}
          <img src='/assets/img/ninio.png' className="w-[7vw]" alt="Imagen del equipo" />
          {/* w: establece el ancho de la imagen
          mt: margen superior negativo, para que sobresalga del espacio
          -ml margen izquierdo negativo,  */}
        </div>

        {/* //  <-----------NOMBRE DE EQUIPO----------------> */}
        <div className="w-2/4  bg-white  rounded-full border-naranja border-2 text-naranja items-center justify-center">

          <h3 className="text-center font-personalizada text-[4vw]">
            {nombre}
          </h3>
        </div>


        {/* //  <-----------PUNTUACIÓN----------------> */}

        <div className="w-1/4 bg-white rounded-full border-naranja border-2 text-naranja font-bold items-center justify-center">
          <h3 className={`text-center font-personalizada text-[4vw] ${destacado ? "animate-pulse text-naranja scale-110" : ""}`}>
            {puntos}
          </h3>
        </div>

      </div>
      {/* //  <-----------fin CONTENEDOR individual----------------> */}




</>
    
  );
}
export default Ranking;