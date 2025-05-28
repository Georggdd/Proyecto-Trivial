import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleCerrarSesion = async () => {
    setMenuOpen(false); // Cierra el menú inmediatamente

    try {
      await fetch("http://localhost:3000/api/reset/preguntas/", {
        method: "DELETE",
      });
      console.log("✅ Preguntas eliminadas");
    } catch (error) {
      console.error("❌ Error al eliminar preguntas:", error);
    }

    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="h-32 top-0 left-0 right-0 z-50 w-full bg-[url('/assets/img/pizarra.jpg')] shadow-lg bg-cover bg-center">
      <div className="container mx-auto h-full px-4 py-3 flex items-center justify-center">
        {/* Título */}
        <div className="text-center relative">
          <h1 className="text-white text-5xl font-pinyon tracking-wide mb-3">
            El Educatrivial

          </h1>
          <span className="text-black bg-white text-xl font-secular px-10 mt-4 rounded">
            CUSTOMIZED
          </span>
        </div>

        {/* Botón hamburguesa */}
        <button
          className="text-white hover:text-gray-300 focus:outline-none absolute right-4"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <HamburgerIcon />
        </button>

        {/* Menú con solo Cerrar sesión */}
        {menuOpen && (
          <div className="absolute top-28 right-4 border border-black bg-white rounded-md shadow-lg z-50 w-48 text-center font-itim text-lg">
            <button
              onClick={handleCerrarSesion}
              className="w-full py-2 text-black hover:bg-gray-200 transition-colors"
            >
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
