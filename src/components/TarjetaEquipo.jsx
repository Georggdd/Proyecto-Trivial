import React, { useState, useRef, useEffect } from "react";
import { Switch } from "@headlessui/react";
import { useTurnoStore } from "../hooks/useTurnoStore";

function TarjetaEquipo({
  nombreInicial = "Equipo 1",
  jugadoresIniciales = ["JUGADOR 1", "JUGADOR 2", "JUGADOR 3", "JUGADOR 4", "JUGADOR 5"],
  onUpdate,
}) {
  const [enabled, setEnabled] = useState(false);
  const [imagenPerfil, setImagenPerfil] = useState(null);
  const [nombre, setNombre] = useState(nombreInicial);
  const [jugadores, setJugadores] = useState(
    jugadoresIniciales && jugadoresIniciales.length > 0
      ? jugadoresIniciales
      : ["JUGADOR 1", "JUGADOR 2", "JUGADOR 3", "JUGADOR 4", "JUGADOR 5"]
  );
  const fileInputRef = useRef(null);
  const turnoActual = useTurnoStore((state) => state.turnoActual);
  const equipos = useTurnoStore((state) => state.equipos);
  const esTurno =
  equipos.length > 0 &&
  equipos[turnoActual]?.nombre === nombre &&
  window.location.pathname === "/tablero";

  // Actualizar estado del padre cada vez que cambia algo importante
  useEffect(() => {
    if (onUpdate) {
      onUpdate({
        nombre,
        integrantes: jugadores,
        imagen: imagenPerfil,
        enabled,
      });
    }
  }, [nombre, jugadores, imagenPerfil, enabled]);

  const handleImageUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagenPerfil(imageUrl);
    }
  };

  const handleJugadorInput = (e, index) => {
    const nuevos = [...jugadores];
    nuevos[index] = e.target.value;
    setJugadores(nuevos);
  };

  return (
    <div className={`w-48 rounded-xl shadow-xl p-4 flex flex-col items-center border border-black
      ${esTurno ? "bg-yellow-300 border-4 border-yellow-500 scale-105" : "bg-[#f6eddc]"}`}>
      {/* Imagen o icono */}
      <div className="relative w-24 h-24 mb-2">
        <img
          src={imagenPerfil || "/assets/img/ninio.png"}
          alt="Avatar"
          className="w-full h-full object-cover rounded-full border-2 border-black"
        />

        {/* Botón para subir imagen */}
        <button
          onClick={handleImageUploadClick}
          className="absolute bottom-0 right-0 w-5 h-5 bg-black text-white text-xl rounded-full flex items-center justify-center z-20"
        >
          +
        </button>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleImageChange}
        />
      </div>

      {/* Nombre editable + switch */}
      <div className="flex justify-between items-center border border-black px-3 py-1 w-full mb-2">
        <span
          className="italic font-semibold text-black focus:outline-none"
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => setNombre(e.target.innerText)}
        >
          {nombre}
        </span>
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className={`${enabled ? "bg-black" : "bg-[#d7c3b8]"
            } relative inline-flex h-6 w-12 items-center rounded-full border border-black transition`}
        >
          <span
            className={`${enabled ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform bg-[#f6eddc] rounded-full transition`}
          />
        </Switch>
      </div>

      {/* Jugadores */}
      <div className="bg-black text-white w-full p-3 rounded-md border border-black">
        <ul className="space-y-2 font-bold tracking-wide">
          {jugadores.map((jugador, index) => (
            <li key={index}>
              <input
                type="text"
                value={jugador}
                onChange={(e) => handleJugadorInput(e, index)} // ✅ ESTA ES LA FUNCIÓN CORRECTA
                className="w-full px-2 py-1 text-black rounded-md text-center font-lemon"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TarjetaEquipo;