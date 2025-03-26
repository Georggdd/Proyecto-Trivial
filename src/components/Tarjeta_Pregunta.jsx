import React, { useState } from 'react'

function Tarjeta_Pregunta() {
    const [count, setCount] = useState(0)

    return (
    // Tablero Madera
    <div className='h-screen w-screen bg-tablero flex items-center justify-center min-h-screen' >
        {/* Fondo Verde */}
        <div className='bg-verdeClaro bg-opacity-70 flex items-center justify-center h-screen w-screen' >
            {/* Tarjeta */}
            <section id='tarjeta' className='bg-verdeClaro flex flex-col h-[80vh] w-[74vw] rounded-lg border-black border-[4px]'>
                <div id='titulo' className='w-full h-[106px] mt-7 bg-verdeOscuro flex items-center'>
                    <h1 className='text-white text-7xl pl-20 font-secular'>GEOGRAFIA</h1>
                </div>
                <div id='contenido-tarjeta' className='flex-1 w-full flex justify-between'>
                    <div id='pregunta' className='w-1/2 ml-16 flex flex-col items-center justify-center'>
                        <div id='marco-pregunta' className='p-4 bg-white bg-opacity-50 rounded-2xl items-center justify-center'>
                            <h1 className="font-bold text-[57px] text-center text-black leading-tight px-4 font-lemon">
                            ¿Qué país fue el primero en enviar un satélite al espacio?
                            </h1>
                        </div>
                        </div>    
                    <div id='respuestas' className='w-1/2 flex flex-col items-center justify-center font-lemon'>
                        <h1 className="bg-white py-2 pt-1 text-black text-3xl font-bold"> Estados Unidos </h1>
                        <h1 className="bg-white py-2 pt-1 text-black text-3xl font-bold"> Unión Soviética </h1>
                        <h1 className="bg-white py-2 pt-1 text-black text-3xl font-bold"> Alemania </h1>
                        <h1 className="bg-white py-2 pt-1 text-black text-3xl font-bold"> China </h1>
                    </div>
                </div>
            </section>
        </div>
    </div>
    )
 }

 export default Tarjeta_Pregunta