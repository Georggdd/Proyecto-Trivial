import React, { useEffect, useState, useRef } from 'react';
import CaraDelantera from './CaraDelantera';
import CaraTrasera from './CaraTrasera';

export default function TarjetaPregunta({ categoria, equipos, onFinish, useCustom = false, }) {
    const numEquipos = equipos.length;
    const audioRef = useRef(new Audio());

    const [pregunta, setPregunta] = useState(null);
    const [loading, setLoading] = useState(true);
    const [turnLocal, setTurnLocal] = useState(0);
    const [respuestasEquipos, setRespuestasEquipos] = useState(
        Array(numEquipos).fill(null)
    );
    const [respuestasCompletadas, setRespuestasCompletadas] = useState(false);
    const [show, setShow] = useState(false);
    const [round, setRound] = useState(0);

    useEffect(() => {
        setLoading(true);
        const url = useCustom
            ? 'http://localhost:3000/api/upload/test'    // <-- endpoint custom
            : `http://localhost:3000/api/preguntas/${encodeURIComponent(categoria)}`;
        console.log('🔍 Cargando preguntas desde', url);
        fetch(url)
            .then(r => r.ok ? r.json() : Promise.reject('Error'))
            .then(data => {
                const rnd = data[Math.floor(Math.random() * data.length)];
                if (useCustom) {
                    // tu tabla Customizable tiene: pregunta, opcion1..4, respuesta_correcta, puntuacion, explicacion
                    setPregunta({
                        categoria: 'Custom',
                        pregunta: rnd.pregunta,
                        puntuacion: rnd.puntuacion,
                        respuestas: [
                            { texto: rnd.opcion1, correcta: rnd.respuesta_correcta === rnd.opcion1, explicacion: rnd.explicacion },
                            { texto: rnd.opcion2, correcta: rnd.respuesta_correcta === rnd.opcion2, explicacion: rnd.explicacion },
                            { texto: rnd.opcion3, correcta: rnd.respuesta_correcta === rnd.opcion3, explicacion: rnd.explicacion },
                            { texto: rnd.opcion4, correcta: rnd.respuesta_correcta === rnd.opcion4, explicacion: rnd.explicacion },
                        ]
                    });
                } else {
                    setPregunta({
                        categoria: rnd.categoria.nombre,
                        pregunta: rnd.texto,
                        puntuacion: rnd.puntuacion,
                        respuestas: rnd.respuestas.map(r => ({
                            texto: r.texto,
                            correcta: r.esCorrecta,
                            explicacion: r.explicacion
                        }))
                    });
                }
            })
            .catch(console.error)
            .finally(() => {
                setLoading(false);
            });
    }, [categoria, round, useCustom]);

    useEffect(() => {
        setShow(false);
        const t = setTimeout(() => setShow(true), 400);
        return () => clearTimeout(t);
    }, [round]);

    // Función para obtener un audio aleatorio de un array
    const getAudioAleatorio = (audios) => {
        const indiceAleatorio = Math.floor(Math.random() * audios.length);
        return audios[indiceAleatorio];
    };

    // Función para reproducir audio aleatorio basado en el porcentaje de aciertos
    const reproducirAudioAleatorio = (respuestas) => {
        const aciertos = respuestas.filter(r => r?.correcta).length;
        const porcentajeAciertos = (aciertos / numEquipos) * 100;
        
        let audioPath;
        if (porcentajeAciertos >= 70) {
            // Array de audios para porcentaje >= 70%
            const audiosExcelentes = [
                '/assets/audio/excelente1.mp3',
                '/assets/audio/excelente2.mp3',
                '/assets/audio/excelente3.mp3'
            ];
            audioPath = getAudioAleatorio(audiosExcelentes);
        } else if (porcentajeAciertos >= 50) {
            // Array de audios para porcentaje >= 50%
            const audiosBuenos = [
                '/assets/audio/bueno1.mp3',
                '/assets/audio/bueno2.mp3',
                '/assets/audio/bueno3.mp3'
            ];
            audioPath = getAudioAleatorio(audiosBuenos);
        } else if (porcentajeAciertos >= 35) {
            // Array de audios para porcentaje >= 35%
            const audiosRegulares = [
                '/assets/audio/regular1.mp3',
                '/assets/audio/regular2.mp3',
                '/assets/audio/regular3.mp3'
            ];
            audioPath = getAudioAleatorio(audiosRegulares);
        } else {
            // Audio para porcentaje < 35%
            audioPath = '/assets/audio/mal.mp3';
        }

        audioRef.current.src = audioPath;
        audioRef.current.play().catch(error => console.error('Error al reproducir audio:', error));
    };

    // Cuando un equipo elige
    const handleOpcionClick = (r) => {
        setRespuestasEquipos(prev => {
            const cop = [...prev];
            cop[turnLocal] = r;
            return cop;
        });
        if (turnLocal < numEquipos - 1) {
            setTurnLocal(turnLocal + 1);
        }
    };

    // Borra todas las respuestas y vuelve al equipo 0
    const handleRecargar = () => {
        setRespuestasEquipos(Array(numEquipos).fill(null));
        setTurnLocal(0);
        setRespuestasCompletadas(false);
    };

    // Envía sólo si TODOS han respondido
    const handleEnviar = () => {
        if (respuestasEquipos.every(r => r !== null)) {
            setRespuestasCompletadas(true);
            reproducirAudioAleatorio(respuestasEquipos);
        }
    };

    // Tras ver resultados, reinicia y notifica al padre
    const siguienteRonda = () => {
        onFinish(respuestasEquipos, pregunta);
        setRespuestasEquipos(Array(numEquipos).fill(null));
        setTurnLocal(0);
        setRespuestasCompletadas(false);
        setRound(r => r + 1);
    };

    if (loading) return <p className="text-center mt-10 text-xl">Cargando pregunta…</p>;
    if (!pregunta) return <p className="text-center mt-10 text-xl">No hay preguntas.</p>;

    return (
        <div className="h-full w-full flex items-center justify-center perspective">
            <div className="h-[70%] w-full flex items-center justify-center">
                <section
                    className={`
            relative w-[65%] 2xl:w-[70%] h-full rounded-lg bg-white
            border-black border-[4px] transform transition-transform
            duration-1000 ease-out transform-style-preserve-3d
            ${show ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
            ${respuestasCompletadas ? 'rotate-y-180' : ''}
          `}
                >
                    <CaraDelantera
                        pregunta={pregunta}
                        equipoActual={turnLocal}
                        equipos={equipos}              // <–– así reconoce el índice del equipo
                        respuestasEquipos={respuestasEquipos}
                        onOpcionClick={handleOpcionClick}     // <–– clic registra respuesta
                        onRecargar={handleRecargar}
                        onEnviar={handleEnviar}
                    />

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