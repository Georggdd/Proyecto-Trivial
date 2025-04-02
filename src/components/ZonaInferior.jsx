import React from 'react';
import DadoModal from './DadoModal';

import Tirada from '../assets/Tirada.svg';
import Dado from '../assets/Dado.svg';
import Comodin from '../assets/Comodin.svg';

const BotonSimple = ({ icono, onClick, extraClass = '' }) => (
  <button
    onClick={onClick}
    className={`w-36 h-36 relative hover:scale-105 transition-transform ${extraClass}`}
  >
    <img src={icono} alt="icono" className="w-full h-full" />
  </button>
);

const ZonaInferior = () => {
  return (
    <div className="relative w-full h-44">
      {/* Curva morada */}
      <div className="absolute bottom-0 left-0 w-full h-44 bg-purple-700 rounded-t-[60%] z-0" />

      {/* Botones muy juntos y laterales más bajos */}
      <div className="absolute bottom-[8.5rem] w-full flex justify-center items-end gap-4 z-10">
        {/* Izquierda: Tirada doble */}
        <BotonSimple icono={Tirada} onClick={() => alert('Tirada doble')} extraClass="top-8" />

        {/* Centro: Dado */}
        <DadoModal>
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



