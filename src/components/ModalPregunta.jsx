import React, { useContext } from 'react';
import { useTurnoStore } from '../hooks/useTurnoStore';
import TarjetaPregunta from './TarjetaPregunta';
import { QuizSetupContext } from '../context/QuizSetupContext';
import { useJuegoStore } from '../hooks/useJuegoStore';

export default function ModalPregunta({ visible, categoria, esCasillaDoble, casillaActual, onClose }) {
  const { syncPuntos, addPuntos, actualizarEquipos, avanzarTurno } = useTurnoStore();
  const { selectedFile } = useContext(QuizSetupContext);
  const useCustom = Boolean(selectedFile);

  const multiplicador = useJuegoStore((s) => s.multiplicador);
  const usarMultiplicador = useJuegoStore((s) => s.usarMultiplicador);
  const turnoActual = useTurnoStore((s) => s.turnoActual);
  const equipos = useTurnoStore((s) => s.equipos);
  const setEquipos = useTurnoStore((s) => s.setEquipos);

  if (!visible) return null;

  const onFinish = async (respuestasEquipos, pregunta) => {
    const puntuacionBase = Number(pregunta.puntuacion || 10);
    const juegoStore = useJuegoStore.getState();
    
    // Verificar aciertos grupales antes de procesar puntuaciones
    juegoStore.verificarAciertosGrupales(respuestasEquipos);
    
    // Obtener multiplicadores
    const multiplicadorAciertos = juegoStore.multiplicadorDisponible ? juegoStore.multiplicador : 1;
    const multiplicadorCasilla = esCasillaDoble ? 2 : 1; // Aplicar x2 en casillas de quesito

    respuestasEquipos.forEach(async (resp, idx) => {
      if (resp?.correcta) {
        const eq = equipos[idx];
        
        // Si es casilla de quesito, registrar el color ganado
        if (esCasillaDoble) {
          const colorQuesito = juegoStore.obtenerColorQuesito(casillaActual);
          if (colorQuesito) {
            juegoStore.registrarQuesito(eq.id, colorQuesito);
          }
        }

        let puntuacionFinal = puntuacionBase;
        
        // Aplicar multiplicadores en orden
        puntuacionFinal *= multiplicadorCasilla; // Primero el de casilla
        puntuacionFinal *= multiplicadorAciertos; // Luego el de aciertos
        
        console.log('📊 Asignando puntos:', {
          base: puntuacionBase,
          multiplicadorCasilla,
          multiplicadorAciertos,
          final: puntuacionFinal
        });

        try {
          await syncPuntos(eq.id, puntuacionFinal);
          addPuntos(eq.id, puntuacionFinal);
        } catch (error) {
          console.error('Error al asignar puntos:', error);
        }
      }
    });

    // Si se usó el multiplicador, resetearlo
    if (multiplicadorAciertos > 1) {
      juegoStore.usarMultiplicador();
    }

    // Actualizar equipos en el store después de asignar puntos
    const pid = equipos[0]?.partidaId;
    if (pid) {
      try {
        const nuevos = await fetch(
          `http://localhost:3000/api/equipos?partidaId=${pid}`
        ).then((r) => r.json());
        actualizarEquipos(nuevos);
      } catch (e) {
        console.error('Error recargando equipos', e);
      }
    }

    avanzarTurno();
    onClose();
  };

  const handleRespuestaCorrecta = () => {
    console.log('✅ Respuesta correcta - Incrementando aciertos');
    useJuegoStore.getState().incrementarAciertos();
  };

  const handleRespuestaIncorrecta = () => {
    console.log('❌ Respuesta incorrecta - Reseteando aciertos');
    useJuegoStore.getState().resetearAciertos();
  };

  const handleRespuesta = async (esCorrecta) => {
    let puntosBase = esCorrecta ? 100 : 0;
    
    // Si la respuesta es correcta, aplicar multiplicador
    if (esCorrecta) {
      const multFinal = usarMultiplicador();
      puntosBase *= multFinal;
    }

    // Actualizar puntos del equipo actual
    const nuevosEquipos = equipos.map((eq, idx) =>
      idx === turnoActual 
        ? { ...eq, puntos: eq.puntos + puntosBase }
        : eq
    );
    
    setEquipos(nuevosEquipos);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50">
      <TarjetaPregunta
        categoria={categoria}
        equipos={equipos}
        onFinish={onFinish}
        useCustom={useCustom}
      />
      <button
        onClick={() => {
          avanzarTurno();
          onClose();
        }}
        className="absolute top-5 right-5 bg-white border px-4 py-2 rounded"
      >
        ✖
      </button>
    </div>
  );
}