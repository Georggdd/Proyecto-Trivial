import React from 'react';

export default function CaraDelantera({ pregunta, equipoActual, respuestasEquipos, onResponder }) {
  return (
    <div id='contenido-tarjeta' className='flex-1 w-full h-full flex items-center justify-between font-lemon'>
      <div id='pregunta' className='w-1/2 h-[105%] flex flex-col items-center justify-center pl-2 ml-4'>
        <div id='marco-pregunta' className='p-7 h-[80%] w-[90%] border-gray-900 border-2 rounded-2xl flex items-center justify-center text-center'>
          <h1 className="font-bold md:text-4xl 2xl:text-7xl text-black px-4">{pregunta.pregunta}</h1>
        </div>
      </div>
      <div id='respuestas' className='w-1/2 h-[75%] flex flex-col items-center justify-center gap-2'>
        {pregunta.respuestas.map((r, i) => {
          const equiposQueEligieron = respuestasEquipos
            .map((resp, idx) => resp && resp.texto === r.texto ? idx + 1 : null)
            .filter(e => e !== null);

          return (
            <button
              key={i}
              onClick={() => !respuestasEquipos[equipoActual] && onResponder(r)}
              className="relative w-[75%] h-[40%] rounded-xl flex gap-2 pt-3 border-gray-900 border-2 bg-white pl-5 text-black text-lg text-left font-bold 2xl:text-3xl hover:bg-black hover:text-white transition-all"
            >
              <img className='w-[24.46px] h-[28.45px] ml-1 2xl:w-[34.46px] 2xl:h-[37.45px] 2xl:ml-5' src="/assets/img/icono-queso.png" alt='' />
              {r.texto}
              <div className='flex gap-1 absolute right-4 bottom-1 transform'>
                {equiposQueEligieron.map(num => (
                  <img
                    key={num}
                    src={`/assets/img/equipos/equipo-${num}.png`}
                    className='w-6 h-6 2xl:w-8 2xl:h-8 rounded-full border border-black'
                    alt={`Equipo ${num}`}
                  />
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
