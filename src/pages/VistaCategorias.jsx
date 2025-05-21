import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Feature_Categorias from "../components/Feature_Categorias";
import Customizar from "../components/Customizar";

export default function VistaCategorias({ onUpload, preguntas, error }) {
  /* ---------- Estado general ---------- */
  const [Menu, setMenu] = useState(false);          // visor del sub-menú
  const [selectedFile, setSelectedFile] = useState(null);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [equiposHechos, setEquiposHechos] = useState(false);
  const navigate = useNavigate();

  /* ---------- Audio “Por favor elige…” ---------- */
  useEffect(() => {
    const audio = new Audio("/assets/audio/por-favor-elije.mp3");

    const playAudio = () => {
      audio.play().catch(console.error);
    };

    playAudio();                       // al montar
    const id = setInterval(playAudio, 15000);

    return () => {
      clearInterval(id);
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  /* ---------- Subcategorías fijas ---------- */
  const subcategorias = [
    "Idiomas",
    "Música",
    "Matemáticas",
    "Biología",
    "Geografía",
    "Lengua",
  ];

  const SubcategoriaSelect = (sub) => {
    setCategoriaSeleccionada(sub);
    setMenu(false);
    setSelectedFile(null);          // descarta archivo si cambias de categoría
  };

  const ClickOutside = (e) => {
    if (Menu && !e.target.closest(".subcategorias-menu")) setMenu(false);
  };

  /* ---------- START habilitado si… ---------- */
  const puedeIniciar = equiposHechos && (selectedFile || categoriaSeleccionada);

  const handleStart = () => {
    if (puedeIniciar) navigate("/tablero");
  };

  /* ---------- Render ---------- */
  return (
    <div
      className="h-full w-full relative flex flex-col min-h-screen bg-[url('/assets/img/Mesa.svg')] bg-cover border-4 border-double border-orange-600 bg-transparent overflow-hidden"
      onClick={ClickOutside}
    >
      {/* ───── Header ───── */}
      <div
        className={`relative z-10 border-b-4 border-orange-600 border-double transition-all duration-300 ${
          Menu ? "opacity-60" : "opacity-100"
        }`}
      >
        <Header />
      </div>

      {/* ───── Profesor + botones ───── */}
      <div
        className={`relative z-20 flex flex-row flex-nowrap items-center justify-center gap-8 w-full max-w-[90%] mx-auto py-8 mt-12 transform -translate-x-32 sm:-translate-x-32 md:-translate-x-44 lg:-translate-x-52 transition-all duration-300 ${
          Menu ? "opacity-30" : "opacity-100"
        }`}
      >
        {/* Foto profesor */}
        <div
          className={`flex-shrink-0 w-[200px] h-[250px] sm:w-[250px] sm:h-[320px] md:w-[300px] md:h-[380px] lg:w-[370px] lg:h-[470px] bg-[url('/assets/img/profesor.jpg')] bg-cover bg-center rounded-lg shadow-xl transition-opacity duration-300 ${
            Menu ? "opacity-40" : "opacity-70"
          }`}
        />

        {/* Botonera */}
        <div className="flex flex-col items-center gap-6 w-full max-w-[500px]">
          {/* 1. Categorías */}
          <Feature_Categorias
            texto={categoriaSeleccionada ?? "Categorías"}
            onClick={() => {
              setMenu(!Menu);
              if (categoriaSeleccionada) setCategoriaSeleccionada(null);
              setSelectedFile(null);
            }}
            className="w-[300px] sm:w-[400px] h-[80px] sm:h-[90px] text-2xl sm:text-3xl"
          />

          {/* 2. Customizar (subir JSON) */}
          <Customizar
            setSelectedFile={setSelectedFile}
            selectedFile={selectedFile}
            onUpload={onUpload}
            className="w-[300px] sm:w-[400px] h-[80px] sm:h-[90px] text-2xl sm:text-3xl"
          />

          {/* 3. Equipos */}
          <Feature_Categorias
            texto="Equipos"
            className="w-[300px] sm:w-[400px] h-[80px] sm:h-[90px] text-2xl sm:text-3xl"
            onClick={() => navigate("/equipos")}
          />

          {/* 4. START */}
          {/* añadido */}
          <Feature_Categorias
            texto="START"
            onClick={handleStart}
            className={`w-[300px] sm:w-[400px] h-[80px] sm:h-[90px] text-2xl sm:text-3xl ${
              puedeIniciar
                ? "cursor-pointer"
                : "bg-orange-600 cursor-not-allowed"
            }`}
          />

          {selectedFile && (
            <p className="text-white mt-2">
              Archivo seleccionado: {selectedFile.name}
            </p>
          )}
        </div>
      </div>

      {/* ───── Menú de subcategorías ───── */}
      {Menu && (
        <div className="absolute z-20 flex flex-col top-[20%] right-1/2 translate-x-1/2 sm:right-[30%] sm:translate-x-0 subcategorias-menu">
          <div className="p-6 rounded-lg shadow-lg flex flex-col gap-2 bg-transparent">
            {subcategorias.map((sub) => (
              <Feature_Categorias
                key={sub}
                texto={sub}
                onClick={() => SubcategoriaSelect(sub)}
                className="sm:w-[300px] h-[60px] text-2xl border-2 border-morado hover:border-black"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}