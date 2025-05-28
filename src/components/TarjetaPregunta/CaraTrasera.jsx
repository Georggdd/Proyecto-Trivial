// src/components/TarjetaPregunta/CaraTrasera.jsx
import React from 'react';
import { categoryBg } from '../../utils/categoriaColors';

export default function CaraTrasera({
    pregunta,
    respuestasEquipos,
    siguienteRonda,
}) {
    const bgClass = categoryBg[pregunta.categoria] || 'bg-gray-800';
    return (
        <div className="absolute inset-0 backface-hidden rotate-y-180 flex flex-col items-center">
            {/* Header de categoría */}
            <div className={`${bgClass} w-full h-[19%] mt-7 flex items-center relative 2xl:gap-[30%]`}>
                <h1 className="text-white text-7xl pt-3 pl-16 font-secular 2xl:text-8xl 2xl:pl-24">
                    {pregunta.categoria}
                </h1>
                <img
                    src="/assets/img/queso-color-blanco.png"
                    className="w-[15%] pt-6 absolute right-[15%]"
                    alt=""
                />
            </div>

            {/* Resultados */}
            <div className="flex-1 w-full flex flex-col items-center justify-center font-lemon p-6 gap-4">
                {pregunta.respuestas.map((r, i) => {
                    const fueSeleccionada = respuestasEquipos.some(
                        (resp) => resp?.texto === r.texto
                    );
                    const esCorrecta = r.correcta;
                    const quienes = respuestasEquipos
                        .map((resp, idx) => (resp?.texto === r.texto ? idx + 1 : null))
                        .filter(Boolean);

                    let borde = 'border-gray-900 border';
                    if (esCorrecta) borde = 'border-green-600 border-2';
                    else if (fueSeleccionada) borde = 'border-red-600 border-2';

                    return (
                        <div
                            key={i}
                            className={`
                relative w-[75%] h-auto rounded-xl flex items-start gap-2
                2xl:w-[75%] bg-white ${borde} pl-4 p-2 2xl:p-6
                text-black text-xl font-bold 2xl:text-3xl transition-all
              `}
                        >
                            <img
                                className="w-[24.46px] h-[28.45px] 2xl:w-[34.46px] 2xl:h-[37.45px] 2xl:ml-5"
                                src="/assets/img/icono-queso.png"
                                alt=""
                            />
                            <div className="flex-1 flex flex-col gap-2 relative">
                                <div className="flex gap-4">
                                    <span className="whitespace-nowrap">{r.texto}</span>
                                    <div className="flex gap-1">
                                        {quienes.map((num) => (
                                            <img
                                                key={num}
                                                src={`/assets/img/equipos/equipo-${num}.png`}
                                                className="w-8 h-8 2xl:w-8 2xl:h-8 rounded-full border border-black"
                                                alt={`Equipo ${num}`}
                                            />
                                        ))}
                                    </div>
                                </div>
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
                    onClick={siguienteRonda}
                    className="w-72 rounded-md mt-2 p-2 border-2 border-gray-900 text-black text-xl 2xl:text-2xl 2xl:p-5 hover:bg-black hover:text-white transition"
                >
                    SIGUIENTE RONDA
                </button>
            </div>
        </div>
    );
}