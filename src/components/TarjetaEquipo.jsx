import React, { useState, useRef } from "react";
import { Switch } from "@headlessui/react";

function TarjetaEquipo({ nombreInicial = "Equipo 1", jugadoresIniciales = ["JUGADOR 1", "JUGADOR 2", "JUGADOR 3", "JUGADOR 4", "JUGADOR 5"] }) {
  const [enabled, setEnabled] = useState(false);
  const [imagenPerfil, setImagenPerfil] = useState(null);
  const [nombre, setNombre] = useState(nombreInicial);
  const [jugadores, setJugadores] = useState(jugadoresIniciales);
  const fileInputRef = useRef(null);

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

  const handleJugadorEdit = (e, index) => {
    const newJugadores = [...jugadores];
    newJugadores[index] = e.target.innerText;
    setJugadores(newJugadores);
  };

  return (
    <div className="w-48 bg-[#f6eddc] rounded-xl shadow-xl p-4 flex flex-col items-center border border-black">
      {/* Imagen o icono */}
      <div className="relative w-24 h-24 mb-2">
        {imagenPerfil ? (
          <img src={imagenPerfil} alt="Perfil" className="w-full h-full object-cover rounded-full border-2 border-black" />
        ) : (
          <>
            <div className="absolute inset-0 flex items-center justify-center rounded-full border-2 border-black z-10">
              <div className="w-16 h-16 opacity-30">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                </svg>
              </div>
            </div>
            <button
              onClick={handleImageUploadClick}
              className="absolute bottom-0 right-0 w-5 h-5 bg-black text-white text-xl rounded-full flex items-center justify-center z-20"
            >
              +
            </button>
          </>
        )}

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
          className={`${
            enabled ? "bg-black" : "bg-[#d7c3b8]"
          } relative inline-flex h-6 w-12 items-center rounded-full border border-black transition`}
        >
          <span
            className={`${
              enabled ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform bg-[#f6eddc] rounded-full transition`}
          />
        </Switch>
      </div>

      {/* Jugadores */}
      <div className="bg-black text-white w-full p-3 rounded-md border border-black">
        <ul className="text-center font-bold tracking-wide">
          {jugadores.map((jugador, index) => (
            <li
              key={index}
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleJugadorEdit(e, index)}
              className="focus:outline-none"
            >
              {jugador}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TarjetaEquipo;