
import { create } from 'zustand';
import { casillas } from '../components/Posiciones/tableroData';
import { caminos as rutasCaminos } from '../components/Posiciones/rutasCaminos';

export const useJuegoStore = create((set, get) => ({
  equipos: [
    { nombre: 'Equipo 1', casilla: 0, camino: null },
    { nombre: 'Equipo 2', casilla: 0, camino: null },
  ],
  fichaIndex: 0,
  caminoActual: null,
  turnoActual: 0,
  valorDado: null,
  casillasActivas: [],
  fichaPos: casillas[0],
  setCaminoActual: (camino) => set({ caminoActual: camino }),
  setFichaIndex: (index) => set({ fichaIndex: index }),

  setValorDado: (valor) => {
    const { fichaIndex, caminoActual } = get(); // ← Esto debe estar definido
    let nuevasCasillas = [];

    if (fichaIndex === 0 && caminoActual === null) {
      // Desde el centro, mostrar las primeras casillas de todos los caminos
      nuevasCasillas = Object.values(rutasCaminos).map(camino => camino[0]);
    } else if (caminoActual) {
      const camino = rutasCaminos[caminoActual];
      const indexEnCamino = camino.indexOf(fichaIndex);
      if (indexEnCamino !== -1) {
        for (let i = 1; i <= valor; i++) {
          const destino = camino[indexEnCamino + i];
          if (destino !== undefined) nuevasCasillas.push(destino);
        }
      }
    }

    set({ valorDado: valor, casillasActivas: nuevasCasillas });
  },

  setCaminoInicial: (camino) => {
    const state = get();
    const ruta = rutasCaminos[camino];
    const destino = ruta[state.valorDado - 1];

    if (!destino) return;

    const nuevosEquipos = [...state.equipos];
    nuevosEquipos[state.turnoActual].camino = camino;

    set({
      equipos: nuevosEquipos,
      casillasActivas: [destino],
    });
  },

  moverFicha: (id) => {
    const { fichaIndex, caminoActual } = get();
    const posicion = casillas.find((c) => c.id === id);

    if (fichaIndex === 0 && caminoActual === null) {
      const nuevoCamino = Object.entries(rutasCaminos).find(([_, casillas]) =>
        casillas.includes(id)
      );
      if (nuevoCamino) {
        set({ caminoActual: nuevoCamino[0] });
      }
    }
    console.log('Mover ficha a:', nuevaPos);
    if (posicion) {
      set({
        fichaIndex: id,
        fichaPos: { top: posicion.top, left: posicion.left },
        casillasActivas: [],
      });
    }
  },

  siguienteTurno: () => {
    set((state) => ({
      turnoActual: (state.turnoActual + 1) % state.equipos.length,
      valorDado: null,
    }));
  },
}));
