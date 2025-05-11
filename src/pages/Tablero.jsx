import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Header from '../components/Header';
import ZonaInferior from '../components/ZonaInferior';
import Ficha from '../components/Ficha';
import { useJuegoStore } from '../hooks/useJuegoStore';
import { usePartidaStore } from '../hooks/usePartidaStore';
import { casillas } from '../components/Posiciones/tableroData';
import Ranking from '../components/Ranking';
import GuiaPanel from '../components/GuiaPanel';
import { useTurnoStore } from "../hooks/useTurnoStore";
import Tarjeta_Pregunta from '../components/Tarjeta_Pregunta';
import { preguntas } from '../data/preguntas';

function Tablero() {
  const equipos = useTurnoStore((state) => state.equipos);
  const turnoActual = useTurnoStore((state) => state.turnoActual);
  const fichaPos = useJuegoStore((state) => state.fichaPos);
  const setValorDado = useJuegoStore((state) => state.setValorDado);
  const { casillasActivas, moverFicha } = useJuegoStore();
  const siguienteTurno = useTurnoStore.getState().siguienteTurno;
  const partidaId = usePartidaStore((state) => state.partidaId);

  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);
  const [preguntaSeleccionada, setPreguntaSeleccionada] = useState(null);

  const navigate = useNavigate();

  const manejarMovimiento = async (numero) => {
    moverFicha(numero);

    try {
      const res = await fetch(`http://localhost:4000/api/preguntas/aleatoria?partidaId=${partidaId}`);
      const pregunta = await res.json();

      if (!res.ok || pregunta.error) {
        console.error("Error al obtener pregunta:", pregunta.error);
        return;
      }

      const preguntaFormateada = {
        categoria: pregunta.asignatura,
        pregunta: pregunta.texto,
        respuestas: pregunta.respuestas.map(r => ({
          texto: r.texto,
          correcta: r.esCorrecta,
          explicacion: r.explicacion || '',
        })),
      };

      setPreguntaSeleccionada(preguntaFormateada);
      setMostrarTarjeta(true);
    } catch (err) {
      console.error("Error al obtener pregunta dinámica:", err);
    }
  };

  useEffect(() => {
    if (!partidaId) return;
    const obtenerEquipos = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/equipos?partidaId=${partidaId}`);
        const data = await res.json();
        useTurnoStore.getState().setEquipos(data);
      } catch (err) {
        console.error("Error al obtener equipos:", err);
      }
    };
    obtenerEquipos();
  }, [partidaId]);

  return (
    <div
      className="relative flex flex-col min-h-screen w-full pt-32"
      style={{
        backgroundImage: `url(/assets/Mesa.svg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Header />

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

      {mostrarTarjeta && preguntaSeleccionada && (
        <div className="absolute inset-0 z-50">
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="relative w-full h-full flex items-center justify-center">
            <Tarjeta_Pregunta
              pregunta={preguntaSeleccionada}
              onClose={() => {
                setMostrarTarjeta(false);
                setTimeout(() => siguienteTurno(), 200);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Tablero;


