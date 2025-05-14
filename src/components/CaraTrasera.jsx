import React from 'react';

export default function CaraTrasera({ pregunta, respuestasEquipos, onSiguienteRonda }) {
  return (
    <div id='contenido-tarjeta' className='flex-1 flex-col w-full flex items-center backface-hidden rotate-y-180 transform-style-preserve-3d font-lemon p-6 gap-4'>
      <div id='respuestas' className='w-full flex flex-col items-center justify-center gap-4 pt-4'>
        {pregunta.respuestas.map((r, i) => {
          const fueSeleccionada = respuestasEquipos.some(resp => resp.texto === r.texto);
          const esCorrecta = r.correcta;
          const equiposQueEligieron = respuestasEquipos
            .map((resp, idx) => resp && resp.texto === r.texto ? idx + 1 : null)
            .filter(e => e !== null);

          let fondo = 'bg-white';
          let borde = 'border-gray-900 border';
          let texto = 'text-black';

          if (esCorrecta) {
            borde = 'border-green-600 border-2';
          } else if (fueSeleccionada) {
            borde = 'border-red-600 border-2';
          }

          return (
            <div
              key={i}
              className={`relative w-[70%] h-auto rounded-xl flex items-start gap-2 text-wrap 2xl:w-[75%] ${fondo} ${borde} pl-4 p-2 2xl:p-6 ${texto} text-xl font-bold 2xl:text-3xl transition-all`}
            >
              <div className='flex flex-col gap-2'>
                <div className='flex gap-2'>
                  <img
                    className='w-[24.46px] h-[28.45px] ml-0 2xl:w-[34.46px] 2xl:h-[37.45px] 2xl:ml-5'
                    src='/assets/img/icono-queso.png'
                    alt=''
                  />
                  <span>{r.texto}</span>
                  <div className='flex gap-1 absolute right-2 bottom-2'>
                    {equiposQueEligieron.map(num => (
                      <img
                        key={num}
                        src={`/assets/img/equipos/equipo-${num}.png`}
                        className='w-6 h-6 2xl:w-8 2xl:h-8 rounded-full border border-black'
                        alt={`Equipo ${num}`}
                      />
                    ))}
                  </div>
                </div>
                {esCorrecta && r.explicacion && (
                  <p className='text-md font-light 2xl:text-xl text-black text-left font-secular leading-relaxed break-words max-w-full'>
                    {r.explicacion}
                  </p>
                )}
              </div>
            </div>
          );
        })}
        <button
          className='w-72 rounded-md mt-2 p-2 border-2 border-gray-900 text-black text-xl 2xl:text-2xl 2xl:p-5 hover:bg-black hover:text-white'
          onClick={onSiguienteRonda}
        >
          SIGUIENTE RONDA
        </button>
      </div>
    </div>
  );
}
