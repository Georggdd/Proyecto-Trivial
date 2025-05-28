import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

export default function Login({ onLoginSuccess }) {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Audio “Por favor, inicie sesión…”
  const [audioHabilitado, setAudioHabilitado] = useState(false);
  const audioRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio('/assets/audio/por-favor-inicie-sesion.mp3');

    const handleFirstClick = () => {
      setAudioHabilitado(true);
    };

    document.addEventListener('click', handleFirstClick);
    return () => {
      document.removeEventListener('click', handleFirstClick);
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  useEffect(() => {
    if (!audioHabilitado) return;
    const playAudio = () => {
      audioRef.current.play().catch(() => {});
    };
    playAudio();
    intervalRef.current = setInterval(playAudio, 15000);
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [audioHabilitado]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!usuario || !password) {
      setError('Por favor, completa todos los campos');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: usuario, password })
      });
      const data = await res.json();

      if (res.ok) {
        // guarda el token si lo necesitas:
        localStorage.setItem('token', data.token);
        onLoginSuccess?.();
        navigate('/categorias');
      } else {
        setError(data.error || 'Credenciales incorrectas');
      }
    } catch (err) {
      console.error(err);
      setError('Error al conectar con el servidor');
    }
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
          onSubmit={handleSubmit}
        >
          <div className="w-32 space-y-4 text-sm">
            <img src="/img/Logo_educacion.png" alt="Logo Trivial" className="mx-auto w-24 h-auto mb-4" />

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