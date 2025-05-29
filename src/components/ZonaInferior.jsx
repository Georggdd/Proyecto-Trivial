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
    <div className="border-b-4 border-x-4 border-double border-orange-600 relative w-full min-h-[8rem] h-fit"> {/* Reducido de 10rem a 8rem */}
      {/* Curva morada */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-purple-700 rounded-t-[60%] z-0" /> {/* Reducida altura de h-44 a h-32 */}

      {/* Botones más pequeños y juntos */}
      <div className="relative w-full flex justify-center items-end gap-2 sm:gap-4 z-10 -mt-16"> {/* Ajustado margen top */}
        {/* Botones más pequeños */}
        <BotonSimple
          icono={"../assets/Guia.png"}
          onClick={toggleGuia}
          extraClass="top-8 w-28 h-28" // Reducido de w-36 h-36
        />

        <DadoModal onResultado={onDadoResultado}>
          <img
            src={"../assets/Dado.svg"}
            alt="Tirar dado"
            className="w-28 h-28 hover:scale-105 transition-transform" // Reducido de w-36 h-36
          />
        </DadoModal>

        <BotonSimple
          icono={"../assets/Group.png"}
          onClick={() => alert('Usar comodín')}
          extraClass="top-8 w-28 h-28" // Reducido de w-36 h-36
        />
      </div>
    </div>
  );
};

export default ZonaInferior;




