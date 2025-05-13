import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import TarjetaEquipo from "../components/TarjetaEquipo";
import { usePartidaStore } from "../hooks/usePartidaStore";
import { useLocation } from "react-router-dom";
import { useTurnoStore } from "../hooks/useTurnoStore";


function Equipos() {
  const location = useLocation();
  const categoriaSeleccionada = location.state?.categoriaSeleccionada || null;
  const selectedFile = location.state?.selectedFile || null;
  const navigate = useNavigate();
  const setPartidaId = usePartidaStore((state) => state.setPartidaId);

  const [equipos, setEquipos] = useState(
    [...Array(5)].map((_, index) => ({
      nombre: `Equipo ${index + 1}`,
      integrantes: [],
      enabled: false, // 👈 ahora empiezan desactivados
    }))
  );

  const actualizarEquipo = (index, datos) => {
    const nuevos = [...equipos];
    nuevos[index] = { ...nuevos[index], ...datos };
    setEquipos(nuevos);
  };

  const handleStart = async () => {
    try {
      // Crear partida
      const resPartida = await fetch("http://localhost:3000/api/partidas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ codigo: crypto.randomUUID().slice(0, 6) }),
      });

      const partida = await resPartida.json();
      setPartidaId(partida.id);

      const equiposActivos = equipos.filter((e) => e.enabled);
      useTurnoStore.getState().setEquipos(equiposActivos);

      // Enviar solo los activos
      await fetch("http://localhost:3000/api/equipos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          partidaId: partida.id,
          equipos: equiposActivos.map((e) => ({
            nombre: e.nombre,
            integrantes: e.integrantes,
          })),
        }),
      });

      navigate("/categorias", {
        state: {
          equiposConfigurados: true,
          categoriaSeleccionada,
          selectedFile,
        },
      });
    } catch (err) {
      console.error("Error al crear partida o equipos:", err);
      alert("Error al iniciar la partida");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col relative"
      style={{ backgroundImage: "url('/assets/Mesa.svg')" }}
    >
      <Header />

      <div className="flex-grow flex flex-col justify-center items-center text-white translate-y-[-40px] z-10">
        <h2 className="text-3xl mb-6">EQUIPOS</h2>

        <div className="flex flex-wrap justify-center items-center gap-6 max-w-7xl">
          {equipos.map((equipo, index) => (
            <TarjetaEquipo
              key={index}
              nombreInicial={equipo.nombre}
              jugadoresIniciales={equipo.integrantes}
              onUpdate={(datos) => actualizarEquipo(index, datos)}
            />
          ))}
        </div>

        <button
          onClick={handleStart}
          className="mt-8 bg-black hover:bg-gray-800 text-white text-xl px-6 py-2 rounded-full flex items-center gap-2 transition"
        >
          Guardar Equipos
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Equipos;