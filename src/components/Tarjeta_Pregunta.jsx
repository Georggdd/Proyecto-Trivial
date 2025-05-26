// src/components/Tarjeta_Pregunta.jsx
import React from 'react';

export default function Tarjeta_Pregunta({
  pregunta,
  equipos,
  turnoActual,
  respuestas,
  fase,
  onOpcionClick,
  onMostrarResultado,
}) {
  if (!pregunta) return null;

  return (
    <div className="h-[85%] w-full flex items-center justify-center perspective">
      <div
        className={`relative w-full h-full transform-style-preserve-3d transition-all duration-[1000ms] ease-out max-w-[1900px] aspect-[2/1]
          ${fase === 'mostrar' || fase === 'revelado' ? 'rotate-y-180' : ''}
          opacity-100 scale-100`}
      >
        {/* ── Frente ── */}
        <div className="absolute w-full h-full backface-hidden bg-white flex flex-col rounded-lg border-black border-[4px]">
          {/* Header de categoría */}
          <div className="w-full h-[19%] relative mt-6 bg-verdeOscuro flex items-center 2xl:gap-[30%]">
            <h1 className="text-white text-7xl pt-3 pl-16 font-secular 2xl:text-8xl [text-shadow:_2px_2px_4px_rgba(0,0,0,0.5)]">
              {pregunta.categoria?.nombre}
            </h1>
            <img
              src="/assets/img/queso-color-blanco.png"
              className="w-[15%] pt-6 absolute right-[15%]"
              alt=""
            />
          </div>

          {/* ── Quién responde ── */}
          <div className="flex items-center gap-2 mb-4 px-8">
            <img
              src={equipos[turnoActual]?.avatarMini}
              alt={equipos[turnoActual]?.nombre}
              className="w-8 h-8 rounded-full border-2 border-indigo-500"
            />
            <span className="font-semibold text-indigo-700">
              Turno de {equipos[turnoActual]?.nombre}
            </span>
          </div>

          {/* ── Pregunta + opciones ── */}
          <div className="flex-1 w-full h-full flex items-center justify-between font-lemon px-8">
            <div className="w-1/2 h-[105%] flex flex-col items-center justify-center pl-2 ml-4">
              <div className="p-7 h-[80%] w-[90%] border-gray-900 border-2 rounded-2xl flex items-center justify-center text-center">
                <h1 className="font-bold md:text-4xl 2xl:text-7xl text-black px-4">
                  {pregunta.texto}
                </h1>
              </div>
            </div>
            <div className="w-1/2 h-[75%] flex flex-col items-center justify-center gap-4">
              {pregunta.respuestas.map((r) => {
                const elegido = respuestas[equipos[turnoActual]?.id] === r.id;
                return (
                  <button
                    key={r.id}
                    onClick={() => fase === 'contestando' && onOpcionClick(r.id)}
                    disabled={fase !== 'contestando'}
                    className={`w-[70%] h-[40%] rounded-xl flex items-center gap-2
                      ${elegido ? 'border-indigo-600 bg-indigo-50' : 'border-gray-900 bg-white'}
                      border-2 pl-5 text-black text-lg font-bold hover:bg-black hover:text-white transition-all`}
                  >
                    <img
                      className="w-[24.46px] h-[28.45px] ml-1 2xl:w-[34.46px] 2xl:h-[37.45px] 2xl:ml-5"
                      src="/assets/img/icono-queso.png"
                      alt=""
                    />
                    {r.texto}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Botón multinivel ── */}
          <div className="mt-2 flex justify-center">
            {fase === 'contestando' ? (
              <button
                onClick={() =>
                  onOpcionClick(respuestas[equipos[turnoActual]?.id])
                }
                disabled={!respuestas[equipos[turnoActual]?.id]}
                className="w-72 rounded-md p-2 border-2 border-gray-900 text-black text-xl hover:bg-black hover:text-white transition"
              >
                Siguiente ronda
              </button>
            ) : (
              <button
                onClick={onMostrarResultado}
                className="w-72 rounded-md p-2 border-2 border-gray-900 text-black text-xl hover:bg-black hover:text-white transition"
              >
                Mostrar resultado
              </button>
            )}
          </div>
        </div>

        {/* ── Parte trasera ── */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-white flex flex-col rounded-lg border-black border-[4px] font-lemon p-6 gap-4">
          {/* Header categoría */}
          <div className="w-full h-[19%] relative bg-verdeOscuro flex items-center 2xl:gap-[30%]">
            <h1 className="text-white text-7xl pt-3 pl-16 font-secular 2xl:text-8xl">
              {pregunta.categoria?.nombre}
            </h1>
            <img
              src="/assets/img/queso-color-blanco.png"
              className="w-[15%] pt-6 absolute right-[15%]"
              alt=""
            />
          </div>
          <div className="flex-1 flex-col w-full flex items-center justify-center gap-4 pt-4">
            {pregunta.respuestas.map((r) => {
              const seleccionada =
                respuestas[equipos[turnoActual]?.id] === r.id;
              const esCorrecta = r.esCorrecta;
              const borde = esCorrecta
                ? 'border-green-600 border-2'
                : seleccionada
                ? 'border-red-600 border-2'
                : 'border-gray-900 border';
              return (
                <div
                  key={r.id}
                  className={`w-[70%] h-auto rounded-xl flex items-start gap-2 text-wrap 2xl:w-[75%] ${borde} pl-4 p-2 2xl:p-6`}
                >
                  <img
                    className="w-[24.46px] h-[28.45px] ml-0 2xl:w-[34.46px] 2xl:h-[37.45px] 2xl:ml-5"
                    src="/assets/img/icono-queso.png"
                    alt=""
                  />
                  <div className="flex flex-col gap-2">
                    <span className={esCorrecta ? 'text-green-600' : 'text-black'}>
                      {r.texto}
                    </span>
                    {esCorrecta && r.explicacion && (
                      <p className="text-md font-light 2xl:text-xl text-black text-left font-secular leading-relaxed break-words max-w-full">
                        {r.explicacion}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <button
            onClick={onMostrarResultado}
            className="mt-4 w-72 mx-auto py-3 border-2 border-gray-900 text-xl rounded hover:bg-black hover:text-white transition"
          >
            SIGUIENTE RONDA
          </button>
        </div>
      </div>
    </div>
  );
}