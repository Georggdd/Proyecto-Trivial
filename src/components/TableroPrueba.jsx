// src/components/Tablero.jsx
import { useMemo } from 'react';

// 1. Cargamos todos los SVGs como componentes React (via SVGR)
const casillasRaw = import.meta.glob('/src/assets/tablero-casillas/*.svg', {
  eager: true,
  import: 'ReactComponent',
});

function TableroPrueba() {
  // 2. Procesamos y ordenamos por ID extraído del nombre del archivo
  const casillasOrdenadas = useMemo(() => {
    return Object.entries(casillasRaw)
      .map(([path, Component]) => {
        const match = path.match(/\/(\d+)\.svg$/);
        const id = match ? parseInt(match[1], 10) : null;
        return { id, Component };
      })
      .filter((c) => c.id !== null)
      .sort((a, b) => a.id - b.id);
  }, []);

  // 3. Posiciones temporales para prueba
  const posiciones = (id) => ({
    left: `${100 + 4 * id}px`,
    top: `${100 + 2 * id}px`,
  });

  return (
    <div className="relative w-full h-screen bg-gray-100 overflow-hidden">
      {/* Fondo del tablero */}
      <img
        src="/assets/img/fondo-tablero.png"
        className="absolute w-[50%] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
        alt="Fondo tablero"
      />

      {/* Casillas posicionadas encima del fondo */}
      {casillasOrdenadas.map(({ id, Component }) => (
        <Component
          key={id}
          className="absolute w-[40px] h-[40px] cursor-pointer hover:scale-110 transition-transform z-10"
          style={posiciones(id)}
          onClick={() => console.log(`Casilla ${id} clicada`)}
        />
      ))}
    </div>
  );
}

export default TableroPrueba;
