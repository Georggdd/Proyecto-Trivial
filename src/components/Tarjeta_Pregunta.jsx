import React, { useEffect, useState } from 'react';

export default function Tarjeta_Pregunta({ categoria }) {
        const [pregunta, setPregunta] = useState(null);
        const [loading, setLoading] = useState(true);
        const [equipoActual, setEquipoActual] = useState(0);
        const [respuestasEquipos, setRespuestasEquipos] = useState(Array(6).fill(null));
        const [respuestasCompletadas, setRespuestasCompletadas] = useState(false);

        const responder = (respuesta) => {
        const nuevasRespuestas = [...respuestasEquipos];
        nuevasRespuestas[equipoActual] = respuesta;
        setRespuestasEquipos(nuevasRespuestas);

        if (equipoActual < 5) {
            setEquipoActual(equipoActual + 1);
        } else {
            setRespuestasCompletadas(true);
        }
        };

        const siguienteRonda = () => {
        setEquipoActual(0);
        setRespuestasEquipos(Array(6).fill(null));
        setRespuestasCompletadas(false);
        setPregunta(null);
        setLoading(true);
        };

        useEffect(() => {
        fetch(`http://localhost:3000/api/preguntas/${encodeURIComponent(categoria)}`)
            .then((res) => {
            if (!res.ok) throw new Error('Error al cargar preguntas');
            return res.json();
            })
            .then((data) => {
            const preguntaRandom = data[Math.floor(Math.random() * data.length)];

            const preguntaFormato = {
                categoria: preguntaRandom.categoria.nombre,
                pregunta: preguntaRandom.texto,
                respuestas: preguntaRandom.respuestas.map((r) => ({
                texto: r.texto,
                correcta: r.esCorrecta,
                explicacion: r.explicacion,
                })),
            };

            setPregunta(preguntaFormato);
            setLoading(false);
            })
            .catch((err) => {
            console.error(err);
            setLoading(false);
            });
        }, [categoria]);

        if (loading) return <p className="text-center mt-10 text-xl">Cargando pregunta...</p>;
        if (!pregunta) return <p className="text-center mt-10 text-xl">No hay preguntas disponibles.</p>;

        return (
        <div className="h-full w-full flex items-center justify-center perspective">
            <div className="h-[70%] w-full flex items-center justify-center">
            <section
                className={`relative w-[65%] 2xl:w-[70%] h-full rounded-lg bg-white border-black border-[4px] transition-transform duration-1000 ease-out transform-style-preserve-3d ${respuestasCompletadas ? 'rotate-y-180' : ''}`}
            >
                {/* CARA FRONTAL */}
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

                {/* CARA TRASERA */}
                <div className="absolute inset-0 rotate-y-180 backface-hidden">
                <div className="w-full h-[19%] mt-7 bg-verdeOscuro flex items-center 2xl:gap-[30%]">
                    <h1 className="text-white text-7xl pt-3 pl-16 font-secular 2xl:text-8xl 2xl:pl-24">
                    {pregunta.categoria}
                    </h1>
                    <img src="/assets/img/queso-color-blanco.png" className="w-[15%] pt-6 absolute right-[15%]" alt="" />
                </div>
                <div className="flex-1 flex-col w-full flex items-center font-lemon p-6 pt-8 gap-4">
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
                        className={`w-[75%] h-auto rounded-xl flex items-start gap-2 2xl:w-[75%] bg-white ${borde} pl-4 p-2 2xl:p-6 text-black text-xl font-bold 2xl:text-3xl transition-all relative`}
                        >
                        <img className='w-[24.46px] h-[28.45px] 2xl:w-[34.46px] 2xl:h-[37.45px] 2xl:ml-5' src='/assets/img/icono-queso.png' alt='' />
                        <div className='flex flex-col gap-2'>
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
            </section>
            </div>
        </div>
        );
    }
