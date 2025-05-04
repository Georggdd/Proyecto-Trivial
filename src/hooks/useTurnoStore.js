import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTurnoStore = create(
  persist(
    (set) => ({
      equipos: [],
      turnoActual: 0,
      setEquipos: (equipos) => set({ equipos, turnoActual: 0 }),
      siguienteTurno: () =>
        set((state) => ({
          turnoActual: (state.turnoActual + 1) % state.equipos.length,
        })),
      resetTurnos: () => set({ turnoActual: 0 }),
    }),
    {
      name: "turno-store", // nombre de la clave en localStorage
      getStorage: () => localStorage, // puedes usar sessionStorage si prefieres
    }
  )
);
