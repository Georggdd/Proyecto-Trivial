import React from "react";
import Header from "../components/Header";
import Ranking from "../components/Ranking";
// import PruebaRanking from "../components/PruebaRanking";
// cambié el nombre del componente a prueba con MAYUSCULA, PERO NO  lo reconoce
// import PruebaFormulario from "../components/PruebaFormulario";


const VistaRanking = ({ equipo }) => { //accedo a los elementos de equipo del archivo PadreRanking.jsx
    //recibe propiedades de padreRanking
    // Validamos que `equipo` es un array antes de hacer .map()
    if (!Array.isArray(equipo)) {
        return <div>Cargando...</div>; // O algún otro mensaje mientras no se tenga el array
    }
    //según el número de equipos tendrá un gap u otro
    const numequipo = equipo.length < 5 ? "gap-6" : "gap-1";

    //ordenación según la puntuación 
    const ordenEquipo = [...equipo].sort((a, b) => b.puntos - a.puntos);

    //en caso de que se produzcan empates, le daremos efecto visual

    const mismapuntuacion = equipo //para darle efecto cuando coincida la puntuación entre equipos
        .map(e => e.puntos)
        .filter((valor, i, arr) => arr.indexOf(valor) !== i);


    return (

        <div>
            <Header />

            {/* {imagenes de fondo (banderines y pizarra)} */}
            <div className="relative">
                <img
                    src="../assets/img/banderines.png"
                    alt="banderines de fondo"
                    className="absolute w-screen top-0 left-0 z-20 object-cover"></img>
                <img
                    src="../assets/img/mesa_madera.jpg"
                    alt="mesa de madera de fondo"
                    className="absolute w-screen top-0 left-0 z-10 object-cover"></img>
            </div>

            <div className="w-screen">

                {/* -----------------FONDO DIVIDIDO 2/3 + 1/3------------------- */}
                <div className=" flex mt-[30vh] p-[6vh]" >

                    {/* -----------------TABLERO  2/3 ------------------- */}
                    <div className="w-2/3 relative  ">
                        {/* relative para posicionar el texto dentro */}
                        <img src="../assets/img/tablero_base.png" className=" w-full h-auto z-30 relative" alt="Tablero mesa"></img>
                        {/* <div className="flex flex-col justify-center items-center"> */}
                        {/* inset-0 */}
                        {/* <div className="absolute top-0 left-0 w-full z-40 grid place-items-center my-10">

                            <Ranking className="h-[1-5 parte del espacio]"/>
                            <Ranking />
                            <Ranking />
                            <Ranking />
                            <Ranking /> */}

                        <div className={`absolute top-0 left-0 w-full h-full z-40 flex flex-col alineacion pb-[11vw] pr-[5vw] pl-[3vw] pt-[10vw] ${numequipo}`}>
                            {ordenEquipo.map((x, y) => { //mapeamos los datos de importados
                                const destacar = mismapuntuacion.includes(x.puntos);
                                return(
                          <Ranking key={y} nombre={x.nombre} puntos={x.puntos} destacado={destacar} />
                            );
                            })}
                        
                        </div>
                    </div>  
                

                    {/* -----------------AGRADECIMIENTO + DESCARGA  1/3------------------- */}
                    <div className="flex flex-col w-1/3 z-40 p-8">

                        {/* -----------------AGRADECIMIENTO ------------------- */}
                        <div className="h-1/2 flex justify-center items-center">
                            <h7 className="text-[5vw] text-center text-naranja font-personalizada font-bold">Gracias por participar
                            </h7>
                        </div>

                        {/* -----------------descarga, carpeta y enlace------------------- */}
                        <div className="h-1/2 flex justify-end items-end">
                            <div className="w-2/3">
                                <p className="text-[3vw] text-naranja font-personalizada font-bold">
                                    Descarga de resultados:
                                </p>
                            </div>

                            <div>
                                <a href="../assets/docs/Preguntas-Trivial-BBDD.xlsx"
                                    download="Preguntas-Trivial-BBDD.xlsx"
                                    className="text-white text-3xl font-semibold cursor-pointer transition-transform duration-200 hover:scale-110 hover:text-4xl">
                                    <img src="../assets/img/carpeta_descarga_naranja.png"
                                        alt="Carpeta Descarga Profesores"
                                        className=""
                                    />
                                    <p className="-mt-9 text-center font-personalizada">
                                        aquí
                                    </p>
                                </a>

                            </div>

                        </div>
                    </div>
                </div>

            </div >
        </div >

    );

};


export default VistaRanking;