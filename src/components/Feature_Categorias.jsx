import React, { useState } from "react"; //UseState permite cambiar entre estados (Ratón no encima-Ratón encima).

export default function Categorias({ texto }) {
  const [Flotar, setFlotar] = useState(false); //Definimos un estado "Flotar" que cambia cuando el ratón entra o sale del botón.
  // setFlotar es la función que permite actualizar el estado de Flotar.
  // useState devuelve un array con 2 valores (flotar y setFlotar). Se inicializa en false, es decir, el cursor no está encima del botón.

  return (
    //Las comillas invertidas permiten usar template literals (permite escribir en varias líneas
    <button // y cambiar clases dinámicamente en className con ${}). El operador ternario (? :) evalua la condición de Flotar:
      className={`${
        //condición ? expresión_si_verdadero : expresión_si_falso.
        Flotar
          ? "bg-morado text-white transform translate-y-[-2px] cursor-pointer" //True
          : "bg-beige text-black shadow-xl" //False
      } drop-shadow-2xl font-secular border-4 border-black py-3 px-6 rounded-lg font-bold text-xl uppercase transition-all duration-300 ease-in-out`} //Ambos
      onMouseEnter={() => setFlotar(true)}
      onMouseLeave={() => setFlotar(false)}
    >
      <span //La etiqueta de span para aplicar el estilo solamente al texto porque si lo pongo arriba se aplica al botón.
        className={`${
          Flotar
            ? "text-white text-shadow text-border transition-all duration-300 ease-in-out" // Sombra y borde suaves
            : ""
        }`}
      >
        {texto}
      </span>
    </button>
  );
}
