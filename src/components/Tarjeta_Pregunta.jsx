import React, { useEffect, useState } from 'react';


    export default function Tarjeta_Pregunta({pregunta}) {
    const [count, setCount] = useState(0)
    const [show, setShow] = useState(false);
    const [seleccion, setSeleccion] = useState(null);
    const responder = (respuesta) => {
        setSeleccion(respuesta);
    };

    useEffect(() => {
        setShow(true);
    }, []);


    return (
    // Tablero Madera
    <div className='h-screen w-full flex items-center justify-center min-h-screen' >
        {/* Fondo Verde */}
        <div className='h-full w-full flex items-center justify-center ' >
            {/* Tarjeta */}
            <section id='tarjeta' className={`bg-white flex flex-col h-[80%] w-[74%] rounded-lg border-black border-[4px] transition-all duration-[1500ms] ease-out transform ${ show ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}>
                <div id='titulo' className='w-full h-[106px] mt-7 bg-verdeOscuro flex items-center gap-[30%]'>
                    <h1 className='text-white text-7xl pl-20 font-secular [text-shadow:_2px_2px_4px_rgba(0,0,0,0.5)]'>{pregunta.categoria}</h1>
                    <img src="/public/assets/img/queso-color-blanco.png" className='w-[160px] pt-10' alt="" />
                </div>

                {/* Si no se ha seleccionado ninguna pregunta */}
                {!seleccion && (
                <div id='contenido-tarjeta' className='flex-1 w-full flex items-center justify-between font-lemon'>
                    {/*Pregunta*/}
                    <div id='pregunta' className='w-1/2 ml-14 flex flex-col items-center justify-center'>
                        <div id='marco-pregunta' className='p-7 h-[90%] w-[90%] border-gray-900 border-2 rounded-2xl items-center justify-center text-center'>
                            <h1 className="font-bold text-[50px] text-black leading-tight px-4">
                            {pregunta.pregunta}
                            </h1>
                        </div>
                        </div>
                    {/*Respuestas*/}
                    <div id='respuestas' className='w-1/2 flex flex-col items-center justify-center gap-4'>
                    {pregunta.respuestas.map((r, i) => (
                    <button
                        key={i}
                        onClick={() => responder(r)} // esto es si vas a manejar lógica
                        className="w-[75%] h-20 rounded-xl flex items-center gap-4 text-nowrap border-gray-900 border-2 bg-white pl-5 text-black text-2xl font-bold hover:bg-black hover:text-white transition-all"
                        >
                        <img className='w-[29.46px] h-[33.45px]' src="/assets/img/icono-queso.png" alt="" />
                        {r.texto}
                    </button>
                    ))}
                    
                    </div>
                </div>
                )}
                
                 {/* Si se ha seleccionado ninguna pregunta */}
                {seleccion && (
                <div id='contenido-tarjeta' className='flex-1 flex-col w-full flex items-center font-lemon p-10 gap-4'>
                    <div id='respuestas' className='w-full flex flex-col items-center justify-center gap-2'>
                    {pregunta.respuestas.map((r, i) => {
                        const esSeleccionada = seleccion === r;
                        const esCorrecta = r.correcta;

                        // Estilos condicionales:
                        let fondo = 'bg-white';
                        let borde = '';
                        let texto = 'text-black';
                        let explicacion = '';
                        let extra = '';

                        if (seleccion) {
                        if (esCorrecta) {
                            fondo = 'bg-black';
                            texto = 'text-white';
                            extra = 'flex-col gap-3'; // Para incluir explicación debajo
                        } else if (esSeleccionada) {
                            fondo = 'bg-red-700';
                            texto = 'text-white';
                        } else {
                            fondo = 'bg-white';
                            borde = 'border-gray-900 border-2';
                        }
                        }

                        return (
                        <div
                            key={i}
                            className={`w-[75%] h-auto rounded-xl flex items-start gap-2 text-wrap ${fondo} ${borde} pl-5 ${texto} text-2xl font-bold transition-all p-3 ${explicacion} text-1xl`}
                            onClick={() => !seleccion && responder(r)}
                        >
                            <img
                            className='w-[29.46px] h-[33.45px]'
                            src='/assets/img/icono-queso.png'
                            alt=''
                            />
                            <div className='flex flex-col gap-2'>
                            <span>{r.texto}</span>
                            {seleccion && esCorrecta && r.explicacion && (
                                <p className='text-base md:text-lg font-normal text-white text-left leading-relaxed break-words max-w-full'>
                                {r.explicacion}
                                </p>
                            )}
                            </div>
                        </div>
                        );
                    })}
                    <button className='w-72 rounded-md mt-3 p-2 border-2 border-gray-900 text-black text-2xl hover:bg-black hover:text-white' >SIGUIENTE RONDA</button>
                </div>
                </div>
                )}</section>
        </div>
    </div>
    )
 }

