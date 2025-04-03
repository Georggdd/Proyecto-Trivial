import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import Cara1 from '../assets/Cara1.svg';
import Cara2 from '../assets/Cara2.svg';
import Cara3 from '../assets/Cara3.svg';
import Cara4 from '../assets/Cara4.svg';
import Cara5 from '../assets/Cara5.svg';
import Cara6 from '../assets/Cara6.svg';

const carasDado = [
  { valor: 1, imagen: Cara1 },
  { valor: 2, imagen: Cara2 },
  { valor: 3, imagen: Cara3 },
  { valor: 4, imagen: Cara4 },
  { valor: 5, imagen: Cara5 },
  { valor: 6, imagen: Cara6 },
];

const DadoModal = ({ children }) => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [caraActual, setCaraActual] = useState(null);
  const [animando, setAnimando] = useState(false);

  const tirarDado = () => {
    setMostrarModal(true);
    setAnimando(true);

    const duracion = Math.random() * (4000 - 1000) + 1000;
    const intervalo = setInterval(() => {
      const random = Math.floor(Math.random() * 6);
      setCaraActual(carasDado[random]);
    }, 100);

    setTimeout(() => {
      clearInterval(intervalo);
      const resultadoFinal = Math.floor(Math.random() * 6);
      setCaraActual(carasDado[resultadoFinal]);
      setAnimando(false);
    }, duracion);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setCaraActual(null);
  };

  return (
    <>
      <div onClick={tirarDado}>
        {children}
      </div>

      {mostrarModal && (
        createPortal(
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
            <div className="w-60 h-60 bg-white rounded-full flex items-center justify-center shadow-lg relative">
              {caraActual && caraActual.imagen ? (
                <img
                  src={caraActual.imagen}
                  alt={`Cara ${caraActual.valor}`}
                  className="w-24 h-24"
                />
              ) : (
                <p className="text-xl font-bold">Cargando...</p>
              )}

              {!animando && (
                <button
                  onClick={cerrarModal}
                  className="absolute bottom-4 text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Cerrar
                </button>
              )}
            </div>
          </div>,
          document.body
        )
      )}
    </>
  );
};

export default DadoModal;
