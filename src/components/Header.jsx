import React from "react";

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
  return (
    <header className="h-32 w-full z-50 bg-[url('/src/assets/pizarra.svg')] shadow-lg bg-cover bg-center">
      <div className="container mx-auto h-full px-4 py-3 flex items-center justify-center">
        {/* Título */}
        <div className="text-center relative">
          <h1 className="text-white text-5xl font-pinyon tracking-wide mb-3">
            Trivial Quiz
          </h1>
          <span className="text-black bg-white text-xl font-secular px-10 mt-4 rounded">
            CUSTOMIZED
          </span>
        </div>

        {/* Botón de menú hamburguesa */}
        <button className="text-white hover:text-gray-300 focus:outline-none absolute right-4">
          <HamburgerIcon />
        </button>
      </div>
    </header>
  );
};

export default Header;