import React from 'react';
import { categoryBg } from '../../utils/categoriaColors';
import ninioAvatar from '../../assets/img/ninio.png';

export default function CaraDelantera({
  pregunta,
  equipos,
  equipoActual,
  respuestasEquipos,
  onOpcionClick,
  onRecargar,
  onEnviar,
}) {
  const bgClass = categoryBg[pregunta.categoria] || 'bg-gray-800';
  const yaRespondido = respuestasEquipos[equipoActual] !== null;
  const todosRespondieron = respuestasEquipos.every(r => r !== null);
  const nombreEquipo = equipos[equipoActual]?.nombre || `Equipo ${equipoActual + 1}`;

  return (
    <div className="absolute inset-0 backface-hidden">
      {/* Header con color dinámico */}
      <div className={`${bgClass} w-full h-[19%] mt-7 flex items-center relative 2xl:gap-[30%]`}>
        <h1 className="text-white text-7xl pt-3 pl-16 font-secular 2xl:text-8xl 2xl:pl-24">
          {pregunta.categoria} x {pregunta.puntuacion}
        </h1>
        <img
          src="public\img\Logo_EducaTrivial.png"
          className="w-[15%] pt-6 absolute right-[15%] drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]"
          alt=""
        />
      </div>

      {/* Pregunta y controles */}
      <div className="flex-1 w-full h-[75%] flex items-center justify-between font-lemon px-8">
        {/* Texto */}
        <div className="w-1/2 h-full flex flex-col items-center justify-center pl-2 ml-4">
          <div className="p-6 h-[90%] w-[90%] border-black border-2 rounded-2xl flex items-center justify-center text-center">
            <h1 className="font-bold text-4xl text-black px-4">
              {pregunta.pregunta}
            </h1>
          </div>
        </div>

        {/* Turno y botones */}
        <div className="w-1/2 h-[87%] ml-10 flex flex-col justify-center gap-4">
          <div className="flex relative items-center">
            <p className="mb-2 text-2xl text-left font-bold 2xl:text-3xl">
              {nombreEquipo}
            </p>
            <div className="flex gap-4 absolute right-24">
              <button
                onClick={onRecargar}
                className="border-black border-2 rounded-lg p-1"
              >
                <img
                  src="/assets/img/refresh-arrow.png"
                  className="w-[26px]"
                  alt="Recargar"
                />
              </button>
              <button
                onClick={onEnviar}
                disabled={!todosRespondieron}
                className={`
                  border-black border-2 rounded-lg p-1
                  ${todosRespondieron
                    ? 'hover:bg-gray-200'
                    : 'opacity-50 cursor-not-allowed'}
                `}
              >
                <img
                  src="/assets/img/sendicon.png"
                  className="w-[26px]"
                  alt="Enviar"
                />
              </button>
            </div>
          </div>

          {/* Opciones */}
          {pregunta.respuestas.map((r, i) => {
            const quienes = respuestasEquipos
              .map((resp, idx) => (resp?.texto === r.texto ? idx : null))
              .filter((idx) => idx !== null);

            return (
              <button
                key={i}
                onClick={() => !yaRespondido && onOpcionClick(r)}
                disabled={yaRespondido}
                className="
                  relative w-[87%] h-[40%] rounded-xl flex items-center gap-2 pt-3
                  border-black border-2 bg-white pl-4 text-black text-lg text-left
                  font-bold 2xl:text-3xl hover:bg-black hover:text-white transition-all
                "
              >
                <img
                  className="w-[24.46px] h-[28.45px] ml-1 2xl:ml-5"
                  src="/assets/img/icono-queso.png"
                  alt=""
                />
                {r.texto}

                {quienes.length > 0 && (
                  <div className="absolute bottom-1 right-4 flex flex-row-reverse space-x-1">
                    {quienes.map((idx) => (
                      <img
                        key={idx}
                        src={equipos[idx]?.avatarMini || ninioAvatar}
                        className="w-6 h-6 2xl:w-8 2xl:h-8 rounded-full border border-black"
                        alt={`Equipo ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
