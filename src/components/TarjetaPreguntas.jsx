import React, { useState, useEffect, useRef } from 'react';
import { textToSpeech } from '../services/elevenLabsService';

const TarjetaPreguntas = () => {
    const [preguntaActual, setPreguntaActual] = useState(0);
    const [reproduciendo, setReproduciendo] = useState(false);
    const [autoplay, setAutoplay] = useState(false);
    const [error, setError] = useState('');
    const timerRef = useRef(null);
    const audioRef = useRef(null);
    const preguntaActualRef = useRef(0); // Referencia para mantener el valor actual entre re-renders

    // Lista de preguntas de ejemplo
    const preguntas = [
        "¿Cuál es la capital de España?",
        "¿En qué año se descubrió América?",
        "¿Cuál es el río más largo del mundo?",
        "¿Quién escribió Don Quijote de la Mancha?",
        "¿Cuántos lados tiene un hexágono?"
    ];

    // Mantener sincronizada la referencia con el estado
    useEffect(() => {
        preguntaActualRef.current = preguntaActual;
    }, [preguntaActual]);

    // Detener cualquier reproducción en curso
    const detenerReproduccion = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.onended = null;
            audioRef.current.onerror = null;
            if (audioRef.current.src) {
                URL.revokeObjectURL(audioRef.current.src);
            }
            audioRef.current = null;
        }
        setReproduciendo(false);
    };

    // Función para reproducir la pregunta actual
    const reproducirPregunta = async (index = null) => {
        // Usar el índice proporcionado o el actual
        const indexPregunta = index !== null ? index : preguntaActualRef.current;
        
        // Detener cualquier reproducción en curso
        detenerReproduccion();
        
        try {
            setReproduciendo(true);
            setError('');
            
            const pregunta = preguntas[indexPregunta];
            console.log(`Reproduciendo pregunta ${indexPregunta + 1}: ${pregunta}`);
            
            const audioData = await textToSpeech(pregunta);
            
            // Crear blob y reproducir
            const blob = new Blob([audioData], { type: 'audio/mpeg' });
            const url = URL.createObjectURL(blob);
            
            // Crear y almacenar una referencia al elemento de audio
            const audioElement = new Audio(url);
            audioRef.current = audioElement;
            
            audioElement.onended = () => {
                URL.revokeObjectURL(url);
                audioRef.current = null;
                setReproduciendo(false);
            };
            
            audioElement.onerror = () => {
                URL.revokeObjectURL(url);
                audioRef.current = null;
                setError('Error al reproducir el audio');
                setReproduciendo(false);
            };
            
            await audioElement.play();
        } catch (error) {
            console.error('Error al reproducir pregunta:', error);
            setError(`Error: ${error.message || 'No se pudo reproducir el audio'}`);
            setReproduciendo(false);
            audioRef.current = null;
        }
    };

    // Cambiar a la siguiente pregunta
    const siguientePregunta = () => {
        const nuevaPregunta = preguntaActualRef.current === preguntas.length - 1 ? 0 : preguntaActualRef.current + 1;
        setPreguntaActual(nuevaPregunta);
        return nuevaPregunta;
    };

    // Cambiar a la pregunta anterior
    const preguntaAnterior = () => {
        const nuevaPregunta = preguntaActualRef.current === 0 ? preguntas.length - 1 : preguntaActualRef.current - 1;
        setPreguntaActual(nuevaPregunta);
        return nuevaPregunta;
    };

    // Iniciar o detener la reproducción automática
    const toggleAutoplay = () => {
        setAutoplay(prev => !prev);
    };

    // Configurar o limpiar el temporizador de autoplay
    const configurarAutoplay = () => {
        // Limpiar cualquier temporizador existente
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
        
        // Reproducir la pregunta actual inmediatamente
        reproducirPregunta();
        
        // Configurar el nuevo temporizador
        timerRef.current = setInterval(() => {
            // Cambiar a la siguiente pregunta y reproducirla
            const nuevaPregunta = siguientePregunta();
            reproducirPregunta(nuevaPregunta);
        }, 5000);
    };

    // Limpiar temporizador
    const limpiarAutoplay = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    };

    // Efecto para iniciar/detener autoplay cuando cambia el estado
    useEffect(() => {
        if (autoplay) {
            configurarAutoplay();
        } else {
            limpiarAutoplay();
        }
        
        // Limpieza al desmontar
        return () => {
            limpiarAutoplay();
            detenerReproduccion();
        };
    }, [autoplay]);

    // Manejar la navegación manual entre preguntas
    const manejarNavegacion = (funcion) => {
        // Detener reproducción y temporizadores
        detenerReproduccion();
        limpiarAutoplay();
        
        // Cambiar la pregunta
        const nuevaPregunta = funcion();
        
        // Si autoplay está activo, reiniciar después de navegar
        if (autoplay) {
            setTimeout(() => {
                configurarAutoplay();
            }, 100);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl mx-auto mt-6">
            <h2 className="text-2xl font-bold mb-6 text-center">Tarjeta de Preguntas</h2>
            
            {error && (
                <div className="p-2 mb-4 bg-red-100 text-red-700 rounded">
                    {error}
                </div>
            )}
            
            <div className="bg-blue-100 p-6 rounded-lg mb-6 min-h-[150px] flex items-center justify-center">
                <p className="text-xl text-center font-medium">
                    {preguntas[preguntaActual]}
                </p>
            </div>
            
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={() => manejarNavegacion(preguntaAnterior)}
                    disabled={reproduciendo}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                >
                    ← Anterior
                </button>
                
                <div className="flex space-x-3">
                    <button
                        onClick={() => reproducirPregunta()}
                        disabled={reproduciendo}
                        className={`px-4 py-2 rounded ${
                            reproduciendo
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-blue-500 hover:bg-blue-600 text-white'
                        } transition-colors`}
                    >
                        {reproduciendo ? 'Reproduciendo...' : '🔊 Leer'}
                    </button>
                    
                    <button
                        onClick={toggleAutoplay}
                        className={`px-4 py-2 rounded ${
                            autoplay
                                ? 'bg-green-500 text-white'
                                : 'bg-gray-200 hover:bg-gray-300'
                        } transition-colors`}
                    >
                        {autoplay ? '⏸️ Detener Auto' : '▶️ Auto (5s)'}
                    </button>
                </div>
                
                <button
                    onClick={() => manejarNavegacion(siguientePregunta)}
                    disabled={reproduciendo}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                >
                    Siguiente →
                </button>
            </div>
            
            <div className="mt-4 text-center text-sm text-gray-500">
                Pregunta {preguntaActual + 1} de {preguntas.length}
            </div>
        </div>
    );
};

export default TarjetaPreguntas; 