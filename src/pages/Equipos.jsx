import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import TarjetaEquipo from "../components/TarjetaEquipo";
import { usePartidaStore } from "../hooks/usePartidaStore";
import { useTurnoStore } from "../hooks/useTurnoStore";

function Equipos() {
  /* ---------- Navegación y state que viene de VistaCategorias ---------- */
  const navigate = useNavigate();
  const location = useLocation();
  const categoriaSeleccionada = location.state?.categoriaSeleccionada || null;
  const selectedFile = location.state?.selectedFile || null;

  /* ---------- Stores ---------- */
  const setPartida = usePartidaStore((s) => s.setPartida);   // setter correcto
  const setEquiposStore = useTurnoStore((s) => s.setEquipos);

  /* ---------- Estado local: 5 tarjetas de equipo ---------- */
  const [equipos, setEquipos] = useState(
    [...Array(5)].map((_, idx) => ({
      nombre: `Equipo ${idx + 1}`,
      integrantes: [],
      enabled: false,          // empiezan desactivados
    }))
  );

  const actualizarEquipo = (index, datos) => {
    const nuevos = [...equipos];
    nuevos[index] = { ...nuevos[index], ...datos };
    setEquipos(nuevos);
  };

  /* ---------- Guardar partida + equipos ---------- */
  const handleStart = async () => {
    try {
      /* 1· Crear la partida */
      const profesorId = localStorage.getItem("userId");        // viene del login
      const resPartida = await fetch("http://localhost:3000/api/partidas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          codigo: crypto.randomUUID().slice(0, 6),
          profesorId: profesorId ? Number(profesorId) : undefined,
        }),
      });

      if (!resPartida.ok) throw new Error("No se pudo crear la partida");
      const partida = await resPartida.json();                  // { id, codigo }

      /* 2· Guarda la partida en el store */
      setPartida(partida);

      /* 3· Filtra los equipos habilitados y súbelos al store */
      const equiposActivos = equipos.filter((e) => e.enabled);
      setEquiposStore(equiposActivos);

      /* 4· Envía uno a uno cada equipo con imagen */
      for (const e of equiposActivos) {
        const fd = new FormData();
        fd.append('partidaId', partida.id);
        fd.append('nombre', e.nombre);
        fd.append('integrantes', e.integrantes.join(';'));
        if (e.imagenFile) {
          fd.append('avatar', e.imagenFile);
        }
        const res = await fetch('http://localhost:3000/api/equipos', {
          method: 'POST',
          body: fd,
        });
        // maneja res.ok / res.json() si lo necesitas…
      }

      /* 5· Vuelve a VistaCategorias con flag de éxito */
      navigate("/categorias", {
        state: {
          equiposConfigurados: true,
          categoriaSeleccionada,
          selectedFile,
        },
      });
    } catch (err) {
      console.error("Error al crear partida o equipos:", err);
      alert("No se pudo iniciar la partida. Revisa la consola.");
    }
  };

  /* ---------- Render ---------- */
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col"
      style={{ backgroundImage: "url('/assets/Mesa.svg')" }}
    >
      <Header />

      <div className="flex-grow flex flex-col justify-center items-center text-white -translate-y-10">
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Equipos;