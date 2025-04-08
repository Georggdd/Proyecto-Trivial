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
    const { fichaIndex: rawFichaIndex, caminoActual } = get();
    const fichaIndex = Number(rawFichaIndex);
    let nuevasCasillas = [];

    const casillasCirculoExterior = [
      31, 32, 33, 34, 35, 36, 37, 38,
      39, 40, 41, 42, 43, 44, 45, 46,
      47, 48, 49, 50, 51, 52, 53, 54,
      55, 56, 57, 58, 59, 60, 61, 62,
      63, 64, 65, 66, 67, 68, 69, 70,
      71, 72
    ];

    const circularGet = (arr, index) => {
      const len = arr.length;
      return arr[(index + len) % len];
    };

    console.log("🎲 Valor del dado recibido:", valor);
    console.log("📍 Ficha index actual:", fichaIndex);
    console.log("🧭 Camino actual:", caminoActual);

    if (fichaIndex === 0 && caminoActual === null) {
      // ⏱️ Mostrar solo la última casilla alcanzable al salir del centro por cada camino
      nuevasCasillas = Object.values(rutasCaminos)
        .map((camino) => camino[Math.min(valor - 1, camino.length - 1)])
        .filter(Boolean);
      console.log("🚪 Desde el centro, posibles caminos:", nuevasCasillas);
    } else if (caminoActual) {
      const camino = rutasCaminos[caminoActual];
      const indexEnCamino = camino.indexOf(fichaIndex);
      console.log("🛣️ Movimiento por camino:", caminoActual, "→ Index en camino:", indexEnCamino);

      if (indexEnCamino !== -1) {
        const pasosEnCamino = camino.length - 1 - indexEnCamino;
        const pasosDentroCamino = Math.min(valor, pasosEnCamino);

        // ⏱️ Mostrar solo la última casilla alcanzable dentro del camino
        if (pasosDentroCamino > 0) {
          nuevasCasillas.push(camino[indexEnCamino + pasosDentroCamino]);
        }

        const pasosEnCirculo = valor - pasosDentroCamino;
        if (pasosEnCirculo > 0) {
          const ultimaCasilla = camino[camino.length - 1];
          const indexEnCirculo = casillasCirculoExterior.findIndex(
            (id) => Number(id) === Number(ultimaCasilla)
          );
          console.log("🔄 Entra al círculo desde:", ultimaCasilla, "→ Index círculo:", indexEnCirculo);

          if (indexEnCirculo !== -1) {
            for (let j = 1; j <= pasosEnCirculo; j++) {
              nuevasCasillas.push(circularGet(casillasCirculoExterior, indexEnCirculo + j));
              // ⬅️ También añadimos el sentido antihorario (opcional)
              nuevasCasillas.push(circularGet(casillasCirculoExterior, indexEnCirculo - j));
            }
          } else {
            console.warn("❌ Última casilla del camino no está en el círculo exterior:", ultimaCasilla);
          }
        }
      }
    } else {
      const indexEnCirculo = casillasCirculoExterior.findIndex(
        (id) => Number(id) === Number(fichaIndex)
      );
      console.log("🔵 Movimiento dentro del círculo exterior → Index:", indexEnCirculo);

      if (indexEnCirculo !== -1) {
        // ⏱️ Mostrar solo la última casilla alcanzable en cada dirección
        const derechaFinal = circularGet(casillasCirculoExterior, indexEnCirculo + valor); // sentido horario 🕒
        const izquierdaFinal = circularGet(casillasCirculoExterior, indexEnCirculo - valor); // sentido antihorario 🕗
        nuevasCasillas.push(derechaFinal, izquierdaFinal);
      } else {
        console.warn("❌ FichaIndex no está en el círculo exterior:", fichaIndex);
      }
    }

    console.log("✅ Casillas activas calculadas:", nuevasCasillas);
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

    console.log('🏁 Mover ficha a:', posicion);

    if (posicion) {
      const casillasCirculoExterior = [
        31, 32, 33, 34, 35, 36, 37, 38,
        39, 40, 41, 42, 43, 44, 45, 46,
        47, 48, 49, 50, 51, 52, 53, 54,
        55, 56, 57, 58, 59, 60, 61, 62,
        63, 64, 65, 66, 67, 68, 69, 70,
        71, 72
      ];

      const nuevaData = {
        fichaIndex: id,
        fichaPos: { top: posicion.top, left: posicion.left },
        casillasActivas: [],
      };

      if (casillasCirculoExterior.includes(id)) {
        nuevaData.caminoActual = null;
        console.log('↩️ Ficha entra al círculo, caminoActual reseteado');
      }

      set(nuevaData);
    }
  },

  siguienteTurno: () => {
    set((state) => ({
      turnoActual: (state.turnoActual + 1) % state.equipos.length,
      valorDado: null,
    }));
  },
}));
