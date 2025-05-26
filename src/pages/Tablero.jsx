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
  const navigate = useNavigate();
  const { partidaId } = usePartidaStore();
  const categoriaSeleccionada = useCategoriaStore(
    (s) => s.categoriaSeleccionada
  );

  const { fichaPos, casillasActivas, moverFicha, setValorDado } =
    useJuegoStore();

  const equipos = useTurnoStore((s) => s.equipos);
  const setEquipos = useTurnoStore((s) => s.setEquipos);
  const avanzarTurno = useTurnoStore((s) => s.avanzarTurno);

  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    console.log("[tablero] equipos actualizados:", equipos);
  }, [equipos]);

  useEffect(() => {
    if (!partidaId) return;
    (async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/equipos?partidaId=${partidaId}`
        );
        const data = await res.json();
        console.log("[tablero] equipos cargados al iniciar:", data);
        setEquipos(data);
      } catch (err) {
        console.error("Error al obtener equipos:", err);
      }
    })();
  }, [partidaId, setEquipos]);

  const manejarMovimiento = (numero) => {
    moverFicha(numero);
    setTimeout(() => setMostrarModal(true), 500);
  };

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

      <div className="flex-grow flex items-center justify-center gap-10 relative pb-10 px-8">
        {/* Tablero */}
        <div className="relative aspect-square w-[90%] max-w-[700px]">
          <img
            src="/assets/img/Tablero-Trivial.jpeg"
            alt="Tablero"
            className="absolute w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-contain z-0"
          />

          {casillasActivas.map((numero) => {
            const pos = casillas.find((c) => c.id === numero);
            if (!pos) return null;
            return (
              <div
                key={`casilla-${numero}`}
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
        </div>

        {/* Mini-ranking */}
        <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 translate-x-[360px] w-[300px] z-40">
          <div className="space-y-4">
            {(() => {
              // ← Corrección aquí: spread correcto [...equipos]
              const equiposOrdenados = [...equipos].sort(
                (a, b) => b.puntos - a.puntos
              );
              return equiposOrdenados.map((eq, idx) => (
                <Ranking
                  key={eq.id}
                  nombre={eq.nombre}
                  puntos={eq.puntos}
                  imagen={eq.imagen}
                  destacado={idx === 0}
                />
              ));
            })()}
          </div>
        </div>
      </div>

      <ZonaInferior onDadoResultado={setValorDado} />
      <GuiaPanel />

      <ModalPregunta
        visible={mostrarModal}
        categoria={categoriaSeleccionada}
        onClose={() => {
          console.log("[tablero] onClose modal → ocultar y avanzarTurno");
          setMostrarModal(false);
          avanzarTurno();
        }}
      />
    </div>
  );
}

export default Tablero;


