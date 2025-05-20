import React, { useState, useEffect } from 'react';
import { useTurnoStore } from '../hooks/useTurnoStore';

export default function Tarjeta_Pregunta({ categoria, onClose }) {
    const [pregunta, setPregunta] = useState(null);
    const [loading, setLoading] = useState(true);
    const [seleccion, setSeleccion] = useState(null);
    const [show, setShow] = useState(false);

    // Obtener las funciones del store
    const {
        equipos,
        turnoActual,
        addPuntos,
        syncPuntos,
        actualizarEquipos
    } = useTurnoStore();

    useEffect(() => {
        const fetchPregunta = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/preguntas/${categoria}`);
                const preguntas = await response.json();
                const preguntaAleatoria = preguntas[Math.floor(Math.random() * preguntas.length)];
                setPregunta(preguntaAleatoria);
                setShow(true);
                setLoading(false);
            } catch (error) {
                console.error('Error al cargar pregunta:', error);
            }
        };
        fetchPregunta();
    }, [categoria]);

    const responder = async (respuesta) => {
        console.log('Respuesta seleccionada:', respuesta);
        setSeleccion(respuesta);

        if (!respuesta.esCorrecta) {
            console.log('❌ Respuesta incorrecta');
            return;
        }

        console.log('✅ Respuesta correcta!');
        
        const equipo = equipos[turnoActual];
        if (!equipo?.id) {
            console.error('Equipo no válido:', equipo);
            return;
        }

        const incremento = Number(pregunta?.puntuacion || 10);

        try {
            console.log('🎯 Actualizando puntos:', {
                equipoId: equipo.id,
                puntosActuales: equipo.puntos,
                incremento,
                respuesta
            });

            // 1. Actualizar en la BD
            const equipoActualizado = await syncPuntos(equipo.id, incremento);
            console.log('✅ Puntos actualizados en BD:', equipoActualizado);

            // 2. Actualizar estado local
            addPuntos(equipo.id, incremento);
            console.log('💾 Estado local actualizado');

            // 3. Recargar equipos para asegurar sincronización
            const response = await fetch(
                `http://localhost:3000/api/equipos?partidaId=${equipo.partidaId}`
            );

            if (!response.ok) throw new Error('Error al recargar equipos');
            
            const equiposActualizados = await response.json();
            console.log('📊 Equipos actualizados:', equiposActualizados);
            
            actualizarEquipos(equiposActualizados);

        } catch (error) {
            console.error('❌ Error al actualizar puntos:', error);
        }
    };

    const handleSiguienteRonda = () => {
        console.log('🔄 Cambiando al siguiente turno');
        useTurnoStore.getState().siguienteTurno();
        console.log('🚪 Cerrando modal');
        onClose?.();
    };

    if (loading) return <div>Cargando...</div>;
    if (!pregunta) return <p className="text-center mt-10 text-xl">No hay preguntas disponibles.</p>;

    return (
        <div className="h-[85%] w-full flex items-center justify-center perspective">
            <div
                className={`relative w-full h-full transform-style-preserve-3d transition-all duration-[1000ms] ease-out max-w-[1900px] aspect-[2/1] ${seleccion ? 'rotate-y-180' : ''
                    } ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
            >
                {/* Frente */}
                <div className="absolute w-full h-full backface-hidden bg-white flex flex-col rounded-lg border-black border-[4px]">
                    <div className="w-full h-[19%] relative mt-6 bg-verdeOscuro flex items-center 2xl:gap-[30%] transform">
                        <h1 className="text-white text-7xl pt-3 pl-16 font-secular 2xl:text-8xl 2xl:pl-24 [text-shadow:_2px_2px_4px_rgba(0,0,0,0.5)]">
                            {pregunta.categoria?.nombre}
                        </h1>
                        <img src="/assets/img/queso-color-blanco.png" className="w-[15%] pt-6 absolute right-[15%]" alt="" />
                    </div>
                    <div className="flex-1 w-full h-full flex items-center justify-between font-lemon">
                        <div className="w-1/2 h-[105%] flex flex-col items-center justify-center pl-2 ml-4">
                            <div className="p-7 h-[80%] w-[90%] border-gray-900 border-2 rounded-2xl flex items-center justify-center text-center">
                                <h1 className="font-bold md:text-4xl 2xl:text-7xl text-black px-4">
                                    {pregunta.texto}
                                </h1>
                            </div>
                        </div>
                        <div className="w-1/2 h-[75%] flex flex-col items-center justify-center gap-4">
                            {pregunta.respuestas.map((r, i) => (
                                <button
                                    key={i}
                                    onClick={() => responder(r)}
                                    className="w-[70%] h-[40%] rounded-xl flex items-center gap-2 border-gray-900 border-2 bg-white pl-5 text-black text-lg text-wrap text-left font-bold 2xl:text-3xl hover:bg-black hover:text-white transition-all"
                                >
                                    <img className="w-[24.46px] h-[28.45px] ml-1 2xl:w-[34.46px] 2xl:h-[37.45px] 2xl:ml-5" src="/assets/img/icono-queso.png" alt="" />
                                    {r.texto}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Parte trasera */}
                <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-white flex flex-col rounded-lg border-black border-[4px] font-lemon p-6 gap-4">
                    <div className="w-full h-[19%] relative bg-verdeOscuro flex items-center 2xl:gap-[30%] transform">
                        <h1 className="text-white text-7xl pt-3 pl-16 font-secular 2xl:text-8xl 2xl:pl-24 [text-shadow:_2px_2px_4px_rgba(0,0,0,0.5)]">
                            {pregunta.categoria?.nombre}
                        </h1>
                        <img src="/assets/img/queso-color-blanco.png" className="w-[15%] pt-6 absolute right-[15%]" alt="" />
                    </div>
                    <div className="flex-1 flex-col w-full flex items-center justify-center gap-4 pt-4">
                        {pregunta.respuestas.map((r, i) => {
                            const esSeleccionada = seleccion?.id === r.id;
                            const esCorrecta = r.esCorrecta;
                            let fondo = 'bg-white';
                            let borde = '';
                            let texto = 'text-black';

                            if (esCorrecta) {
                                borde = 'border-green-600 border-2';
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
                            onClick={handleSiguienteRonda}
                            className="w-72 rounded-md mt-2 p-2 border-2 border-gray-900 text-black text-xl 2xl:text-2xl 2xl:p-5 hover:bg-black hover:text-white"
                        >
                            SIGUIENTE RONDA
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

