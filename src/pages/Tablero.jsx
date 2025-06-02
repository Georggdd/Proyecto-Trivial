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

const estiloOverride = `
  /* Contenedor principal del ranking - moverlo hacia la izquierda para pegarlo al tablero */
  .ranking-override > div {
    padding-left: 0.5rem !important;
    padding-right: 0.5rem !important;
    gap: 0.75rem !important;
    margin-bottom: 0.5rem !important;
    justify-content: flex-start !important; /* Todo pegado a la izquierda */
    /* Eliminar el transform que causaba el solapamiento */
  }
  
  .ranking-override {
  position: relative !important;
  z-index: 10 !important;
}

  /* Contenedor de la imagen - hacerlo circular y proporcional y aumentar tamaño en un 50% */
  .ranking-override > div > div:first-child {
    width: 6vw !important;             /* Aumentado de 4vw a 6vw (50% más) */
    height: 6vw !important;            /* Aumentado de 4vw a 6vw (50% más) */
    min-width: 4.5rem !important;      /* Aumentado de 3rem a 4.5rem (50% más) */
    min-height: 4.5rem !important;     /* Aumentado de 3rem a 4.5rem (50% más) */
    max-width: 6rem !important;        /* Aumentado de 4rem a 6rem (50% más) */
    max-height: 6rem !important;       /* Aumentado de 4rem a 6rem (50% más) */
    border-radius: 50% !important;     /* Asegura forma circular */
    overflow: hidden !important;       /* Mantiene el contenido dentro del círculo */
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    flex-shrink: 0 !important;         /* Evita que el círculo se comprima */
    aspect-ratio: 1/1 !important;      /* Mantiene proporción cuadrada dentro del contenedor */
  }

  /* La imagen dentro del contenedor circular */
  .ranking-override img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    border-radius: 50% !important;
  }

  /* Contenedor del nombre */
  .ranking-override > div > .w-2\\/4 {
    flex: 1 !important;
    min-height: 4vw !important;        /* Mantener consistencia con el diseño original */
    padding-left: 0.75rem !important;
    padding-right: 0.75rem !important;
    max-height: 4rem !important;       /* Controlar altura máxima */
  }

  /* Contenedor de puntos */
  .ranking-override > div > .w-1\\/4 {
    min-height: 4vw !important;        /* Igualar con otros elementos */
    padding-left: 0.5rem !important;
    padding-right: 0.5rem !important;
    max-height: 4rem !important;       /* Controlar altura máxima */
  }

  /* Ajustar el texto */
  .ranking-override h3 {
    font-size: 1.2rem !important;      /* Fuente más pequeña */
    line-height: 1.2 !important;
    white-space: normal !important;    /* Permitir salto de línea */
    margin: 0 !important;              /* Quitar márgenes externos */
  }
`;
// ───────────────────────────────────────────────────────────

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
    const esCasillaDoble = useJuegoStore.getState().esCasillaDoble; // Añadir esta línea

    if (esVolverTirar) {
      setTimeout(() => {
        const dadoBtn = document.querySelector('[data-testid="dado-btn"]');
        if (dadoBtn) dadoBtn.click();
      }, 500);
    } else {
      setTimeout(() => {
        setMostrarModal(true);
      }, 500);
    }
  };

  // Ordenamos para el ranking
  const equiposOrdenados = [...equipos].sort((a, b) => b.puntos - a.puntos);

  // Detectar puntuaciones empatadas
  const puntuacionesEmpatadas = equiposOrdenados
    .map(e => e.puntos)
    .filter((valor, i, arr) => arr.indexOf(valor) !== i);

  return (
    <>
      {/* Inyectamos aquí el <style> en línea para anular las clases de Tailwind en Ranking */}
      <style dangerouslySetInnerHTML={{ __html: estiloOverride }} />

      <div
        className="flex flex-col min-h-screen w-full pt-24"
        style={{
          backgroundImage: "url(/assets/Mesa.svg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Header className="border-4 border-double border-orange-600" />

        {/* Añade GuiaPanel aquí */}
        <GuiaPanel />

        <main className="flex-grow flex flex-col relative border-x-4 border-double border-orange-600 
  pt-16 
  pb-32 
  sm:pb-36 
  md:pb-40 
  lg:pb-44 
  xl:pb-36     // Reducido para dar más espacio a los botones
  2xl:pb-32"
>
          <div className="grid grid-cols-12 h-[calc(100%-140px)] w-full px-4"> {/* Aumentado de 100px a 140px */}
            {/* Columna izquierda - aumentada a 3 */}
            <div className="col-span-3" />

            {/* Columna central - ajustada para 1920x1080 */}
            <div className="col-span-6 flex justify-center items-start pt-8 xl:pt-4"> 
              <div className={`
    relative aspect-square mx-auto
    w-[900px]
    lg:w-[700px]
    xl:w-[350px]
    2xl:w-[680px]  /* Para 1920x1080 */
    3xl:w-[800px]  /* Para 1440p */
  `}>
                <img
                  src="assets/img/Tablero Trivial_final.jpg"
                  alt="Tablero"
                  className="w-full h-full object-contain"
                />

                {casillasActivas.map((numero) => {
                  const pos = casillas.find((c) => c.id === numero);
                  const esDoble = [31, 38, 45, 52, 59, 66].includes(numero);
                  const esVolverTirar = [
                    33, 36, 40, 43, 47, 50,
                    54, 57, 61, 64, 68, 71,
                  ].includes(numero);

                  if (!pos) return null;
                  return (
                    <div
                      key={`casilla-${numero}`}
                      className="absolute z-30 w-[5%] h-[5%] flex items-center justify-center cursor-pointer"
                      style={{
                        top: `${pos.top}%`,
                        left: `${pos.left}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                      onClick={() => manejarMovimiento(numero)}
                    >
                      <div
                        className={`w-[50%] h-[50%] rounded-full bg-white bg-opacity-80 border-4 
                          ${esDoble
                            ? "border-yellow-400 shadow-[0_0_15px_4px_#fbbf24]"
                            : esVolverTirar
                              ? "border-green-400 shadow-[0_0_15px_4px_#22c55e]"
                              : "border-white shadow-[0_0_15px_4px_#7e22ce]"
                          }
                          animate-pulse pointer-events-none
                        `}
                      />
                    </div>
                  );
                })}

                <Ficha position={fichaPos} />
              </div>
            </div>

            {/* Columna derecha - ranking */}
            <div className="col-span-3 flex items-center h-full pt-8"> 
              <div className="w-full space-y-2 rounded-lg p-2 max-h-[80vh] overflow-y-auto
                lg:-ml-8 md:-ml-4 sm:-ml-2"> {/* Margin left responsivo */}
                {equiposOrdenados.map((eq) => (
                  <div key={eq.id} className="ranking-override">
                    <Ranking
                      nombre={eq.nombre}
                      puntos={eq.puntos}
                      foto={eq.avatarMini}
                      destacado={puntuacionesEmpatadas.includes(eq.puntos)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Zona inferior - Posicionamiento fijo en la parte inferior */}
          <div className="absolute bottom-0 left-0 right-0 xl:mb-4 2xl:mb-0">
            <ZonaInferior onDadoResultado={setValorDado} />
          </div>

          {/* Añadir ModalPregunta aquí */}
          <ModalPregunta
            visible={mostrarModal}
            categoria={selectedCategory}
            esCasillaDoble={useJuegoStore((s) => s.esCasillaDoble)} // Añadir esta prop
            onClose={() => setMostrarModal(false)}
          />
        </main>
      </div>
    </>
  );
}


