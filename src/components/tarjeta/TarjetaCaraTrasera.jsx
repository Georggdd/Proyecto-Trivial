export default function CaraTrasera ({ pregunta, respuestasEquipos, siguienteRonda}) {
    return (
        <div className="absolute flex flex-col items-center inset-0 rotate-y-180 backface-hidden">
                <div className="w-full h-[19%] mt-7 bg-verdeOscuro flex items-center 2xl:gap-[30%]">
                    <h1 className="text-white text-7xl pt-3 pl-16 font-secular 2xl:text-8xl 2xl:pl-24">
                    {pregunta.categoria}
                    </h1>
                    <img src="/assets/img/queso-color-blanco.png" className="w-[15%] pt-6 absolute right-[15%]" alt="" />
                </div>
                <div className="flex-1 flex-col w-full flex items-center justify-center font-lemon p-6 gap-2">
                    {pregunta.respuestas.map((r, i) => {
                    const fueSeleccionada = respuestasEquipos.some(resp => resp?.texto === r.texto);
                    const esCorrecta = r.correcta;
                    const equipos = respuestasEquipos.map((resp, idx) => resp?.texto === r.texto ? idx + 1 : null).filter(Boolean);

                    let borde = 'border-gray-900 border';
                    if (esCorrecta) borde = 'border-green-600 border-2';
                    else if (fueSeleccionada) borde = 'border-red-600 border-2';

                    return (
                        <div
                        key={i}
                        className={`w-[75%] h-auto rounded-xl flex items-start gap-1 2xl:w-[75%] bg-white ${borde} pl-4 p-2 2xl:p-6 text-black text-xl font-bold 2xl:text-3xl transition-all relative`}
                        >
                        <img className='w-[24.46px] h-[28.45px] 2xl:w-[34.46px] 2xl:h-[37.45px] 2xl:ml-5' src='/assets/img/icono-queso.png' alt='' />
                        <div className='flex flex-col gap-1'>
                            <div className='flex gap-4'>
                            <span className='text-nowrap'>{r.texto}</span>
                            <div className='flex gap-1'>
                                {equipos.map(num => (
                                <img
                                    key={num}
                                    src={`/assets/img/equipos/equipo-${num}.png`}
                                    className='w-8 h-8 2xl:w-8 2xl:h-8 rounded-full border border-black'
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
                    onClick={siguienteRonda}
                    >
                    SIGUIENTE RONDA
                    </button>
                </div>
                </div>
    );
}