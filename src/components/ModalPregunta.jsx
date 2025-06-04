import React, { useContext } from 'react';
import { QuizSetupContext } from '../context/QuizSetupContext';
import { useJuegoStore } from "../hooks/useJuegoStore";
import { useTurnoStore } from '../hooks/useTurnoStore';
import TarjetaPregunta from './TarjetaPregunta';

export default function ModalPregunta({ visible, categoria, esCasillaDoble, casillaActual, onClose }) {
  const {
    equipos,
    registrarRespuesta,
    registrarRespuestaCustomizable,
    actualizarEquipos,
    syncPuntos,
    addPuntos,
    avanzarTurno
  } = useTurnoStore();

  const { selectedFile } = useContext(QuizSetupContext);
  const useCustom = Boolean(selectedFile);

  if (!visible) return null;

  const onFinish = async (respuestasEquipos, pregunta) => {
    const juegoStore = useJuegoStore.getState();
    const puntuacionBase = Number(pregunta.puntuacion || 10);

    const multiplicadorAciertos = juegoStore.multiplicadorDisponible ? juegoStore.multiplicador : 1;
    const multiplicadorCasilla = esCasillaDoble ? 2 : 1;

    for (let idx = 0; idx < respuestasEquipos.length; idx++) {
      const resp = respuestasEquipos[idx];
      const eq = equipos[idx];

      const correcta = !!resp?.correcta;
      let puntos = correcta ? puntuacionBase : 0;

      if (correcta && esCasillaDoble) {
        const colorQuesito = juegoStore.obtenerColorQuesito?.(casillaActual);
        if (colorQuesito) {
          juegoStore.registrarQuesito?.(eq.id, colorQuesito);
        }
      }

      if (correcta) {
        puntos *= multiplicadorAciertos * multiplicadorCasilla;
      }

      if (useCustom) {
        // Registro para preguntas customizables
        try {
          console.log("📤 Enviando respuesta CUSTOMIZABLE al backend", {
            customizableId: pregunta.id,
            esCorrecta: correcta,
          });

          await registrarRespuestaCustomizable(eq.id, {
            customizableId: pregunta.id, // TIENE QUE VENIR DE TABLA CUSTOMIZABLE AQUÍ EL ERROR
            esCorrecta: correcta,
          });
        } catch (error) {
          console.error('❌ Error registrando respuesta customizable:', error);
        }
      } else {
        // Registro para preguntas normales
        if (
          pregunta?.id &&
          typeof resp?.idRespuestaSeleccionada !== 'undefined' &&
          typeof correcta !== 'undefined' &&
          typeof puntos !== 'undefined'
        ) {
          try {
            console.log("📤 Enviando respuesta al backend:", {
              preguntaId: pregunta.id,
              respuestaId: resp.idRespuestaSeleccionada,
              esCorrecta: correcta,
              puntosObtenidos: puntos,
            });

            await registrarRespuesta(eq.id, {
              preguntaId: pregunta.id,
              respuestaId: resp.idRespuestaSeleccionada,
              esCorrecta: correcta,
              puntosObtenidos: puntos,
            });
          } catch (error) {
            console.error('❌ Error registrando respuesta partida:', error);
          }
        } else {
          // Fallback si falta algún dato, suma puntos directamente
          try {
            await syncPuntos(eq.id, puntos);
            addPuntos(eq.id, puntos);
          } catch (error) {
            console.error('❌ Error al sumar puntos (fallback):', error);
          }
        }
      }
    }

    if (multiplicadorAciertos > 1) {
      juegoStore.usarMultiplicador();
    }

    const pid = equipos[0]?.partidaId;
    if (pid) {
      try {
        const nuevos = await fetch(
          `http://localhost:3000/api/equipos?partidaId=${pid}`
        ).then((r) => r.json());
        actualizarEquipos(nuevos);
      } catch (e) {
        console.error('❌ Error recargando equipos', e);
      }
    }

    avanzarTurno();
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
