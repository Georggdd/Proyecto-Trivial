import React from 'react';
import fondo from '../assets/fondo.svg';
import pizarra from '../assets/pizarra.svg';
import logo from '../assets/logo.svg';
import profesor from '../assets/profesor.svg';
import Header from '../components/Header';

const Login = () => {
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
                <form className="text-white font-secular z-10">
                    <div className="w-32 space-y-4 text-sm">
                        <img src={logo} alt="Logo Trivial" className="mx-auto w-24 h-auto mb-4" />

                        <div className="flex flex-col">
                            <label htmlFor="usuario" className="mb-1 text-black font-itim">Usuario:</label>
                            <input
                                id="usuario"
                                type="text"
                                className="w-full px-2 py-2 border border-gray-700 rounded-xl text-black font-lemon"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="password" className="mb-1 text-black font-itim">Contraseña:</label>
                            <input
                                id="password"
                                type="password"
                                className="w-full px-2 py-2 border border-gray-700 rounded-xl text-black font-lemon"
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


