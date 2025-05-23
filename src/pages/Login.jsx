import React, { useState } from 'react';
import fondo from '../assets/fondo.svg';
import pizarra from '../assets/pizarra.svg';
import logo from '../assets/logo.svg';
import profesor from '../assets/profesor.svg';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';


const Login = () => {

    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ usuario, password }),
            });

            const data = await res.json();

            if (res.ok) {
                alert('Inicio de sesión exitoso');
                localStorage.setItem('token', data.token);
                 navigate('/categorias');
                // Aquí podrías guardar el token y redirigir
                // localStorage.setItem('token', data.token);
            } else {
                alert(`Error: ${data.error}`);
            }
        } catch (error) {
            console.error(error);
            alert('Error al conectar con el servidor');
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-no-repeat bg-cover bg-center"
            style={{ backgroundImage: `url(${fondo})` }}
        >
            <Header />
            {/* Pizarra con fondo */}
            <div
                className="relative bg-no-repeat bg-cover bg-center p-10 rounded shadow-lg w-full max-w-2xl min-h-[500px] flex items-center justify-center"
                style={{ backgroundImage: `url(${pizarra})` }}
            >
                {/* Imagen del profesor posicionada a la izquierda del form sin afectar su centrado */}
                <img
                    src={profesor}
                    alt="Profesor"
                    className="hidden md:block absolute left-32 w-40 h-auto"
                />

                {/* Formulario completamente centrado en la pizarra */}
                <form onSubmit={handleSubmit} className="text-white font-secular z-10">
                    <div className="w-32 space-y-4 text-sm">
                        <img src={logo} alt="Logo Trivial" className="mx-auto w-24 h-auto mb-4" />

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


