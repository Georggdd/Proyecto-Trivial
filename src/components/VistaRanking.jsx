import React from "react";
import Ranking from "./Ranking";
const VistaRanking = () => { //creación de componente//

    return (
        <>


            {/* -----------------FONDO DE BANDERINES------------------- */}



            <img src="../assets/img/banderines.png"
                alt="banderines de fondo"
                className="absolute w-screen h-screen top-0 left-0 z-0 object-cover object-top"></img>

            {/* -----------------FONDO DIVIDIDO 2/3 + 1/3------------------- */}

            <div className=" absolute z-10 flex justify-center items-center w-full h-full" >
                {/* -----------------TABLERO RANKING 2/3 ------------------- */}
                <div className=" bg-tablero bg-center bg-cover h-[500px] w-2/3 bg-no-repeat mt-44 z-20">

                {/* NO CONSIGO PONER LA ALTURA EN PROPORCIÓN A LA IMAGEN SIN SABER EL TAMAÑO DE LA PIZARRA DONDE SE VISUALIZARÁ EL JUEGO */}
                   
                    <div className=" flex flex-col justify-center items-center w-full h-full">
                        {/* inset-0 */}
                        <h3 className="text-3xl font-personalizada font-bold text-morado z-20 mb-6 ">Ranking actualizado</h3>

                        <array className="flex flex-col justify-start items-center w-full space-y-4">
                            <div><Ranking></Ranking></div>

                        </array>

                    </div>
                </div>


                {/* -----------------AGRADECIMIENTO + DESCARGA  1/3------------------- */}
                <div className="flex justify-center items-center flex-col w-1/3 mt-44 m-3 gap-4">
                    <h7 className="font-personalizada text-6xl text-center">Gracias por participar</h7>
                    <img src="../assets/img/carpeta_descarga.png"
                        alt="Carpeta Descarga Profesores"
                        className=" w-1/2 h-auto " />

                </div>

            </div>




        </>
    );

}


export default VistaRanking;