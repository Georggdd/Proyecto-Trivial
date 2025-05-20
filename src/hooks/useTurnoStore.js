import { create } from "zustand";

export const useTurnoStore = create((set, get) => ({
  equipos: [],
  turnoActual: 0,

  setEquipos: (equipos) => set({
    equipos: equipos.map(eq => ({
      ...eq,
      puntos: Number(eq.puntos || 0)
    }))
  }),

  actualizarEquipos: (equipos) => {
    console.log('Actualizando equipos:', equipos);
    set({
      equipos: equipos.map(eq => ({
        ...eq,
        puntos: Number(eq.puntos || 0)
      }))
    });
  },

  addPuntos: (equipoId, delta) => {
    set((state) => {
      const nuevosEquipos = state.equipos.map((eq) =>
        eq.id === equipoId
          ? { ...eq, puntos: Number(eq.puntos || 0) + Number(delta || 0) }
          : eq
      );
      console.log('Nuevo estado equipos:', nuevosEquipos);
      return { equipos: nuevosEquipos };
    });
  },

  syncPuntos: async (equipoId, delta) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/equipos/${equipoId}/puntos`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ delta }),
        }
      );

      if (!response.ok) throw new Error('Error al sincronizar puntos');
      const resultado = await response.json();
      console.log('Respuesta sync puntos:', resultado);
      return resultado;
    } catch (error) {
      console.error('Error al sincronizar puntos:', error);
      throw error;
    }
  },

  siguienteTurno: () => set((state) => ({
    turnoActual: (state.turnoActual + 1) % state.equipos.length
  })),
}));
