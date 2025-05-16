import React, { useEffect, useState } from 'react';
import CaraDelantera from './TarjetaCaraDelantera';
import CaraTrasera from './TarjetaCaraTrasera';

export default function TarjetaPregunta({ categoria }) {
        const [pregunta, setPregunta] = useState(null);
        const [loading, setLoading] = useState(true);
        const [equipoActual, setEquipoActual] = useState(0);
        const [respuestasEquipos, setRespuestasEquipos] = useState(Array(6).fill(null));
        const [respuestasCompletadas, setRespuestasCompletadas] = useState(false);

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