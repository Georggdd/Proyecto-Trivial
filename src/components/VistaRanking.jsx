import React from "react";
import Ranking from "./Ranking";
const VistaRanking = () => { //creación de componente//

    return (
        <div className="w-full h-full">
            {/* -----------------FONDO PIZARRA------------------- */}
            <div className="bg-pizarra absolute w-screen h-screen top-0 left-0 z-10 object-cover"></div>
            {/* <img src="../assets/img/pizarra.png"
                alt="pizarra de fondo"
                className="absolute w-screen h-screen top-0 left-0 z-0 object-cover"></img> */}

            {/* -----------------FONDO DE BANDERINES------------------- */}

            <img src="../assets/img/banderines.png"
                alt="banderines de fondo"
                className="absolute w-screen h-screen top-0 left-0 z-20 object-cover"></img>

            {/* -----------------FONDO DIVIDIDO 2/3 + 1/3------------------- */}
            <div className=" flex mt-60 p-6 z-30 " >

                {/* -----------------TABLERO  2/3 ------------------- */}
                <div className="w-2/3 z-30 relative">
                    {/* relative para posicionar el texto dentro */}
                    <img src="../assets/img/tablero_base.png" className="relative w-full h-auto m-10" alt="Tablero mesa"></img>
                    {/* <div className="flex flex-col justify-center items-center"> */}
                    {/* inset-0 */}
                    <div className="flex flex-col w-2/3">
                        <h3 className=" text-3xl font-personalizada font-bold text-morado w-full space-y-4 content-center">Ranking actualizado</h3>
                        <div className="w-2/3 ">
                            <Ranking></Ranking>
                            <Ranking></Ranking>

                        </div>

                    </div>
                </div>

                {/* -----------------AGRADECIMIENTO + DESCARGA  1/3------------------- */}
                <div className="flex justify-center items-center flex-col w-1/3 relative z-40 gap-6">
                    <h7 className="text-6xl text-center text-morado font-personalizada font-bold">Gracias por participar</h7>
                    <img src="../assets/img/carpeta_descarga.png"
                        alt="Carpeta Descarga Profesores"
                        className="" />

                </div>
            </div>






        </div>
    );

};


export default VistaRanking;