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
                <div id='titulo' className='w-full h-[106px] mt-7 bg-verdeOscuro flex items-center gap-80'>
                    <h1 className='text-white text-7xl pl-20 font-secular [text-shadow:_2px_2px_4px_rgba(0,0,0,0.5)]'>GEOGRAFIA</h1>
                    <img src="/public/assets/img/queso-color-blanco.png" className='w-[160px] pt-10' alt="" />
                </div>
                <div id='contenido-tarjeta' className='flex-1 w-full flex justify-between font-lemon'>
                    {/*Pregunta*/}
                    <div id='pregunta' className='w-1/2 ml-14 flex flex-col items-center justify-center'>
                        <div id='marco-pregunta' className='p-7 h-[90%] w-[90%] bg-white bg-opacity-50 rounded-2xl items-center justify-center text-center'>
                            <h1 className="font-bold text-[46px] text-black text-opacity-90 leading-tight px-4">
                            ¿Qué país fue el primero en enviar un satélite al espacio?
                            </h1>
                        </div>
                        </div>
                    {/*Respuestas*/}
                    <div id='respuestas' className='w-1/2 flex flex-col items-center justify-center gap-4'>
                        <button className="w-[75%] h-20 rounded-xl flex items-center gap-4 text-nowrap bg-white pl-5 text-black text-2xl font-bold hover:bg-verdeOscuro hover:text-white transition-all"> <img className='w-[29.46px] h-[33.45px]' src="/public/assets/img/icono-queso.png" alt="" /> Estados Unidos </button>
                        <button className="w-[75%] h-20 rounded-xl flex items-center gap-4 text-nowrap bg-white pl-5 text-black text-2xl font-bold hover:bg-verdeOscuro hover:text-white transition-all"> <img className='w-[29.46px] h-[33.45px]' src="/public/assets/img/icono-queso.png" alt="" /> Unión Soviética </button>
                        <button className="w-[75%] h-20 rounded-xl flex items-center gap-4 text-nowrap bg-white pl-5 text-black text-2xl font-bold hover:bg-verdeOscuro hover:text-white transition-all"> <img className='w-[29.46px] h-[33.45px]' src="/public/assets/img/icono-queso.png" alt="" /> Alemania </button>
                        <button className="w-[75%] h-20 rounded-xl flex items-center gap-4 text-nowrap bg-white pl-5 text-black text-2xl font-bold hover:bg-verdeOscuro hover:text-white transition-all"> <img className='w-[29.46px] h-[33.45px]' src="/public/assets/img/icono-queso.png" alt="" /> China </button>
                    </div>
                </div>
            </section>
        </div>
    </div>
    )
 }

 export default Tarjeta_Pregunta