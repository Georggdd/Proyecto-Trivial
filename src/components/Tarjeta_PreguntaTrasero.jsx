import React, { useState } from 'react'

function Tarjeta_PreguntaTrasero() {
    const [count, setCount] = useState(0)

    return (
    // Tablero Madera
    <div className='h-full w-screen bg-tablero flex items-center justify-center min-h-screen' >
        {/* Fondo Verde */}
        <div className='bg-verdeClaro bg-opacity-70 flex items-center justify-center h-screen w-screen' >
            {/* Tarjeta */}
            <section id='tarjeta' className='bg-verdeClaro flex flex-col h-[90%] w-[74vw] rounded-lg border-black border-[4px]'>
                <div id='titulo' className='w-full h-[106px] mt-7 bg-verdeOscuro flex items-center gap-80'> 
                    <h1 className='text-white text-7xl pl-20 font-secular [text-shadow:_2px_2px_4px_rgba(0,0,0,0.5)]'>GEOGRAFIA</h1>
                    <img src="/public/assets/img/queso-color-blanco.png" className='w-[160px] pt-10' alt="" />
                </div>
                <div id='contenido-tarjeta' className='flex-1 flex-col w-full flex items-center font-lemon p-10 gap-4'>
                    <div id='respuestas' className='w-full flex flex-col items-center justify-center gap-2'>
                        <div className="w-[80%] px-5 py-4 rounded-xl flex items-center gap-4 text-nowrap bg-white pl-5 text-black text-2xl font-bold opacity-50"> <img className='w-[29.46px] h-[33.45px]' src="/public/assets/img/icono-queso.png" alt="" /> Estados Unidos </div>
                        <div className="w-[80%] px-5 py-4 rounded-xl flex flex-col gap-3 text-wrap bg-verdeOscuro pl-5 text-white"> 
                            <div className='flex justify-start gap-4'>
                                <img className='w-[29.46px] h-[33.45px]' src="/public/assets/img/icono-queso.png" alt="" /><h1 className='text-2xl font-bold'>Unión Soviética</h1>
                            </div>
                            <div>
                                <p className='text-xl text-left'>El 4 de octubre de 1957, la Unión Soviética fue el primer país en enviar un satélite al espacio. Este satélite se llamaba Sputnik 1 y marcó el inicio de la llamada Carrera Espacial entre la Unión Soviética y Estados Unidos.</p>
                            </div>
                                </div>
                        <div className="w-[80%] px-5 py-4 rounded-xl flex items-center gap-4 text-nowrap bg-white pl-5 text-black text-2xl font-bold opacity-50"> <img className='w-[29.46px] h-[33.45px]' src="/public/assets/img/icono-queso.png" alt="" /> Alemania </div>
                        <div className="w-[80%] px-5 py-4 rounded-xl flex items-center gap-4 text-nowrap bg-red-700 pl-5 text-white text-2xl font-bold"> <img className='w-[29.46px] h-[33.45px]' src="/public/assets/img/icono-queso.png" alt="" /> China </div>
                    </div>
                    <button className='w-72 rounded-md p-2 bg-white text-black text-2xl hover:bg-black hover:text-white' >SIGUIENTE RONDA</button>
                </div>
            </section>
        </div>
    </div>
    )
 }

 export default Tarjeta_PreguntaTrasero