import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Header from '../components/Header';
import ZonaInferior from '../components/ZonaInferior';
import Ficha from '../components/Ficha';
import { useJuegoStore } from '../hooks/useJuegoStore';
import { usePartidaStore } from '../hooks/usePartidaStore';
import { casillas } from '../components/Posiciones/tableroData';
import Ranking from '../components/Ranking'; // Asegúrate de tener este componente
import GuiaPanel from '../components/GuiaPanel';
import { useTurnoStore } from "../hooks/useTurnoStore";

function Tablero() {

  const equipos = useTurnoStore((state) => state.equipos);
  const turnoActual = useTurnoStore((state) => state.turnoActual);
  const equipoActual = equipos[turnoActual];
  const fichaPos = useJuegoStore((state) => state.fichaPos);
  const setValorDado = useJuegoStore((state) => state.setValorDado);
  const { casillasActivas, moverFicha } = useJuegoStore();
  const siguienteTurno = useTurnoStore.getState().siguienteTurno;

  const manejarMovimiento = (numero) => {
    moverFicha(numero);           // mueve la ficha
    setTimeout(() => {
      siguienteTurno();           // cambia de turno después de un pequeño delay opcional
    }, 500); // tiempo opcional para dejar ver el movimiento antes de pasar turno
  };
  const partidaId = usePartidaStore((state) => state.partidaId);

  const navigate = useNavigate();

  useEffect(() => {
    if (!partidaId) return;
    const obtenerEquipos = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/equipos?partidaId=${partidaId}`);
        const data = await res.json();
        setEquipos(data);
      } catch (err) {
        console.error("Error al obtener equipos:", err);
      }
    };
    obtenerEquipos();
  }, [partidaId]);

  return (
    <div className="flex flex-col min-h-screen w-full pt-32"
      style={{
        backgroundImage: `url(/assets/Mesa.svg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Header />

      {/* Contenedor Tablero + Ranking */}
      <div className="flex-grow flex items-center justify-center gap-10 relative pb-10 px-8">
        <div className="relative aspect-square w-[90%] max-w-[700px]">
          <img
            src="/assets/img/Tablero-Trivial.jpeg"
            alt="Tablero"
            className="absolute w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-contain z-0"
          />
          {casillasActivas.map((numero) => {
            const pos = casillas.find(c => c.id === numero);
            if (!pos) return null;
            return (
              <div
                key={numero}
                className="absolute z-30 w-[8%] h-[8%] flex items-center justify-center cursor-pointer"
                style={{
                  top: `${pos.top}%`,
                  left: `${pos.left}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                onClick={() => manejarMovimiento(numero)}
              >
                <div className="w-[50%] h-[50%] rounded-full bg-white bg-opacity-80 border-4 border-white shadow-[0_0_15px_4px_#7e22ce] animate-pulse pointer-events-none" />
              </div>
            );
          })}

          <Ficha position={fichaPos} />
          <button
            onClick={() => navigate("/VistaRanking")}
            className="absolute top-4 right-4 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 z-50"
          >
            Ver Ranking
          </button>
        </div>

        {/* Ranking a la derecha */}
        <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 translate-x-[360px] w-[300px] z-40">
          <div className="space-y-4">
            {equipos.map((eq, index) => (
              <Ranking
                key={eq.id}
                nombre={eq.nombre}
                puntos={eq.puntos}
                imagen={eq.imagen}
                destacado={index === 0}
              />
            ))}
          </div>
        </div>
      </div>

      <ZonaInferior onDadoResultado={setValorDado} />
      <GuiaPanel />
    </div>
  );
}

export default Tablero;


