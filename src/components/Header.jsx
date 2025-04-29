import React, { useState } from "react";

  const HamburgerIcon = () => (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );
  
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    // Aquí iría la lógica para cerrar sesión
    console.log("Cerrar sesión");
  };

  const handleExitGame = () => {
    // Aquí iría la lógica para salir del juego
    console.log("Salir del juego");
  };

  return (
    <header className="h-32 fixed top-0 left-0 right-0 z-50 w-full bg-[url('/assets/Fondo.svg')] shadow-lg bg-cover bg-center">
      <div className="container mx-auto h-full px-4 py-3 flex items-center justify-center">
         {/* Título */}
         <div className="text-center relative">
          <h1 className="text-white text-5xl font-pinyon tracking-wide mb-3">
          EduK
          </h1>
        </div>
        {/* Botón de menú hamburguesa y menú desplegable */}
        <div className="absolute right-4">
          <button 
            className="text-white hover:text-gray-300 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <HamburgerIcon />
          </button>
          {/* Menú desplegable */}
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg px-2 py-2">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-400 focus:outline-none border-none"
              >
                Cerrar Sesión
              </button>
              <button
                onClick={handleExitGame}
                className="block w-full text-left px-4 py-2 mt-1 text-sm text-gray-700 hover:bg-gray-400 focus:outline-none border-none"
              >
                Salir del Juego
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
export default Header;