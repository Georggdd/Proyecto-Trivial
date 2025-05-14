import React, { useEffect, useState } from 'react';
import CaraDelantera from './CaraDelantera';
import CaraTrasera from './CaraTrasera';

export default function TarjetaPregunta({ categoria }) {
  const [pregunta, setPregunta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [equipoActual, setEquipoActual] = useState(0);
  const [respuestasEquipos, setRespuestasEquipos] = useState(Array(6).fill(null));
  const [respuestasCompletadas, setRespuestasCompletadas] = useState(false);

  const responder = (respuesta) => {
    const nuevasRespuestas = [...respuestasEquipos];
    nuevasRespuestas[equipoActual] = respuesta;
    setRespuestasEquipos(nuevasRespuestas);

    if (equipoActual < 5) {
      setEquipoActual(equipoActual + 1);
    } else {
      setRespuestasCompletadas(true);
    }
  };

  const siguienteRonda = () => {
    setEquipoActual(0);
    setRespuestasEquipos(Array(6).fill(null));
    setRespuestasCompletadas(false);
    setPregunta(null);
    setLoading(true);
  };

  useEffect(() => {
    fetch(`http://localhost:3000/api/preguntas/${encodeURIComponent(categoria)}`)
      .then((res) => {
        if (!res.ok) throw new Error('Error al cargar preguntas');
        return res.json();
      })
      .then((data) => {
        const preguntaRandom = data[Math.floor(Math.random() * data.length)];
        const preguntaFormato = {
          categoria: preguntaRandom.categoria.nombre,
          pregunta: preguntaRandom.texto,
          respuestas: preguntaRandom.respuestas.map((r) => ({
            texto: r.texto,
            correcta: r.esCorrecta,
            explicacion: r.explicacion,
          })),
        };
        setPregunta(preguntaFormato);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [categoria]);

  if (loading) return <p className='text-center mt-10 text-xl'>Cargando pregunta...</p>;
  if (!pregunta) return <p className='text-center mt-10 text-xl'>No hay preguntas disponibles para esta categoría.</p>;

  return (
    <div className='h-full w-full flex items-center justify-center perspective'>
      <div className='h-[70%] w-full flex items-center justify-center'>
        <section
          id="tarjeta"
          className={'bg-white flex flex-col h-full w-[65%] rounded-lg border-black border-[4px] 2xl:w-[70%] transition-all duration-[1000ms] ease-out transform transform-style-preserve-3d ${respuestasCompletadas ? "rotate-y-180" : " "}'}
        >
          <div id='titulo' className='w-full h-[19%] relative mt-6 bg-verdeOscuro flex items-center 2xl:gap-[30%] transform'>
            <h1 className='text-white text-7xl pt-3 pl-16 font-secular 2xl:text-8xl 2xl:pl-24 [text-shadow:_2px_2px_4px_rgba(0,0,0,0.5)]'>{pregunta.categoria}</h1>
            <img src="/assets/img/queso-color-blanco.png" className='w-[15%] pt-6 absolute right-[15%]' alt='' />
          </div>

          {!respuestasCompletadas ? (
            <CaraDelantera
              pregunta={pregunta}
              equipoActual={equipoActual}
              respuestasEquipos={respuestasEquipos}
              onResponder={responder}
            />
          ) : (
            <CaraTrasera
              pregunta={pregunta}
              respuestasEquipos={respuestasEquipos}
              onSiguienteRonda={siguienteRonda}
            />
          )}
        </section>
      </div>
    </div>
  );
}
