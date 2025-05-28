import React, { useContext } from 'react';
import { useTurnoStore } from '../hooks/useTurnoStore';
import TarjetaPregunta from './TarjetaPregunta';
import { QuizSetupContext } from '../context/QuizSetupContext';

export default function ModalPregunta({ visible, categoria, onClose }) {
  const { equipos, syncPuntos, addPuntos, actualizarEquipos, avanzarTurno } =
    useTurnoStore();
  const { selectedFile } = useContext(QuizSetupContext);
  const useCustom = Boolean(selectedFile);


  if (!visible) return null;

  const onFinish = async (respuestasEquipos, pregunta) => {
    const delta = Number(pregunta.puntuacion || 10);

    respuestasEquipos.forEach((resp, idx) => {
      if (resp?.correcta) {
        const eq = equipos[idx];
        syncPuntos(eq.id, delta)
          .then(() => addPuntos(eq.id, delta))
          .catch(console.error);
      }
    });

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