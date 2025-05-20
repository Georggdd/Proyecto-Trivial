import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Feature_Categorias from "../components/Feature_Categorias";
import Customizar from "../components/Customizar";
import { useCategoriaStore } from "../hooks/useCategoriaStore";

export default function VistaCategorias() {
  const navigate  = useNavigate();
  const location  = useLocation();

  /* ---------- Selectores del store ---------- */
  const categorias               = useCategoriaStore((s) => s.categorias);                // ARRAY
  const categoriaSeleccionada    = useCategoriaStore((s) => s.categoriaSeleccionada);
  const setCategoriaSeleccionada = useCategoriaStore((s) => s.setCategoriaSeleccionada);
  const cargarCategorias         = useCategoriaStore((s) => s.cargarCategorias);

  /* ---------- Estado local ---------- */
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [selectedFile, setSelectedFile] = useState(
    location.state?.selectedFile || null
  );
  const [equiposHechos, setEquiposHechos] = useState(
    location.state?.equiposConfigurados || false
  );

  /* ---------- Cargar categorías al montar ---------- */
  useEffect(() => {
    if (!categorias.length) cargarCategorias();
  }, []);

  /* ---------- Habilitar botón “Empezar juego” ---------- */
  const puedeIniciar =
    equiposHechos && (Boolean(selectedFile) || Boolean(categoriaSeleccionada));

  /* ---------- Render ---------- */
  return (
    <div
      className="min-h-screen flex flex-col bg-[url('/assets/img/Mesa.svg')] bg-cover border-4 border-double border-orange-600"
      onClick={(e) => {
        if (menuAbierto && !e.target.closest(".subcategorias-menu"))
          setMenuAbierto(false);
      }}
    >
      {/* Header */}
      <Header />

      {/* Contenido */}
      <div className="flex flex-1 items-center justify-center">
        <div className="flex flex-col sm:flex-row items-center gap-12">
          {/* Profesor */}
          <img
            src="/assets/img/profesor.jpg"
            alt="Profesor"
            className="w-[300px] opacity-70"
          />

          {/* Botonera */}
          <div className="flex flex-col items-center gap-6">
            {/* 1. Categorías */}
            <Feature_Categorias
              texto={categoriaSeleccionada || "Categorías"}
              className="w-[400px] h-[100px] text-3xl"
              onClick={() => {
                if (!categorias.length) cargarCategorias();
                setMenuAbierto((open) => !open);
                setCategoriaSeleccionada(null);
                setSelectedFile(null);
              }}
            />

            {/* 2. Subir archivo */}
            <Customizar
              setSelectedFile={(file) => {
                setSelectedFile(file);
                setCategoriaSeleccionada(null);
              }}
            />

            {selectedFile && (
              <p className="text-white text-lg font-semibold">
                Archivo: <span className="underline">{selectedFile.name}</span>
              </p>
            )}

            {/* 3. Equipos */}
            <Feature_Categorias
              texto="Equipos"
              className="w-[400px] h-[100px] text-3xl"
              onClick={() =>
                navigate("/TarjetaEquipo", {
                  state: { categoriaSeleccionada, selectedFile },
                })
              }
            />

            {/* 4. Empezar juego */}
            <Feature_Categorias
              texto="Empezar juego"
              className={`w-[400px] h-[100px] text-3xl ${
                puedeIniciar ? "" : "pointer-events-none opacity-40"
              }`}
              onClick={() =>
                navigate("/tablero", {
                  state: { categoriaSeleccionada, selectedFile },
                })
              }
            />
          </div>
        </div>
      </div>

      {/* Menú de subcategorías */}
      {menuAbierto && (
        <div className="absolute right-[30%] top-[20%] z-20 subcategorias-menu">
          <div className="p-6 bg-white/80 rounded-lg shadow-lg flex flex-col gap-2">
            {(categorias || [])
              .filter((cat) => cat.nombre !== "Customizable")
              .map((cat) => (
                <Feature_Categorias
                  key={cat.id}
                  texto={cat.nombre}
                  className="sm:w-[300px] h-[60px] text-2xl border-4 border-morado hover:border-black"
                  onClick={() => {
                    setCategoriaSeleccionada(cat.nombre);
                    setMenuAbierto(false);
                  }}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}