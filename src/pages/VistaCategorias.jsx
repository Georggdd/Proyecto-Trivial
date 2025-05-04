import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 👈 Importa el hook de navegación
import Header from "../components/Header";
import Feature_Categorias from "../components/Feature_Categorias";
import Customizar from "../components/Customizar";
import { useLocation } from "react-router-dom";

export default function VistaCategorias() {
  const navigate = useNavigate(); // 👈 Inicializa el hook

  const location = useLocation();
  const [Menu, setMenu] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(location.state?.categoriaSeleccionada || null);
  const [selectedFile, setSelectedFile] = useState(location.state?.selectedFile || null);
  const equiposHechosInicial = location.state?.equiposConfigurados || false;
  const [equiposHechos, setEquiposHechos] = useState(equiposHechosInicial);

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
      className="h-full w-full relative flex flex-col min-h-screen bg-[url('/assets/img/Mesa.svg')] bg-cover border-4 border-double border-orange-600 bg-transparent"
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

      {/* Contenedor centrado de profesor + botones */}
      <div className={`flex flex-1 justify-center items-center z-20 transition-all duration-300 ${Menu ? "opacity-30" : "opacity-100"}`}>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-12">

          {/* Imagen del profesor */}
          <img
            src="/assets/img/profesor.jpg"
            alt="Profesor"
            className={`w-[300px] h-auto object-contain transition-opacity duration-300 ${Menu ? "opacity-40" : "opacity-70"}`}
          />

          {/* Botones */}
          <div className="flex flex-col items-center justify-center gap-6">
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

            <Customizar setSelectedFile={setSelectedFile} />
            {selectedFile && (
              <p className="text-white text-lg mt-2 font-semibold">
                Archivo seleccionado:{" "}
                <span className="underline">{selectedFile.name}</span>
              </p>
            )}

            {/* 🔗 Botón "Equipos" que redirige */}
            <Feature_Categorias
              texto="Equipos"
              className="w-[400px] h-[100px] text-3xl"
              onClick={() =>
                navigate("/TarjetaEquipo", {
                  state: {
                    categoriaSeleccionada,
                    selectedFile,
                  },
                })
              }
            />

            <Feature_Categorias
              texto="Empezar juego"
              onClick={() => navigate("/tablero")}
              className={`w-[400px] h-[100px] text-3xl ${puedeIniciar ? "" : "pointer-events-none opacity-40 cursor-not-allowed"
                }`}
            />

            {selectedFile && (
              <p className="text-white mt-2">
                Archivo seleccionado: {selectedFile.name}
              </p>
            )}
          </div>
        </div>
      </div>

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
                className="sm:w-[300px] h-[60px] text-2xl border-4 border-morado hover:border-black"
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
    </div>
  );
}