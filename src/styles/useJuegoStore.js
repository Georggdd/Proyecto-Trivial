
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
    const { fichaIndex, caminoActual } = get();
    let nuevasCasillas = [];

    // Casillas del círculo exterior en orden
    const casillasCirculoExterior = [
      38, 39, 40, 41, 42, 43, 44,
      45, 46, 47, 48, 49, 50, 51, 52,
      53, 54, 55, 56, 57, 58, 59,
      60, 61, 62, 63, 64, 65, 66, 67,
      68, 69, 70, 71, 72, 32, 33, 34, 35, 36, 37
    ];

    // ✅ Desde el centro (id: 0)
    if (fichaIndex === 0 && caminoActual === null) {
      nuevasCasillas = Object.values(rutasCaminos)
        .map((camino) => camino.slice(0, valor))
        .flat();
    }

    // ✅ Ya tiene camino asignado
    else if (caminoActual) {
      const camino = rutasCaminos[caminoActual];
      const indexEnCamino = camino.indexOf(fichaIndex);

      if (indexEnCamino !== -1) {
        for (let i = 1; i <= valor; i++) {
          const posEnCamino = indexEnCamino + i;

          if (posEnCamino < camino.length) {
            nuevasCasillas.push(camino[posEnCamino]); // dentro del camino
          } else {
            // Se sale del camino, continúa por el círculo
            const ultimaCasilla = camino[camino.length - 1];
            const indexEnCirculo = casillasCirculoExterior.indexOf(ultimaCasilla);
            const salto = i - (camino.length - indexEnCamino);

            // ➕ Avanzar hacia la derecha (↻)
            const destinoDerecha = casillasCirculoExterior[indexEnCirculo + salto + 1];
            if (destinoDerecha !== undefined) nuevasCasillas.push(destinoDerecha);

            // ➕ Avanzar hacia la izquierda (↺)
            const destinoIzquierda = casillasCirculoExterior[indexEnCirculo - salto - 1];
            if (destinoIzquierda !== undefined) nuevasCasillas.push(destinoIzquierda);
          }
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

    console.log('Mover ficha a:', posicion);

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
