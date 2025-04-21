import React from "react";

const Ranking = ({nombre, puntos}) => {
  
  return (
    <>

    <div className="">
      {/* //  <-----------inicio CONTENEDOR individual----------------> */}

      <div className="alineacion w-full gap-10 
      rounded-full shadow-lg relative">
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
        <div className=" bg-transparent ml-16"> {/* bg: sin fondo, ml para dejar margen a la izquierda */}
          <img src='/assets/img/ninio.png' className="w-52 -mt-3 -ml-8" alt="Imagen del equipo" />
          {/* w: establece el ancho de la imagen
          mt: margen superior negativo, para que sobresalga del espacio
          -ml margen izquierdo negativo,  */}
        </div>

        {/* //  <-----------NOMBRE DE EQUIPO----------------> */}
        <div className="w-2/4 h-32 bg-white  rounded-full border-naranja border-2 text-naranja font-personalizada alineacion">
          { /*w-2/4 lo que ocupa en el espacio.
        h: la altura del contenedor interno.
        bg: el color de fondo
        rounded-full: los bordes redondeados
        border-4 el grosor
        flex, items-center justify-center: elementos dentro de flex centrados vertical y horizontalmente.
        */ }
          <h3 className="text-center font-personalizada text-5xl">
            {nombre}
          </h3>
        </div>


        {/* //  <-----------PUNTUACIÓN----------------> */}
        <h1 className="w-1/4 h-32 bg-white rounded-full border-naranja text-naranja border-2 alineacion mr-16">
          <h3 className="text-center text-7xl">
            {puntos}
            </h3>
        </h1>

      </div>
      {/* //  <-----------fin CONTENEDOR individual----------------> */}




    </div>

    </>
  );

}

// const RankingDatos = ({ nombre, puntos }) => {
//   // este es un componente dentro de otro . luego lo llamamos para pasarlos datos recibidos
//   // encargado de mostrar datos individuales de cada equipo.

//   return (
//       // vamos a ver por donde sale el sol
//       <div className="w-5/6 bg-white rounded-full shadow-md py-2 px-6 flex justify-between items-center text-lg font-semibold text-morado">
//           <span>{nombre}</span>
//           <span>{puntos} pts</span>
//       </div>
//   )
// }


export default Ranking;
