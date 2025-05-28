import { create } from "zustand";

export const useTurnoStore = create((set, get) => ({
  equipos: [],
  turnoActual: 0,

  setEquipos: (eqs) => {
    console.log("[store] setEquipos:", eqs);
    set(() => ({ equipos: eqs, turnoActual: 0 }));
  },

  actualizarEquipos: (eqs) => {
    console.log("[store] actualizarEquipos:", eqs);
    set(() => ({ equipos: eqs }));
  },

  addPuntos: (id, delta) => {
    console.log(`[store] addPuntos → id=${id}, delta=${delta}`);
    set((state) => {
      const nuevos = state.equipos.map((e) =>
        e.id === id ? { ...e, puntos: e.puntos + delta } : e
      );
      console.log("[store] equipos tras addPuntos:", nuevos);
      return { equipos: nuevos };
    });
  },

  syncPuntos: async (id, delta) => {
    console.log(`[store] syncPuntos → id=${id}, delta=${delta}`);
    const res = await fetch(
      `http://localhost:3000/api/equipos/${id}/puntos`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ delta }),
      }
    );
    if (!res.ok) throw new Error("Error al sincronizar puntos");
    const json = await res.json();
    console.log("[store] syncPuntos response:", json);
    return json;
  },

  avanzarTurno: () => {
    set((state) => {
      const next = (state.turnoActual + 1) % state.equipos.length;
      console.log("[store] avanzarTurno → turnoActual =", next);
      return { turnoActual: next };
    });
  },
}));
