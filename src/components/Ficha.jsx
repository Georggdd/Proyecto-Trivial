import React from 'react';
import { useJuegoStore } from '../store/useJuegoStore';
import { casillas } from '../components/Posiciones/tableroData';

const Ficha = () => {
  const fichaPos = useJuegoStore((state) => state.fichaPos);

  if (!fichaPos) {
    console.warn('No se encontró posición para fichaPos:', fichaPos);
    return null;
  }

  const styleFicha = {
    top: `${fichaPos.top}%`,
    ...(fichaPos.left !== undefined
      ? { left: `${fichaPos.left}%` }
      : { right: `${fichaPos.right}%` }),
    transform: 'translate(-50%, -50%)',
  };

  console.log('Ficha en:', fichaPos, 'Coordenadas aplicadas:', styleFicha);

  return (
    <div
      className="absolute z-30 w-[1.5vw] h-[1.5vw] rounded-full bg-red-500"
      style={styleFicha}
    />
  );
};

export default Ficha;
