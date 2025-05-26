import React, { useState, useEffect } from "react";
import Tarjeta_Pregunta from "./Tarjeta_Pregunta";
import { useTurnoStore } from "../hooks/useTurnoStore";

export default function ModalPregunta({ visible, categoria, onClose }) {
  // ─── Hooks al inicio ─────────────────────────
  const {
    equipos,
    syncPuntos,
    addPuntos,
    actualizarEquipos,
    avanzarTurno,
  } = useTurnoStore();
  const [pregunta, setPregunta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [turnoLocal, setTurnoLocal] = useState(0);
  const [respuestas, setRespuestas] = useState({});
  const [fase, setFase] = useState("contestando");

  // ─── Reset al abrir ──────────────────────────
  useEffect(() => {
    if (visible) {
      setTurnoLocal(0);
      setRespuestas({});
      setFase("contestando");
    }
  }, [visible]);

  // ─── Carga pregunta nueva ───────────────────
  useEffect(() => {
    if (!visible) return;
    (async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:3000/api/preguntas/${categoria}`
        );
        const arr = await res.json();
        setPregunta(arr[Math.floor(Math.random() * arr.length)]);
      } catch {
        setPregunta(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [categoria, visible]);

  // ─── Early returns ──────────────────────────
  if (!visible) return null;
  if (loading) return null;
  if (!pregunta)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
        <div className="bg-white p-4 rounded">No hay preguntas.</div>
      </div>
    );

  // ─── Registro de respuesta ─────────────────
  const handleOpcionClick = (idOpcion) => {
    const idEquipo = equipos[turnoLocal].id;
    setRespuestas((prev) => ({ ...prev, [idEquipo]: idOpcion }));
    setTurnoLocal((t) => {
      if (t < equipos.length - 1) return t + 1;
      setFase("mostrar");
      return t;
    });
  };

  // ─── Revela la respuesta, suma puntos y refresca ───
  const revelarYSumarPuntos = async () => {
    // 1) Muestra el reverso
    setFase("revelado");
    // 2) Breve pausa para que se vea el giro
    await new Promise((r) => setTimeout(r, 300));

    const delta = Number(pregunta.puntuacion || 10);

    // 3) Actualiza inmediatamente el store local
    equipos.forEach((eq) => {
      const opc = respuestas[eq.id];
      const respObj = pregunta.respuestas.find((r) => r.id === opc);
      if (respObj?.esCorrecta) {
        addPuntos(eq.id, delta);
      }
    });

    // 4) Sincroniza al backend en paralelo
    const promesasSync = equipos.map((eq) => {
      const opc = respuestas[eq.id];
      const respObj = pregunta.respuestas.find((r) => r.id === opc);
      if (respObj?.esCorrecta) {
        return syncPuntos(eq.id, delta);
      }
      return Promise.resolve();
    });
    await Promise.all(promesasSync);

    // 5) Refresca la lista de equipos (no bloqueante)
    (async () => {
      const pid = equipos[0]?.partidaId;
      if (pid) {
        const nuevos = await fetch(
          `http://localhost:3000/api/equipos?partidaId=${pid}`
        ).then((r) => r.json());
        actualizarEquipos(nuevos);
      }
    })();
  };

  // ─── Un solo click: revelar + cerrar ────────
  const handleMostrarResultado = async () => {
    if (fase === "mostrar") {
      await revelarYSumarPuntos();
    }
    avanzarTurno();
    onClose();
  };

  // ─── Render ─────────────────────────────────
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50">
      <Tarjeta_Pregunta
        pregunta={pregunta}
        equipos={equipos}
        turnoActual={turnoLocal}
        respuestas={respuestas}
        fase={fase}
        onOpcionClick={handleOpcionClick}
        onMostrarResultado={handleMostrarResultado}
        onClose={() => {
          avanzarTurno();
          onClose();
        }}
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

