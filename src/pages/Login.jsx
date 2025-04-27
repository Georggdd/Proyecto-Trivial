import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const Login = () => {
  const navigate = useNavigate(); // 👈 Importante
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginSubmit = (e) => {
    e.preventDefault(); // Evita recarga
    // Aquí podrías validar el usuario o consultar backend si lo deseas
    navigate('/Categorias'); // 👈 Redirige a Categorías
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(/assets/Fondo.svg)` }}
    >
      <Header />

      <div
        className="relative bg-no-repeat bg-cover bg-center p-10 rounded shadow-lg w-full max-w-2xl min-h-[500px] flex items-center justify-center"
        style={{ backgroundImage: `url(/assets/Pizarra-login.svg)` }}
      >
        <img
          src="/assets/Profesor.svg"
          alt="Profesor"
          className="hidden md:block absolute left-32 w-40 h-auto"
        />

        <form
          className="text-white font-secular z-10"
          onSubmit={handleLoginSubmit} // 👈 aquí
        >
          <div className="w-32 space-y-4 text-sm">
            <img src="/img/Logo_educación.png" alt="Logo Trivial" className="mx-auto w-24 h-auto mb-4" />

            <div className="flex flex-col">
              <label htmlFor="usuario" className="mb-1 text-black font-itim">Usuario:</label>
              <input
                id="usuario"
                type="text"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                className="w-full px-2 py-2 border border-gray-700 rounded-xl text-black font-lemon"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="mb-1 text-black font-itim">Contraseña:</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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


