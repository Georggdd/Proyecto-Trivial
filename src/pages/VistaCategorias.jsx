import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Feature_Categorias from "../components/Feature_Categorias";
import Customizar from "../components/Customizar";
import { QuizSetupContext } from "../context/QuizSetupContext";

export default function VistaCategorias({ onUpload, preguntas, error }) {
  const navigate = useNavigate();
  const {
    selectedFile,
    setSelectedFile,
    selectedCategory,
    setSelectedCategory,
    selectedTeams,
  } = useContext(QuizSetupContext);

  const [menuAbierto, setMenuAbierto] = useState(false);

  // Audio “Por favor elige…”
  const [audioHabilitado, setAudioHabilitado] = useState(false);
  const audioRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio("/assets/audio/por-favor-elije.mp3");
    const handleFirstClick = () => {
      setAudioHabilitado(true);
      document.removeEventListener("click", handleFirstClick);
    };
    document.addEventListener("click", handleFirstClick);
    return () => {
      document.removeEventListener("click", handleFirstClick);
      clearInterval(intervalRef.current);
      audioRef.current?.pause();
      if (audioRef.current) audioRef.current.currentTime = 0;
    };
  }, []);

  useEffect(() => {
    if (!audioHabilitado) return;
    const play = () => audioRef.current.play().catch(() => {});
    play();
    intervalRef.current = setInterval(play, 15000);
    return () => clearInterval(intervalRef.current);
  }, [audioHabilitado]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  const subcategorias = [
    "Idiomas",
    "Música",
    "Matemáticas",
    "Biología",
    "Geografía",
    "Lengua",
  ];
  const SubcategoriaSelect = (sub) => {
    setSelectedCategory(sub);
    setMenuAbierto(false);
    setSelectedFile(null);
  };
  const handleClickOutside = (e) => {
    if (menuAbierto && !e.target.closest(".subcategorias-menu")) {
      setMenuAbierto(false);
    }
  };

  const equiposHechos = selectedTeams.length > 0;
  const opcionesElegidas = [
    Boolean(selectedCategory),
    Boolean(selectedFile),
    equiposHechos,
  ].filter(Boolean).length;
  const puedeIniciar = opcionesElegidas >= 2;
  const handleStart = () => {
    if (puedeIniciar) navigate("/tablero");
  };

  return (
    <div
      className="relative h-full min-h-screen flex flex-col bg-[url('/assets/img/Mesa.svg')] bg-cover border-4 border-double border-orange-600 overflow-hidden"
      onClick={handleClickOutside}
    >
      {/* Header */}
      <div
        className={`relative z-20 flex items-center justify-center border-b-4 border-orange-600 border-double transition-opacity duration-300 ${
          menuAbierto ? "opacity-30" : "opacity-100"
        }`}
      >
        <Header />
      </div>

      {/* Central: imagen + botones */}
      <div
        className={`relative z-20 flex flex-col md:flex-row items-center justify-center flex-1 w-full max-w-[90%] mx-auto py-8 gap-8 transition-opacity duration-300 ${
          menuAbierto ? "opacity-30" : "opacity-100"
        }`}
      >
        {/* Imagen del profesor */}
        <div
          className={`flex-shrink-0 w-[200px] h-[250px] sm:w-[250px] sm:h-[320px] md:w-[300px] md:h-[380px] lg:w-[370px] lg:h-[470px] bg-[url('/assets/img/profesor.jpg')] bg-cover bg-center rounded-lg shadow-xl transition-opacity duration-300 ${
            menuAbierto ? "opacity-40" : "opacity-70"
          }`}
        />

        {/* Botones */}
        <div className="flex flex-col items-center gap-6 w-full max-w-[500px]">
          <Feature_Categorias
            texto={selectedCategory ?? "Categorías"}
            onClick={() => {
              setMenuAbierto((o) => !o);
              if (selectedCategory) setSelectedCategory(null);
              setSelectedFile(null);
            }}
            className="w-[300px] sm:w-[400px] h-[80px] sm:h-[90px] text-2xl sm:text-3xl bg-white/80"
          />

          <Customizar
            setSelectedFile={setSelectedFile}
            selectedFile={selectedFile}
            onUpload={onUpload}
            className="w-[300px] sm:w-[400px] h-[80px] sm:h-[90px] text-2xl sm:text-3xl bg-white/80"
          />

          <Feature_Categorias
            texto={
              selectedTeams.length > 0
                ? `Equipos (${selectedTeams.length})`
                : "Equipos"
            }
            onClick={() => navigate("/equipos")}
            className="w-[300px] sm:w-[400px] h-[80px] sm:h-[90px] text-2xl sm:text-3xl bg-white/80"
          />

          <Feature_Categorias
            texto="START"
            onClick={handleStart}
            className={`w-[300px] sm:w-[400px] h-[80px] sm:h-[90px] text-2xl sm:text-3xl ${
              puedeIniciar
                ? "cursor-pointer bg-white/80"
                : "bg-orange-600 cursor-not-allowed"
            }`}
          />

          {selectedFile && (
            <p className="text-white mt-2 truncate">
              Archivo: {selectedFile.name}
            </p>
          )}
        </div>
      </div>

      {/* Menú de subcategorías */}
      {menuAbierto && (
        <div className="absolute z-20 top-[20%] right-1/2 translate-x-1/2 subcategorias-menu">
          <div className="p-6 bg-white/80 rounded-lg shadow-lg flex flex-col gap-2">
            {subcategorias.map((sub) => (
              <Feature_Categorias
                key={sub}
                texto={sub}
                onClick={() => SubcategoriaSelect(sub)}
                className="w-[300px] h-[60px] text-2xl border-2 border-morado hover:border-black bg-white/80"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}