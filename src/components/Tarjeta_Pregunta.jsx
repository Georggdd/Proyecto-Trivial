import React, { useEffect, useState } from 'react';

export default function Tarjeta_Pregunta({ pregunta, onClose }) {
  const [show, setShow] = useState(false);
  const [seleccion, setSeleccion] = useState(null);

  const responder = (respuesta) => {
    setSeleccion(respuesta);
  };

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <section
      id="tarjeta"
      className={`bg-white flex flex-col h-[85%] w-[65%] rounded-lg border-black border-[4px] 2xl:w-[70%] transition-all duration-[600ms] ease-out transform ${
        show ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
      }`}
    >
      {/* Título */}
      <div className="w-full h-[19%] mt-6 bg-verdeOscuro flex items-center gap-[27%] 2xl:gap-[30%]">
        <h1 className="text-white text-7xl pt-6 pl-16 font-secular 2xl:text-8xl 2xl:pl-24 [text-shadow:_2px_2px_4px_rgba(0,0,0,0.5)]">
          {pregunta.categoria}
        </h1>
        <img
          src="/public/assets/img/queso-color-blanco.png"
          className="w-[15%] pt-6"
          alt=""
        />
      </div>

      {!seleccion ? (
        <div className="flex-1 w-full h-full flex items-center justify-between font-lemon">
          <div className="w-1/2 h-[105%] flex flex-col items-center justify-center pl-2 ml-4">
            <div className="p-7 h-[85%] w-[85%] border-gray-900 border-2 rounded-2xl flex items-center justify-center text-center">
              <h1 className="font-bold md:text-5xl 2xl:text-7xl text-black px-4">
                {pregunta.pregunta}
              </h1>
            </div>
          </div>

          <div className="w-1/2 h-[75%] flex flex-col items-center justify-center gap-4">
            {pregunta.respuestas.map((r, i) => (
              <button
                key={i}
                onClick={() => responder(r)}
                className="w-[70%] h-[40%] rounded-xl flex items-center gap-4 text-nowrap border-gray-900 border-2 bg-white pl-5 text-black text-xl font-bold 2xl:text-3xl hover:bg-black hover:text-white transition-all"
              >
                <img
                  className="w-[24.46px] h-[28.45px] ml-2 2xl:w-[34.46px] 2xl:h-[37.45px] 2xl:ml-5"
                  src="/assets/img/icono-queso.png"
                  alt=""
                />
                {r.texto}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex-col w-full flex items-center font-lemon p-6 gap-4">
          <div className="w-full flex flex-col items-center justify-center gap-2">
            {pregunta.respuestas.map((r, i) => {
              const esSeleccionada = seleccion === r;
              const esCorrecta = r.correcta;

              let fondo = 'bg-white';
              let borde = '';
              let texto = 'text-black';

              if (esCorrecta) {
                borde = 'border-black border-2';
              } else if (esSeleccionada) {
                borde = 'border-red-600 border-2';
              } else {
                borde = 'border-gray-900 border';
              }

              return (
                <div
                  key={i}
                  className={`w-[70%] h-auto rounded-xl flex items-start gap-2 text-wrap 2xl:w-[75%] ${fondo} ${borde} pl-4 p-2 2xl:p-6 ${texto} text-xl font-bold 2xl:text-3xl transition-all`}
                >
                  <img
                    className="w-[24.46px] h-[28.45px] ml-0 2xl:w-[34.46px] 2xl:h-[37.45px] 2xl:ml-5"
                    src="/assets/img/icono-queso.png"
                    alt=""
                  />
                  <div className="flex flex-col gap-2">
                    <span>{r.texto}</span>
                    {esCorrecta && r.explicacion && (
                      <p className="text-md font-light 2xl:text-xl text-black text-left font-secular leading-relaxed break-words max-w-full">
                        {r.explicacion}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
            <button
              onClick={onClose}
              className="w-72 rounded-md mt-2 p-2 border-2 border-gray-900 text-black text-xl 2xl:text-2xl 2xl:p-5 hover:bg-black hover:text-white"
            >
              SIGUIENTE RONDA
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

