import Casilla0 from '/src/components/casillas/Casilla0';
import Casilla1 from '/src/components/casillas/Casilla1';

function Tablero() {
    return (
      <div className="relative w-full h-screen">
        {/* Fondo del tablero */}
        <img
          src="/assets/img/fondo-tablero.png"
          alt="Tablero"
          className="absolute w-[50%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
        />
  
        {/* Imagen path encima del fondo */}
        <img
          src="/assets/img/path.png"
          alt="Path"
          className="absolute w-[40%] md:w-[40%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10" 
        />

        
        
        <div className="relative w-[50%] h-[80%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <Casilla0 className="absolute w-[10px] left-[10%] top-[40%]"/>
        <Casilla1 className="absolute w-[10px] left-[65%] top-[30%]"/>

        </div>
      </div>

    );
  }
  
  export default Tablero;
  