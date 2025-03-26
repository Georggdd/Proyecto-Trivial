
function Ranking() {
  return (
    <>

      {/* //  <-----------CONTENEDOR individual----------------> */}

      <div className="flex gap-4 items-center justify-center w-full bg-rose-800 border-white border-4 rounded-full shadow-lg">
        <h1 className="w-1/4 h-32 bg-slate-400 ml-16 p-4 rounded-full"> 
        <img src='./public/assets/img/ninio.png' className="w-24 h-24 mx-auto rounded-full" alt="Imagen del equipo" /></h1>
        <h1 className="w-2/4 h-32 bg-rose-300 text-center leading-normal whitespace-nowrap p-4 rounded-full m-3 border-white border-4">Nombre del equipo más</h1>
        <h1 className="w-1/4 h-32 bg-rose-300 text-center break-words p-4 rounded-full m-3 border-white border-4 mr-16">200 puntos</h1>
      </div>

      {/* color fondo: bg
w: distribución del espacio dentro del contenedor
text-center: centrar texto
leading-normal centrar la altura
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
