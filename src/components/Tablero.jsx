import Casilla1 from '/src/components/casillas/Casilla1';

function Tablero() {
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Fondo del tablero */}
        <img
          src="/assets/img/fondo-tablero.png"
          alt="Tablero"
          className="w-[50%]"
        />
  
        {/* Imagen path encima del fondo */}
        <img
          src="/assets/img/path.png"
          alt="Path"
          className="absolute top-1/2 left-1/2 w-[40%] md:w-[40%] 
                   -translate-x-1/2 -translate-y-1/2 z-10"
        />
        <div>
            <Casilla1 className="absolute top-[60%] left-[50%] w-[40px] h-[40px] z-10"></Casilla1>
        </div>
        
      </div>

    );
  }
  
  export default Tablero;
  