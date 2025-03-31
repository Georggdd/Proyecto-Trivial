// src/components/Tablero.jsx
const casillasRaw = import.meta.glob('./casillas/Casilla*.jsx', {
  eager: true,
  import: 'default',
});


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
        <div className="absolute top-[40.5%] left-[52.5%] w-[4.3%] z-10">
        <Casilla1/>
        </div>
        <div className="absolute left-[63.8%] top-[46.5%] w-[4.3%] z-10">
        <Casilla2/>
        </div>



      </div>

    );
  }
  
  export default Tablero;
  