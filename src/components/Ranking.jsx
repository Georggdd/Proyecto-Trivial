import React from "react";
const Ranking = () => {

  return (
    <>
      {/* //  <-----------inicio CONTENEDOR individual----------------> */}

      <div className="alineacion w-screen gap-10  bg-morado border-white border-4 rounded-full shadow-lg relative">
        {/*
          flex: el contenedor se divide en columnas
          items-center alineación vertical
          justify-center alineación horizontal
          --------------------
          w-sreen el ancho del contenedor será el 100%
          gap-10 para el espacio entre los hijos
          ---------------------
          bg- para el color de fondo back ground
          border para el bordeado y número para el grosor
          rounded: redondeado de las esquinas
          shadow para la sombra
          ------------------
          relativa: posición relativa para que los hijos puedan posicionarse de una manera específica
          */}


        {/* //  <-----------IMAGEN---------------> */}
        <h1 className=" bg-transparent ml-16"> {/* bg: sin fondo, ml para dejar margen a la izquierda */}
          <img src='/assets/img/ninio.png' className="w-52 -mt-3 -ml-8" alt="Imagen del equipo" />
          {/* w: establece el ancho de la imagen
          mt: margen superior negativo, para que sobresalga del espacio
          -ml margen izquierdo negativo,  */}
        </h1>

        {/* //  <-----------NOMBRE DE EQUIPO----------------> */}
        <div className="w-2/4 h-32 bg-fuchsia-300  rounded-full border-white border-4 alineacion">
          { /*w-2/4 lo que ocupa en el espacio.
        h: la altura del contenedor interno.
        bg: el color de fondo
        rounded-full: los bordes redondeados
        border-4 el grosor
        flex, items-center justify-center: elementos dentro de flex centrados vertical y horizontalmente.
        */ }
          <h3 className="text-center font-hueca text-5xl"> Nombre del equipo </h3>
        </div>


        {/* //  <-----------PUNTUACIÓN----------------> */}
        <h1 className="w-1/4 h-32 bg-fuchsia-300 rounded-full border-white border-4 alineacion mr-16">
          <h3 className="text-center text-7xl">200
          </h3>
        </h1>

      </div>
      {/* //  <-----------fin CONTENEDOR individual----------------> */}




    </>
  );

}


export default Ranking;
