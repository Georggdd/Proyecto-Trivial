import React from 'react';
import DadoModal from './DadoModal';
import { useJuegoStore } from '../hooks/useJuegoStore';

import Tirada from '../assets/Tirada.svg';
import Dado from '../assets/Dado.svg';
import Comodin from '../assets/Comodin.svg';

import Cara1 from '../assets/Cara1.svg';
import Cara2 from '../assets/Cara2.svg';
import Cara3 from '../assets/Cara3.svg';
import Cara4 from '../assets/Cara4.svg';
import Cara5 from '../assets/Cara5.svg';
import Cara6 from '../assets/Cara6.svg';

const carasDado = [Cara1, Cara2, Cara3, Cara4, Cara5, Cara6];

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
  const valorDado = useJuegoStore((state) => state.valorDado);

  return (
    <div className="relative w-full min-h-[10rem] h-fit">
      {/* Curva morada */}
      <div className="absolute bottom-0 left-0 w-full h-44 bg-purple-700 rounded-t-[60%] z-0" />

      {/* Botones muy juntos y laterales más bajos */}
      <div className="relative w-full flex justify-center items-end gap-2 sm:gap-4 z-10 -mt-24">
        {/* Izquierda: Tirada doble + imagen del dado */}
        <BotonSimple icono={Tirada} onClick={() => alert('Tirada doble')} extraClass="top-8">
          {valorDado && (
            <img
              src={carasDado[valorDado - 1]}
              alt={`Dado ${valorDado}`}
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-12"
            />
          )}
        </BotonSimple>

        {/* Centro: Dado */}
        <DadoModal onResultado={onDadoResultado}>
          <img
            src={Dado}
            alt="Tirar dado"
            className="w-36 h-36 hover:scale-105 transition-transform"
          />
        </DadoModal>

        {/* Derecha: Comodín */}
        <BotonSimple icono={Comodin} onClick={() => alert('Usar comodín')} extraClass="top-8" />
      </div>
    </div>
  );
};

export default ZonaInferior;



