import React, { useContext } from 'react';
import { useTurnoStore } from '../hooks/useTurnoStore';
import TarjetaPregunta from './TarjetaPregunta';
import { QuizSetupContext } from '../context/QuizSetupContext';
import { useJuegoStore } from "../hooks/useJuegoStore";

export default function ModalPregunta({ visible, categoria, onClose }) {
  const { equipos, syncPuntos, addPuntos, actualizarEquipos, avanzarTurno } =
    useTurnoStore();
  const esCasillaDoble = useJuegoStore(state => state.esCasillaDoble);
  const { selectedFile } = useContext(QuizSetupContext);
  const useCustom = Boolean(selectedFile);

  if (!visible) return null;

  const onFinish = async (respuestasEquipos, pregunta) => {
    const puntuacionBase = Number(pregunta.puntuacion || 10);
    
    // Verificar aciertos grupales antes de procesar puntuaciones
    const juegoStore = useJuegoStore.getState();
    juegoStore.verificarAciertosGrupales(respuestasEquipos);
    
    // Obtener el multiplicador actual si está disponible
    const multiplicadorActual = juegoStore.multiplicadorDisponible ? juegoStore.multiplicador : 1;

    respuestasEquipos.forEach(async (resp, idx) => {
      if (resp?.correcta) {
        const eq = equipos[idx];
        let puntuacionFinal = puntuacionBase;
        
        // Aplicar multiplicadores
        if (esCasillaDoble) puntuacionFinal *= 2;
        puntuacionFinal *= multiplicadorActual;
        
        console.log('📊 Asignando puntos:', {
          base: puntuacionBase,
          multiplicadorCasilla: esCasillaDoble ? 2 : 1,
          multiplicadorAciertos: multiplicadorActual,
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
    if (multiplicadorActual > 1) {
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