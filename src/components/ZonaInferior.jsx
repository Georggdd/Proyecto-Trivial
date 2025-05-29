import React from 'react';
import DadoModal from './DadoModal';
import { useJuegoStore } from '../hooks/useJuegoStore';
import useGuiaStore from '../hooks/useGuiaStore';
import { useTurnoStore } from '../hooks/useTurnoStore';


const carasDado = ["../assets/Cara1.svg", "../assets/Cara2.svg", "../assets/Cara3.svg", "../assets/Cara4.svg", "../assets/Cara5.svg", "../assets/Cara6.svg"];

const BotonSimple = ({ icono, onClick, extraClass = '', children }) => (
  <button
    onClick={onClick}
    className={`w-36 h-36 relative hover:scale-105 transition-transform ${extraClass}`}
  >
    <img src={icono} alt="icono" className="w-full h-full" />
    {children}
  </button>
);

const ZonaInferior = ({ onDadoResultado }) => {
  const multiplicador = useJuegoStore((state) => state.multiplicador);
  const multiplicadorDisponible = useJuegoStore((state) => state.multiplicadorDisponible);
  const aciertosGrupales = useJuegoStore((state) => state.aciertosGrupales);
  const usarMultiplicador = useJuegoStore((state) => state.usarMultiplicador); // Añadir esta línea
  const equipos = useTurnoStore((state) => state.equipos);
  const turnoActual = useTurnoStore((state) => state.turnoActual);
  const setEquipos = useTurnoStore((state) => state.setEquipos);
  const toggleGuia = useGuiaStore((state) => state.toggleGuia); // <-- esto es nuevo

  const handleMultiplicador = () => {
    console.log('🎲 Intentando usar multiplicador:', {
      multiplicadorDisponible,
      multiplicadorActual: multiplicador,
      equipoActual: equipos[turnoActual]
    });

    if (!multiplicadorDisponible) {
      console.log('❌ Multiplicador no disponible');
      return;
    }
    
    const mult = usarMultiplicador();
    console.log('✨ Multiplicador usado:', mult);

    const nuevosEquipos = equipos.map((eq, idx) => {
      if (idx === turnoActual) {
        const puntosOriginales = eq.puntos;
        const puntosNuevos = eq.puntos * mult;
        console.log('🔄 Multiplicando puntos:', {
          equipo: eq.nombre,
          puntosOriginales,
          multiplicador: mult,
          puntosNuevos
        });
        return { ...eq, puntos: puntosNuevos };
      }
      return eq;
    });
    
    console.log('📊 Nuevos equipos:', nuevosEquipos);
    setEquipos(nuevosEquipos);
  };

  return (
    <div className="border-b-4 border-x-4 border-double border-orange-600 relative w-full min-h-[8rem] h-fit">
      {/* Curva morada */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-purple-700 rounded-t-[60%] z-0" /> {/* Reducida altura de h-44 a h-32 */}

      {/* Botones más pequeños y juntos */}
      <div className="relative w-full flex justify-center items-end gap-2 sm:gap-4 z-10 -mt-16"> {/* Ajustado margen top */}
        {/* Botones laterales más pequeños */}
        <BotonSimple
          icono={"../assets/Guia.png"}
          onClick={toggleGuia}
          extraClass="top-8 w-28 h-28" // Reducido de w-36 h-36
        />

        <DadoModal onResultado={onDadoResultado}>
          <img
            src={"../assets/Dado.svg"}
            alt="Tirar dado"
            className="w-36 h-36 hover:scale-105 transition-transform" // Aumentado de w-28 h-28 a w-36 h-36
          />
        </DadoModal>

        <BotonSimple
          icono={"../assets/Group.png"}
          onClick={handleMultiplicador}
          extraClass={`top-8 w-28 h-28 relative ${!multiplicadorDisponible ? 'opacity-50' : 'animate-pulse'}`}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-yellow-400 drop-shadow-lg translate-y-6">
              x{multiplicador}
            </span>
            <span className="text-sm text-white drop-shadow-lg translate-y-8">
              {aciertosGrupales}/8
            </span>
          </div>
        </BotonSimple>
      </div>
    </div>
  );
};

export default ZonaInferior;