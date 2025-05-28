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
        body: JSON.stringify({ usuario, password }),
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        onLoginSuccess();
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
      style={{ backgroundImage: `url("/assets/Fondo.svg")` }}
    >
      <Header />
      <div
        className="relative bg-no-repeat bg-cover bg-center p-10 rounded shadow-lg w-full max-w-2xl min-h-[500px] flex items-center justify-center"
        style={{ backgroundImage: `url("/assets/Pizarra-login.svg")` }}
      >
        <img
          src="/assets/Profesor.svg"
          alt="Profesor"
          className="hidden md:block absolute left-32 w-40 h-auto"
        />

        <form
          onSubmit={handleSubmit}
          className="text-black z-10 flex flex-col items-center space-y-6"
        >
          <img
            src="/assets/img/Logo_educacion.png"
            alt="Logo Trivial"
            className="w-24 h-auto mb-4"
          />

          {error && (
            <div className="text-red-600 font-semibold">{error}</div>
          )}

          <div className="w-64 flex flex-col gap-1">
            <label htmlFor="usuario" className="font-itim">
              Usuario:
            </label>
            <input
              id="usuario"
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="w-full px-2 py-1 border border-gray-700 rounded-xl font-lemon"
            />
          </div>

          <div className="w-64 flex flex-col gap-1">
            <label htmlFor="password" className="font-itim">
              Contraseña:
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-2 py-1 border border-gray-700 rounded-xl font-lemon"
            />
          </div>

          <button
            type="submit"
            className="w-32 px-4 py-2 bg-[#446CD1] text-white rounded-xl hover:bg-[#365bb0] transition font-itim"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}


