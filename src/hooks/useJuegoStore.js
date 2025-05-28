import { create } from 'zustand';
import { casillas } from '../components/Posiciones/tableroData';
import { caminos as rutasCaminos } from '../components/Posiciones/rutasCaminos';

// Función para acceso circular en arrays (principio de reutilización y SRP)
const circularGet = (arr, index) => {
  const len = arr.length;
  return arr[(index + len) % len];
};

// Lista de casillas del círculo exterior, reutilizada en distintas funciones
const casillasCirculoExterior = [
  31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42,
  43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54,
  55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66,
  67, 68, 69, 70, 71, 72
];

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

  // Lógica principal para establecer el valor del dado y calcular las casillas alcanzables
  setValorDado: (valor) => {
    const { fichaIndex: rawFichaIndex, caminoActual } = get();
    const fichaIndex = Number(rawFichaIndex);
    let nuevasCasillas = [];

    // Ficha parte desde el centro
    if (fichaIndex === 0 && caminoActual === null) {
      nuevasCasillas = Object.values(rutasCaminos)
        .map((camino) => camino[Math.min(valor - 1, camino.length - 1)])
        .filter(Boolean);
    }

    // Ficha se encuentra en un camino
    else if (caminoActual) {
      const camino = rutasCaminos[caminoActual];
      const indexEnCamino = camino.indexOf(fichaIndex);

      if (indexEnCamino !== -1) {
        const pasosRestantes = camino.length - 1 - indexEnCamino;
        const pasosDentroCamino = Math.min(valor, pasosRestantes);
        const pasosEnCirculo = valor - pasosDentroCamino;

        // Si no entra al círculo, solo se avanza dentro del camino
        if (pasosDentroCamino > 0 && pasosEnCirculo === 0) {
          nuevasCasillas.push(camino[indexEnCamino + pasosDentroCamino]);
        }

        // Si entra al círculo exterior
        if (pasosEnCirculo > 0) {
          const ultimaCasilla = camino[camino.length - 1];
          const indexEnCirculo = casillasCirculoExterior.findIndex(id => Number(id) === Number(ultimaCasilla));

          if (indexEnCirculo !== -1) {
            const derecha = circularGet(casillasCirculoExterior, indexEnCirculo + pasosEnCirculo);
            const izquierda = circularGet(casillasCirculoExterior, indexEnCirculo - pasosEnCirculo);
            nuevasCasillas.push(derecha, izquierda);
          }
        }
      }
    }

    // Ficha se encuentra en el círculo exterior
    else {
      const indexEnCirculo = casillasCirculoExterior.findIndex(id => Number(id) === Number(fichaIndex));

      if (indexEnCirculo !== -1) {
        const derecha = circularGet(casillasCirculoExterior, indexEnCirculo + valor);
        const izquierda = circularGet(casillasCirculoExterior, indexEnCirculo - valor);
        nuevasCasillas.push(derecha, izquierda);
      }
    }

    set({ valorDado: valor, casillasActivas: nuevasCasillas });
  },

  // Define el camino inicial del jugador tras salir del centro
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

  // Mueve la ficha a una nueva casilla y actualiza estado
  moverFicha: (id) => {
    const { fichaIndex, caminoActual } = get();
    const posicion = casillas.find((c) => c.id === id);

    // Si es el primer movimiento, detectar el nuevo camino automáticamente
    if (fichaIndex === 0 && caminoActual === null) {
      const nuevoCamino = Object.entries(rutasCaminos).find(([_, casillas]) =>
        casillas.includes(id)
      );
      if (nuevoCamino) {
        set({ caminoActual: nuevoCamino[0] });
      }
    }

    if (posicion) {
      const nuevaData = {
        fichaIndex: id,
        fichaPos: { top: posicion.top, left: posicion.left },
        casillasActivas: [],
      };

      // Si la casilla está en el círculo exterior, reinicia el camino actual
      if (casillasCirculoExterior.includes(id)) {
        nuevaData.caminoActual = null;
      }

      set(nuevaData);
    }
  },

  // Pasa al siguiente turno de juego
  avanzarTurno: () => {
    set((state) => ({
      turnoActual: (state.turnoActual + 1) % state.equipos.length,
      valorDado: null,
    }));
  },
}));