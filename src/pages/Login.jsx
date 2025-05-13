import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const Login = ({ onLoginSuccess }) => {
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Crear el elemento de audio
        const audio = new Audio('/assets/audio/por-favor-inicie-sesion.mp3');
        
        // Función para reproducir el audio
        const playAudio = () => {
            audio.play().catch(error => {
                console.error('Error al reproducir el audio:', error);
            });
        };

        // Reproducir el audio inmediatamente
        playAudio();

        // Configurar el intervalo para reproducir cada 15 segundos
        const intervalId = setInterval(playAudio, 15000);

        // Limpiar el intervalo cuando el componente se desmonte
        return () => {
            clearInterval(intervalId);
            audio.pause();
            audio.currentTime = 0;
        };
    }, []); // El array vacío significa que esto solo se ejecutará una vez al montar el componente

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Aquí deberías implementar la lógica real de autenticación
        // Por ahora, usaremos una validación simple para demostración
        if (usuario && password) {
            try {
                // Simular una llamada a la API
                // En producción, aquí iría tu llamada real a la API
                if (usuario === 'admin' && password === 'admin') {
                    onLoginSuccess();
                    navigate('/categorias');
                } else {
                    setError('Usuario o contraseña incorrectos');
                }
            } catch (err) {
                setError('Error al iniciar sesión');
            }
        } else {
            setError('Por favor, completa todos los campos');
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-no-repeat bg-cover bg-center"
            style={{ backgroundImage: `url("../assets/Fondo.svg")` }}
        >
            <Header />
            {/* Pizarra con fondo */}
            <div
                className="relative bg-no-repeat bg-cover bg-center p-10 rounded shadow-lg w-full max-w-2xl min-h-[500px] flex items-center justify-center"
                style={{ backgroundImage: `url("../assets/Pizarra-login.svg")` }}
            >
                {/* Imagen del profesor posicionada a la izquierda del form sin afectar su centrado */}
                <img
                    src="../assets/Profesor.svg"
                    alt="Profesor"
                    className="hidden md:block absolute left-32 w-40 h-auto"
                />

                {/* Formulario completamente centrado en la pizarra */}
                <form onSubmit={handleSubmit} className="text-white font-secular z-10">
                    <div className="w-32 space-y-4 text-sm">
                        <img src="../img/Logo_educacion.png" alt="Logo Trivial" className="mx-auto w-24 h-auto mb-4" />

                        <div className="flex flex-col">
                            <label htmlFor="usuario" className="mb-1 text-black font-itim">Usuario:</label>
                            <input
                                id="usuario"
                                type="text"
                                className="w-full px-2 py-2 border border-gray-700 rounded-xl text-black font-lemon"
                                onChange={(e) => setUsuario(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="password" className="mb-1 text-black font-itim">Contraseña:</label>
                            <input
                                id="password"
                                type="password"
                                className="w-full px-2 py-2 border border-gray-700 rounded-xl text-black font-lemon"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-24 px-2 py-1 text-base bg-[#446CD1] text-white rounded-xl hover:bg-[#365bb0] mx-auto block font-itim"
                        >
                            Entrar
                        </button>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;


