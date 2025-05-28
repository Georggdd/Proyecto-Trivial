import React, { useEffect, useState } from 'react';
import CaraDelantera from './TarjetaCaraDelantera';
import CaraTrasera from './TarjetaCaraTrasera';

export default function TarjetaPregunta({ categoria }) {
        const [pregunta, setPregunta] = useState(null);
        const [loading, setLoading] = useState(true);
        const [equipoActual, setEquipoActual] = useState(0);
        const [respuestasEquipos, setRespuestasEquipos] = useState(Array(6).fill(null));
        const [respuestasCompletadas, setRespuestasCompletadas] = useState(false);
        const [estadisticasEquipos, setEstadisticasEquipos] = useState(
            Array(6).fill({ aciertos: 0, fallos: 0 })
        );

        const [show, setShow] = useState(false);
        useEffect(() => {
            const timeout = setTimeout(() => setShow(true), 400); // pequeño retraso para permitir la transición
            return () => clearTimeout(timeout);
        }, []);

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

        useEffect(() => {
            if (respuestasCompletadas && pregunta) {
                const nuevasEstadisticas = estadisticasEquipos.map((equipo, idx) => {
                    const respuesta = respuestasEquipos[idx];
                    const esCorrecta = pregunta.respuestas.find(
                        (r) => r.texto === respuesta?.texto
                    )?.correcta;
                    return {
                        aciertos: equipo.aciertos + (esCorrecta ? 1 : 0),
                        fallos: equipo.fallos + (!esCorrecta ? 1 : 0),
                    };
                });
                setEstadisticasEquipos(nuevasEstadisticas);

                // Calcular porcentaje de aciertos global
                const totalEquipos = respuestasEquipos.filter(r => r !== null).length;
                const totalAciertos = respuestasEquipos.filter((respuesta, idx) => {
                    if (!respuesta) return false;
                    const esCorrecta = pregunta.respuestas.find(r => r.texto === respuesta.texto)?.correcta;
                    return esCorrecta;
                }).length;
                const porcentajeAciertos = totalEquipos > 0 ? (totalAciertos / totalEquipos) * 100 : 0;

                // Batería de audios para cada caso
                const audios75 = [
                    '/assets/audio/Impresionante.mp3',
                    '/assets/audio/desempeño.mp3',
                    '/assets/audio/mayoria.mp3',
                ];
                const audios50 = [
                    '/assets/audio/esfuerzo.mp3',
                    '/assets/audio/interesante.mp3',
                    '/assets/audio/intento.mp3',
                ];
                const audios0 = [
                    '/assets/audio/Buen.mp3',
                    '/assets/audio/felicito.mp3',
                    '/assets/audio/intencion.mp3',
                ];

                // Función para elegir un audio aleatorio
                function audioAleatorio(arr) {
                    return arr[Math.floor(Math.random() * arr.length)];
                }

                // Reproducir audio según el porcentaje de aciertos
                if (porcentajeAciertos > 75) {
                    new Audio(audioAleatorio(audios75)).play();
                } else if (porcentajeAciertos > 50) {
                    new Audio(audioAleatorio(audios50)).play();
                } else if (porcentajeAciertos === 0) {
                    new Audio(audioAleatorio(audios0)).play();
                }
            }
            // eslint-disable-next-line
        }, [respuestasCompletadas]);

        if (loading) return <p className="text-center mt-10 text-xl">Cargando pregunta...</p>;
        if (!pregunta) return <p className="text-center mt-10 text-xl">No hay preguntas disponibles.</p>;

        return (
        <div className="h-full w-full flex items-center justify-center perspective">
            <div className="h-[70%] w-full flex items-center justify-center">
            <section
                className={`relative w-[65%] 2xl:w-[70%] h-full rounded-lg bg-white border-black border-[4px] transform transition-transform duration-1000 ease-out  transform-style-preserve-3d ${show ? 'scale-100 opacity-100' : 'scale-0 opacity-0'} ${respuestasCompletadas ? 'rotate-y-180' : ''}`}
            >
                {/* CARA FRONTAL */}
                <CaraDelantera
                pregunta={pregunta}
                equipoActual={equipoActual}
                respuestasEquipos={respuestasEquipos}
                responder={responder}
                />
                
                {/* CARA TRASERA */}
                <CaraTrasera
                pregunta={pregunta}
                respuestasEquipos={respuestasEquipos}
                siguienteRonda={siguienteRonda}
                />
                
            </section>
            </div>
        </div>
        );
    }