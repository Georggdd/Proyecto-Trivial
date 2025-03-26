
function Ranking() {
  return (
    <>
   {/* //  <-----------inicio CONTENEDOR individual----------------> */}

   <div className="flex w-screen gap-10 items-center justify-center bg-rose-800 border-white border-4 rounded-full shadow-lg relative">
        {/* //  <-----------IMAGEN---------------> */}
        <h1 className=" bg-transparent ml-16 rounded-full">
          <img src='./public/assets/img/ninio.png' className="w-52 -mt-3 -ml-8 rounded-full" alt="Imagen del equipo" />
        </h1>

        {/* //  <-----------NOMBRE DE EQUIPO----------------> */}
        <div className="w-2/4 h-32 bg-rose-300   rounded-full border-white border-4 flex items-center justify-center">
          <h3 className="text-center font-bold text-5xl leading-normal"> Nombre del equipo </h3>
        </div>


        {/* //  <-----------PUNTUACIÓN----------------> */}
        <h1 className="w-1/4 h-32 bg-rose-300 rounded-full border-white border-4 flex items-center justify-center mr-16">
          <h3 className="text-center font-bold text-5xl">200
          </h3>
        </h1>
      </div>


      {/* //  <-----------fin CONTENEDOR individual----------------> */}

      {/* color fondo: bg
      flex items-center justify-center: colocar el nombre en el interior del recuadro
w: distribución del espacio dentro del contenedor
text-center: centrar texto
leading-normal centra interlineado (espacio entre líneas)
whitespace-nowrap: no ocupe dos líneas
bg:color fondo
padding: 
rounded-xl redondeadas las esquinas
m: margen
gap: espacio entre elementos */}



    </>
  );

}


export default Ranking;
