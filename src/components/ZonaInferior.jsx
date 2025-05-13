import React from 'react';
import DadoModal from './DadoModal';
import { useJuegoStore } from '../hooks/useJuegoStore';
import useGuiaStore from '../hooks/useGuiaStore';


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
  const valorDado = useJuegoStore((state) => state.valorDado);
  const toggleGuia = useGuiaStore((state) => state.toggleGuia); // <-- esto es nuevo

  return (
    <div className="relative w-full min-h-[10rem] h-fit">
      {/* Curva morada */}
      <div className="absolute bottom-0 left-0 w-full h-44 bg-purple-700 rounded-t-[60%] z-0" />

      {/* Botones muy juntos y laterales más bajos */}
      <div className="relative w-full flex justify-center items-end gap-2 sm:gap-4 z-10 -mt-24">
        {/* Izquierda: abre Guía */}
        <BotonSimple
          icono={"../assets/Tirada.svg"}
          onClick={toggleGuia}
          extraClass="top-8"
        />

        {/* Botón centro: dado */}
        <DadoModal onResultado={onDadoResultado}>
          <img
            src={"../assets/Dado.svg"}
            alt="Tirar dado"
            className="w-36 h-36 hover:scale-105 transition-transform"
          />
        </DadoModal>

        {/* Resultado del dado */}
        {valorDado && (
          <img
            src={carasDado[valorDado - 1]}
            alt={`Dado ${valorDado}`}
            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-12 h-12"
          />
        )}

        {/* Botón derecha */}
        <BotonSimple
          icono={"../assets/Comodin.svg"}
          onClick={() => alert('Usar comodín')}
          extraClass="top-8"
        />
      </div>
    </div>
  );
};

export default ZonaInferior;




