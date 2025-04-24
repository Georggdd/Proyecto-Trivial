import React, { useState } from "react";
import Header from "../components/Header";
import Feature_Categorias from "../components/Feature_Categorias";
import Customizar from "../components/Customizar";

export default function VistaCategorias({ onUpload, preguntas, error }) {
  const [Menu, setMenu] = useState(false); //Controla si el menú de las subcategorías esta visible o no.
  const [selectedFile, setSelectedFile] = useState(null); //Almacena el archivo seleccionado en "customizar"si sube alguno.
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [equiposHechos, setEquiposHechos] = useState(false);

  const subcategorias = [
    "Idiomas",
    "Música",
    "Matemáticas",
    "Biología",
    "Geografía",
    "Lengua",
  ];

  const SubcategoriaSelect = (subcategoria) => {
    setCategoriaSeleccionada(subcategoria);
    setMenu(false); //Se ejecuta cuando el usuario selecciona una categoría y pone el Menu en falso.
    setSelectedFile(null);
  };

  const FileChange = (event) => {
    if (event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      setCategoriaSeleccionada(null);
    } //Controla cuando un archivo es seleccionado mediante un input de tipo archivo
  }; /* event.target.files es un array con los archivos seleccionados.
        event.target.files.length > 0 comprueba si hay al menos un archivo.
        setSelectedFile(event.target.files[0]) guarda el primer archivo.*/

  const ClickOutside = (event) => {
    if (Menu && !event.target.closest(".subcategorias-menu")) {
      setMenu(false); //Detecta si el usuario hace click fuera del área del menú subcategorías y lo cierra.
    } //event.target.closest(".subcategorias-menu") verifica si el click se hizo dentro del menú de subcategorías.
  }; // Si el click es fuera del menú, cierra el menú (setMenu(false)).

  // Reglas para activar el botón START
  const puedeIniciar = equiposHechos && (selectedFile || categoriaSeleccionada);

  return (
    <div
      className="h-full w-full relative flex flex-col min-h-screen bg-[url('/assets/img/Mesa.svg')] bg-cover border-4 border-double border-orange-600 bg-transparent overflow-hidden"
      onClick={ClickOutside} //Cerrar el menú si se hace click fuera de el.
    >
      {/* Contenedor del Header con efecto de oscurecimiento */}
      <div
        className={`relative z-10 border-b-4 border-orange-600 border-double transition-all duration-300 ${Menu ? "opacity-60" : "opacity-100"}`}
      >
        <Header />
      </div>
      {/*Las comillas invertidas permiten interpolar variables dinámicas dentro de una cadena de texto usando ${}.
      El símbolo ${} se usa para insertar una expresión de JavaScript en la cadena de texto. 
      El uso de JS se ve en el operador ternario: (condición ? valor_si_true : valor_si_false)
      z-10 hace referencia a la superposición de elementos. Cuanto mayor índice z, mayor prioridad.
       ${Menu ? "opacity-30" : "opacity-100"}`}:Cuando el menú está abierto crea un efecto de oscurecimiento sobre todos los elementos y cuando no, se ve normal.*/}

      {/* Contenedor de los botones principales con efecto de oscurecimiento */}
      <div
        className={`absolute top-[28%] left-[35%] flex flex-col items-center justify-center flex-1 gap-6 mt-50 z-20 transition-all duration-300 ${Menu ? "opacity-30" : "opacity-100"}`}
      >
        <Feature_Categorias
          texto={categoriaSeleccionada ? categoriaSeleccionada : "Categorías"} // Cambia el texto del botón según la subcategoría seleccionada
          onClick={() => {
            setMenu(!Menu);
            if (categoriaSeleccionada) {
              setCategoriaSeleccionada(null); // Si se ha seleccionado una subcategoría, la quita al pulsar el botón de nuevo
            }
            setSelectedFile(null); // Si selecciona categoría, se borra el archivo
          }}
          className="w-[400px] h-[100px] text-3xl"
        />
        {/*setMenu(!Menu) cambia el estado de Menu invirtiendo su valor actual. No se puede usar true o false porque con true siempre estaría bierto y con false nunca se abriría.
          La posición se calcula usando porcentajes y se posicionan tomando como referencia el contenedor padre que debe estar en "relative" y los hijos en "absolute".*/}

        <Customizar
          setSelectedFile={setSelectedFile}
          selectedFile={selectedFile}
          onUpload={onUpload}
        />

        <Feature_Categorias
          texto="Equipos"
          className="w-[400px] h-[100px] text-3xl"
        />

        <Feature_Categorias
          texto="START"
          className={`w-[400px] h-[100px] text-3xl ${puedeIniciar ? "cursor-pointer" : "bg-orange-600 cursor-not-allowed"}`}
        />

        {selectedFile && (
          <p className="text-white mt-2">
            Archivo seleccionado: {selectedFile.name}
          </p>
        )}
      </div>
      {/*Si selectedFile tiene un valor (el usuario sube un archivo, el <p> mostrará su nombre.{selectedFile.name} obtiene el nombre del archivo.
        Si selectedFile es null no se muestra nada.*/}

      {/* Menú con subcategorías */}
      {/*Solo se muestra si Menu es true*/}
      {Menu && (
        <div className="absolute z-20 flex flex-col right-[30%] top-[20%] subcategorias-menu">
          <div className="p-6 rounded-lg shadow-lg flex flex-col gap-2 bg-transparent">
            {subcategorias.map((subcategoria) => (
              <Feature_Categorias
                key={subcategoria}
                texto={subcategoria}
                onClick={() => SubcategoriaSelect(subcategoria)}
                className="sm:w-[300px] h-[60px] text-2xl border-2 border-morado hover:border-black"
              />
            ))}
          </div>
        </div>
      )}
      {/*absolute z-20: da prioridad sobre los demás elementos.
       subcategorias es un array con los nombres.
       .map() recorre cada elemento y crea un componente botoón de cada uno con:
       key={subcategoria}:clave única por cada elemento.
       texto={subcategoria}: texto del botón.
       onClick={() => SubcategoriaSelect(subcategoria)}: llama a SubcategoriaSelect() al hacer click y cierra el menú.*/}

      {/* Contenedor adicional con foto del profesor y opacidad */}
      <div
        className={`absolute z-10 left-[4%] top-[32%] w-[500px] h-[400px] bg-[url('/assets/img/profesor.jpg')] bg-cover bg-center transition-opacity duration-300 ${Menu ? "opacity-40" : "opacity-70"}`}
      ></div>
      {/*absolute: permite colocar el elemento en una posición exacta sin afectar a otros elementos .Si fuese relative se comportaría como un bloque normal y empujaría otros elementos en la página.*/}
    </div>
  );
}
