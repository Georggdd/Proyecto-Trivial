import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ZonaInferior from "../components/ZonaInferior";
import Ficha from "../components/Ficha";
import { useJuegoStore } from "../hooks/useJuegoStore";
import { usePartidaStore } from "../hooks/usePartidaStore";
import { casillas } from "../components/Posiciones/tableroData";
import Ranking from "../components/Ranking";
import GuiaPanel from "../components/GuiaPanel";
import { useTurnoStore } from "../hooks/useTurnoStore";
import ModalPregunta from "../components/ModalPregunta";
import { useCategoriaStore } from "../hooks/useCategoriaStore";

function Tablero() {
  /* ---------- Stores ---------- */
  const navigate              = useNavigate();
  const { partidaId }         = usePartidaStore();
  const categoriaSeleccionada = useCategoriaStore((s) => s.categoriaSeleccionada);

  const {
    fichaPos,
    casillasActivas,
    moverFicha,
    setValorDado,
  } = useJuegoStore();

  const equipos        = useTurnoStore((s) => s.equipos);
  const turnoActual    = useTurnoStore((s) => s.turnoActual);
  const setEquipos     = useTurnoStore((s) => s.setEquipos);
  const siguienteTurno = useTurnoStore.getState().siguienteTurno;

  /* ---------- Estado local ---------- */
  const [mostrarModal, setMostrarModal] = useState(false);

  /* ---------- Recuperar equipos de la partida ---------- */
  useEffect(() => {
    if (!partidaId) return;

    (async () => {
      try {
        const res  = await fetch(
          `http://localhost:3000/api/equipos?partidaId=${partidaId}`
        );
        const data = await res.json();
        setEquipos(data);
      } catch (err) {
        console.error("Error al obtener equipos:", err);
      }
    })();
  }, [partidaId, setEquipos]);

  /* ---------- Movimiento y pregunta ---------- */
  const lanzarPregunta = () => setMostrarModal(true);

  const manejarMovimiento = (numero) => {
    moverFicha(numero);

    setTimeout(() => {
      lanzarPregunta();   // abre el modal con la pregunta
      siguienteTurno();   // cambia de turno
    }, 500);
  };

  /* ---------- Render ---------- */
  return (
    <div
      className="flex flex-col min-h-screen w-full pt-32"
      style={{
        backgroundImage: "url(/assets/Mesa.svg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Header />

      {/* ---------- Contenedor Tablero + Ranking ---------- */}
      <div className="flex-grow flex items-center justify-center gap-10 relative pb-10 px-8">
        {/* ----- Tablero ----- */}
        <div className="relative aspect-square w-[90%] max-w-[700px]">
          <img
            src="/assets/img/Tablero-Trivial.jpeg"
            alt="Tablero"
            className="absolute w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-contain z-0"
          />

          {/* Casillas activas (se iluminan) */}
          {casillasActivas.map((numero) => {
            const pos = casillas.find((c) => c.id === numero);
            if (!pos) return null;

            return (
              <div
                key={`casilla-${numero}`}  // Añadir esta key única
                className="absolute z-30 w-[8%] h-[8%] flex items-center justify-center cursor-pointer"
                style={{
                  top: `${pos.top}%`,
                  left: `${pos.left}%`,
                  transform: "translate(-50%, -50%)",
                }}
                onClick={() => manejarMovimiento(numero)}
              >
                <div className="w-[50%] h-[50%] rounded-full bg-white bg-opacity-80 border-4 border-white shadow-[0_0_15px_4px_#7e22ce] animate-pulse pointer-events-none" />
              </div>
            );
          })}

          <Ficha position={fichaPos} />

          {/* Botón para ver ranking a pantalla completa */}
          <button
            onClick={() => navigate("/VistaRanking")}
            className="absolute top-4 right-4 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 z-50"
          >
            Ver Ranking
          </button>
        </div>

        {/* ----- Ranking ----- */}
        <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 translate-x-[360px] w-[300px] z-40">
          <div className="space-y-4">
            {(() => {
              // 1) Ordenamos por puntos (desc) para que el líder quede arriba
              const equiposOrdenados = [...equipos].sort(
                (a, b) => b.puntos - a.puntos
              );

              // 2) Pintamos la lista
              return equiposOrdenados.map((eq, idx) => (
                <Ranking
                  key={eq.id}
                  nombre={eq.nombre}
                  puntos={eq.puntos}
                  imagen={eq.imagen}
                  /* líder → late en naranja */
                  destacado={idx === 0}
                />
              ));
            })()}
          </div>
        </div>
      </div>

      {/* ----- Zona inferior (dado) & panel de guía ----- */}
      <ZonaInferior onDadoResultado={setValorDado} />
      <GuiaPanel />

      {/* ----- Modal con la pregunta ----- */}
      <ModalPregunta
        visible={mostrarModal}
        onClose={() => setMostrarModal(false)}
        categoria={categoriaSeleccionada}
      />
    </div>
  );
}

export default Tablero;


