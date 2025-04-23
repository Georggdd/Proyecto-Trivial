import React, { useState, useRef } from "react";
import { Switch } from "@headlessui/react";

function TarjetaEquipo() {
  const [enabled, setEnabled] = useState(false);
  {/*Variable que comprueba el estado de la imagen guardada*/}
  const [imagenPerfil, setImagenPerfil] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUploadClick = () => {
    fileInputRef.current.click();
  };

  {/*Aquí se declara una variable para que guarde una imagen de equipo al seleccionar del explorador, sustituyéndola por el icono de usuario*/}
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagenPerfil(imageUrl);
    }
  };

  return (
    <div className="w-48 bg-gray-500 rounded-2xl shadow-lg p-4 flex flex-col items-center border border-moraito">
      {/*Contenedor del icono o imagen de usuario*/}
      <div className="relative w-16 h-16 flex items-center justify-center bg-gray-200 rounded-full mb-2 overflow-hidden">
        {imagenPerfil ? (
          <img src={imagenPerfil} alt="Perfil" className="w-full h-full object-cover" />
        ) : (
          <div className="absolute w-12 h-12 flex items-center justify-center opacity-50 z-10">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        )}

        {/*Botón para subir imagen*/}
        <button
          onClick={handleImageUploadClick}
          className="absolute -bottom-1 -right-1 bg-black text-white rounded-full p-1 z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 002.828 2.828L18 10.828m0 0L20.828 13M18 10.828V21" />
          </svg>
        </button>

        {/*Input oculto para elegir imagen*/}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleImageChange}
        />
      </div>

      {/*Nombre del equipo y Switch*/}
      <div className="flex items-center gap-2 mb-2">
        <span className="italic font-semibold">Equipo 1</span>
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className={`${enabled ? "bg-blue-500" : "bg-white"} relative inline-flex h-5 w-10 items-center rounded-full`}
        >
          <span
            className={`${enabled ? "translate-x-5" : "translate-x-0"} inline-block h-4 w-4 transform bg-white rounded-full transition`}
          />
        </Switch>
      </div>

      {/*Lista de jugadores*/}
      <div className="bg-black text-white w-full rounded-lg p-2 text-sm">
        <ul className="text-center">
          <li>JUGADOR 1</li>
          <li>JUGADOR 2</li>
          <li>JUGADOR 3</li>
          <li>JUGADOR 4</li>
          <li>JUGADOR 5</li>
        </ul>
      </div>
    </div>
  );
}

export default TarjetaEquipo;
{/*Cambios para subir a segunda rama*/}