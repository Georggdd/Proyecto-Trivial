import Casilla0 from '/src/components/casillas/Casilla0';
import Casilla1 from '/src/components/casillas/Casilla1';
import Casilla2 from '/src/components/casillas/Casilla2';
import Casilla3 from '/src/components/casillas/Casilla3';
import Casilla4 from '/src/components/casillas/Casilla4';
import Casilla5 from '/src/components/casillas/Casilla5';


function Tablero() {
    return (
      <div className="relative w-full h-screen">
        {/* Fondo del tablero */}
        <img
          src="/assets/img/fondo-tablero2.png"
          alt="Tablero"
          className="absolute w-[45%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
        />


        
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[10%] z-20">
        <Casilla0/>
        </div>
        <div className="absolute top-[41%] left-[52.5%] w-[4%] z-10">
        <Casilla1 />
        </div>
        <div className="absolute top-[38.4%] left-[54.8%] w-[4%] z-10">
        <Casilla2 />
        </div>
        <div className="absolute top-[36%] left-[57%] w-[4%] z-10">
        <Casilla3 />
        </div>
        <div className="absolute top-[33.5%] left-[59.3%] w-[4%] z-10">
        <Casilla4 />
        </div>
        <div className="absolute top-[31.2%] left-[61.6%] w-[4%] z-10">
        <Casilla5 />
        </div>



      </div>

    );

  }
  
  export default Tablero;


