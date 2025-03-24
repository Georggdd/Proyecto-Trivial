import React, { useState } from 'react'

function Tarjeta_Pregunta() {
    const [count, setCount] = useState(0)

    return (
    // Tablero Madera
    <div className='bg-tablero flex items-center justify-center min-h-screen' >
        {/* Fondo Verde */}
        <div className='bg-[#5B9642] bg-opacity-50 flex items-center justify-center 
        h-full w-full' >
            {/* Tarjeta */}
            <div className='bg-[#5B9642] flex items-center justify-center max-h-[82%] 
            max-w-[75%] rounded-lg border-black border-[4px]'>
                <h1 className="text-3xl font-bold underline">
                    Hola caracola
                </h1>
            </div>
        </div>
    </div>
    )
 }

 export default Tarjeta_Pregunta