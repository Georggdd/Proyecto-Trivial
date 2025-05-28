import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Feature_Categorias from "../components/Feature_Categorias";
import Customizar from "../components/Customizar";

export default function VistaCategorias({ onUpload, preguntas, error }) {
  /* ─── Estado general ─── */
  const [Menu, setMenu] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [equiposHechos, setEquiposHechos] = useState(false);
  const navigate = useNavigate();

  /* ─── Audio “Por favor elige…” ─── */
  const [audioHabilitado, setAudioHabilitado] = useState(false);
  const audioRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    // Prepara el audio pero no lo reproduce hasta el primer clic
    audioRef.current = new Audio("/assets/audio/por-favor-elije.mp3");

    const handleFirstClick = () => {
      setAudioHabilitado(true);
      document.removeEventListener("click", handleFirstClick);
    };
    document.addEventListener("click", handleFirstClick);

    return () => {
      document.removeEventListener("click", handleFirstClick);
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  useEffect(() => {
    if (!audioHabilitado) return;
    const playAudio = () => {
      audioRef.current.play().catch(() => {});
    };
    playAudio();
    intervalRef.current = setInterval(playAudio, 15000);
    return () => clearInterval(intervalRef.current);
  }, [audioHabilitado]);

  /* ─── Subcategorías ─── */
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
    setSelectedFile(null);
  };

  const ClickOutside = (e) => {
    if (Menu && !e.target.closest(".subcategorias-menu")) {
      setMenu(false);
    }
  };

  /* ─── START habilitado si… ─── */
  const puedeIniciar = equiposHechos && (selectedFile || categoriaSeleccionada);
  const handleStart = () => {
    if (puedeIniciar) navigate("/tablero");
  };

  return (
    <div
      className="h-full w-full relative flex flex-col min-h-screen bg-[url('/assets/img/Mesa.svg')] bg-cover border-4 border-double border-orange-600 overflow-hidden"
      onClick={ClickOutside}
    >
      {/* Header */}
      <div
        className={`relative z-10 border-b-4 border-orange-600 border-double transition-opacity duration-300 ${
          Menu ? "opacity-60" : "opacity-100"
        }`}
      >
        <Header />
      </div>

      {/* Botonera */}
      <div
        className={`relative z-20 flex flex-wrap justify-center items-center gap-6 w-full max-w-[90%] mx-auto py-8 transition-opacity duration-300 ${
          Menu ? "opacity-30" : "opacity-100"
        }`}
      >
        {/* 1. Categorías */}
        <Feature_Categorias
          texto={categoriaSeleccionada ?? "Categorías"}
          onClick={() => {
            setMenu((m) => !m);
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
          onClick={() => navigate("/equipos")}
          className="w-[300px] sm:w-[400px] h-[80px] sm:h-[90px] text-2xl sm:text-3xl"
        />

        {/* 4. START */}
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
          <p className="text-white mt-2 truncate">
            Archivo: {selectedFile.name}
          </p>
        )}
      </div>

      {/* Menú de subcategorías */}
      {Menu && (
        <div className="absolute z-20 top-[20%] right-1/2 translate-x-1/2 sm:right-[30%] sm:translate-x-0 subcategorias-menu">
          <div className="p-6 rounded-lg shadow-lg flex flex-col gap-2 bg-white bg-opacity-80">
            {subcategorias.map((sub) => (
              <Feature_Categorias
                key={sub}
                texto={sub}
                onClick={() => SubcategoriaSelect(sub)}
                className="w-[300px] h-[60px] text-2xl border-2 border-morado hover:border-black"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
