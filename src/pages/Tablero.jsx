import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ZonaInferior from "../components/ZonaInferior";
import Ficha from "../components/Ficha";
import { useJuegoStore } from "../hooks/useJuegoStore";
import { usePartidaStore } from "../hooks/usePartidaStore";
import { useTurnoStore } from "../hooks/useTurnoStore";               // ← IMPORT NECESARIO
import { casillas } from "../components/Posiciones/tableroData";
import Ranking from "../components/Ranking";
import GuiaPanel from "../components/GuiaPanel";
import ModalPregunta from "../components/ModalPregunta";
import ninioAvatar from "../assets/img/ninio.png";
import { QuizSetupContext } from "../context/QuizSetupContext";

export default function Tablero() {
  const navigate = useNavigate();
  const { partidaId } = usePartidaStore();

  // Traemos categoría, archivo y equipos desde el Context
  const { selectedCategory, selectedFile, selectedTeams } = useContext(QuizSetupContext);

  const { fichaPos, casillasActivas, moverFicha, setValorDado } =
    useJuegoStore();

  // Hooks de equipos/turno
  const equipos = useTurnoStore((s) => s.equipos);
  const setEquipos = useTurnoStore((s) => s.setEquipos);
  const avanzarTurno = useTurnoStore((s) => s.avanzarTurno);

  const [mostrarModal, setMostrarModal] = useState(false);

  // Al montar, traemos los equipos de la partida
  useEffect(() => {
    if (!partidaId) return;
    (async () => {
      const res = await fetch(
        `http://localhost:3000/api/equipos?partidaId=${partidaId}`
      );
      const data = await res.json();
      const fijados = data.map((e) => ({
        ...e,
        avatarMini: e.avatarMini || ninioAvatar,
      }));
      setEquipos(fijados);
    })();
  }, [partidaId, setEquipos]);

  // Log para verificar lo recibido del Context
  useEffect(() => {
    console.log("[Tablero] Categoría:", selectedCategory);
    console.log("[Tablero] Custom file:", selectedFile);
    console.log("[Tablero] Teams from setup:", selectedTeams);
  }, [selectedCategory, selectedFile, selectedTeams]);

  const manejarMovimiento = (numero) => {
    moverFicha(numero);
    const esVolverTirar = useJuegoStore.getState().esVolverTirar;

    if (esVolverTirar) {
      // No avanzamos turno y mostramos el dado después de un pequeño delay
      setTimeout(() => {
        const dadoBtn = document.querySelector('[data-testid="dado-btn"]');
        if (dadoBtn) dadoBtn.click();
      }, 500);
    } else {
      // Comportamiento normal - mostrar pregunta
      setTimeout(() => setMostrarModal(true), 500);
    }
  };

  // Ordenamos para el ranking
  const equiposOrdenados = [...equipos].sort((a, b) => b.puntos - a.puntos);

  // Detectar puntuaciones empatadas
  const puntuacionesEmpatadas = equiposOrdenados
    .map(e => e.puntos)
    .filter((valor, i, arr) => arr.indexOf(valor) !== i);

  return (

    <div
      className="flex flex-col min-h-screen w-full pt-24" // Aumentado de pt-20 a pt-24 para más espacio con el header
      style={{
        backgroundImage: "url(/assets/Mesa.svg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >

      <Header className="border-4 border-double border-orange-600" />

      <div className="border-x-4 border-double border-orange-600 flex-grow flex items-center justify-center gap-6 relative pb-4 px-4 mt-8"> {/* Aumentado mt-4 a mt-8 */}
        {/* Tablero principal */}
        <div className="relative aspect-square w-[98%] max-w-[950px]"> {/* Reducido de 98% a 90% y max-w de 1000px a 850px */}
          <img
            src="assets\img\Tablero Trivial_final.jpg"
            alt="Tablero"
            className="absolute w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-contain z-0"
          />

          {/* Ajustar tamaño de las casillas proporcionalmente */}
          {casillasActivas.map((numero) => {
            const pos = casillas.find((c) => c.id === numero);
            const esDoble = [31, 38, 45, 52, 59, 66].includes(numero);
            const esVolverTirar = [33, 36, 40, 43, 47, 50, 54, 57, 61, 64, 68, 71].includes(numero);

            if (!pos) return null;
            return (
              <div
                key={`casilla-${numero}`}
                className={`absolute z-30 w-[5%] h-[5%] flex items-center justify-center cursor-pointer`}
                style={{
                  top: `${pos.top}%`,
                  left: `${pos.left}%`,
                  transform: "translate(-50%, -50%)",
                }}
                onClick={() => manejarMovimiento(numero)}
              >
                <div className={`w-[50%] h-[50%] rounded-full bg-white bg-opacity-80 border-4 
                  ${esDoble ? 'border-yellow-400 shadow-[0_0_15px_4px_#fbbf24]' :
                    esVolverTirar ? 'border-green-400 shadow-[0_0_15px_4px_#22c55e]' :
                      'border-white shadow-[0_0_15px_4px_#7e22ce]'}
                animate-pulse pointer-events-none`}
                />
              </div>
            );
          })}

          <Ficha position={fichaPos} />
        </div>

        {/* Mini-ranking */}
        <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 translate-x-[400px] w-[1000px] z-40">
          <div className="space-y-4">
            {equiposOrdenados.map((eq, idx) => (
              <Ranking
                key={eq.id}
                nombre={eq.nombre}
                puntos={eq.puntos}
                imagen={eq.avatarMini}
                destacado={puntuacionesEmpatadas.includes(eq.puntos)} // Cambiar aquí
              />
            ))}
          </div>
        </div>
      </div>

      <ZonaInferior onDadoResultado={setValorDado} />
      <GuiaPanel />

      <ModalPregunta
        visible={mostrarModal}
        categoria={selectedCategory}
        onClose={() => {
          setMostrarModal(false);
          avanzarTurno();
        }}
      />
    </div>
  );
}


