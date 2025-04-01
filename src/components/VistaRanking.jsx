import React from "react";
const VistaRanking = () => { //creación de componente//

    return (
        <>


            {/* -----------------FONDO DE BANDERINES------------------- */}
            <img src="../assets/img/banderines.png" alt="banderines de fondo" className="absolute h-screen w-full z-0"></img>

            {/* -----------------FONDO DIVIDIDO 2/3 + 1/3------------------- */}
           
                <div className="absolute z-10 flex w-full h-full" >
                    {/* -----------------TABLERO RANKING 2/3 ------------------- */}
                    <div className="flex justify-center items-center bg-tablero w-2/3 bg-no-repeat bg-contain mt-44">
                        <div className="bg-slate-500 ">
                            <h3 className="text-3xl font-personalizada font-bold text-morado">Ranking actualizado</h3>
                            <array>Componente</array>
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