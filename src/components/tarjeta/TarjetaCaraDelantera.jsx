export default function CaraDelantera({ pregunta, equipoActual, respuestasEquipos, responder}) {
    return (
        <div className="absolute inset-0 backface-hidden">
                <div className="w-full h-[19%] mt-7 bg-verdeOscuro flex items-center 2xl:gap-[30%]">
                    <h1 className="text-white text-7xl pt-3 pl-16 font-secular 2xl:text-8xl 2xl:pl-24">
                    {pregunta.categoria}
                    </h1>
                    <img src="/assets/img/queso-color-blanco.png" className="w-[15%] pt-6 absolute right-[15%]" alt="" />
                </div>
                <div className="flex-1 w-full h-[75%] flex items-center justify-between font-lemon">
                    <div className="w-1/2 h-full flex flex-col items-center justify-center pl-2 ml-4">
                    <div className="p-6 h-[87%] w-[90%] border-gray-900 border-2 rounded-2xl flex items-center justify-center text-center">
                        <h1 className="font-bold md:text-4xl 2xl:text-7xl text-black px-4">{pregunta.pregunta}</h1>
                    </div>
                    </div>
                    <div className="w-1/2 h-[75%] flex flex-col items-center justify-center gap-2">
                    {pregunta.respuestas.map((r, i) => {
                        const equipos = respuestasEquipos.map((resp, idx) => resp?.texto === r.texto ? idx + 1 : null).filter(Boolean);
                        return (
                        <button
                            key={i}
                            onClick={() => !respuestasEquipos[equipoActual] && responder(r)}
                            className="relative w-[75%] h-[40%] rounded-xl flex gap-2 pt-3 border-gray-900 border-2 bg-white pl-4 text-black text-lg text-left font-bold 2xl:text-3xl hover:bg-black hover:text-white transition-all"
                        >
                            <img className='w-[24.46px] h-[28.45px] 2xl:w-[34.46px] 2xl:h-[37.45px] 2xl:ml-5' src="/assets/img/icono-queso.png" alt='' />
                            {r.texto}
                            <div className='flex gap-1 absolute right-4 bottom-1'>
                            {equipos.map(num => (
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
                </div>
    );
}
