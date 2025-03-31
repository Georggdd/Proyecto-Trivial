function Tablero() {
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Fondo del tablero */}
        <img
          src="public/assets/img/fondo-tablero.png"
          alt="Tablero"
          className="w-[50%]"
        />
  
        {/* Imagen path encima del fondo */}
        <img
          src="public/assets/img/path.png"
          alt="Path"
          className="absolute top-1/2 left-1/2 w-[40%] md:w-[40%] 
                   -translate-x-1/2 -translate-y-1/2"
        />
      </div>
    );
  }
  
  export default Tablero;
  