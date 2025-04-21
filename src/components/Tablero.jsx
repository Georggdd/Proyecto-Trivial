import ZonaInferior from './ZonaInferior';
import Ficha from './Ficha';
import Mesa from '../assets/Mesa.svg';
import Header from './Header';
import { useJuegoStore } from '../hooks/useJuegoStore';
import { casillas } from '../components/Posiciones/tableroData'; // o la ruta correcta según tu estructura


function Tablero() {

  const fichaPos = useJuegoStore((state) => state.fichaPos);
  const setValorDado = useJuegoStore((state) => state.setValorDado);
  const { casillasActivas, moverFicha } = useJuegoStore();
  const debug = true;
  return (



    <div className="flex flex-col min-h-screen w-full pt-32"
      style={{
        backgroundImage: `url(${Mesa})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Header />
      {/* Contenedor Tablero */}
      <div className="flex-grow flex items-center justify-center relative pb-10">
        <div className="relative aspect-square w-[90%] max-w-[700px]">
          {/* Fondo del tablero */}
          <img
            src="/assets/img/Tablero-Trivial.jpeg"
            alt="Tablero"
            className="absolute w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-contain z-0" />
          {casillasActivas.map((numero) => {
            const pos = casillas.find(c => c.id === numero);
            if (!pos) return null;

            return (
              <div
                key={numero}
                className="absolute z-30 w-[8%] h-[8%] flex items-center justify-center cursor-pointer"
                style={{
                  top: `${pos.top}%`,
                  left: `${pos.left}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                onClick={() => moverFicha(numero)}
              >
                <div className="w-[50%] h-[50%] rounded-full bg-white bg-opacity-80 border-4 border-white shadow-[0_0_15px_4px_#7e22ce] animate-pulse pointer-events-none" />
              </div>
            );
          })}



          {/* Descomenta esto para ajustar movimiento y casillas */}
          {/*{(debug ? casillas : casillasActivas).map(({ id, top, left }) => (
            <div
              key={id}
              className={`absolute w-[7%] h-[7%] rounded-full z-30 cursor-pointer transition-all duration-300 ${casillasActivas.includes(id)
                  ? 'border-4 border-yellow-400 animate-pulse'
                  : debug
                    ? 'border border-blue-400 bg-blue-300 bg-opacity-20'
                    : ''
                }`}
              style={{
                top: `${top}%`,
                left: `${left}%`,
                transform: 'translate(-50%, -50%)',
              }}
              onClick={() => moverFicha(id)}
            />
          ))}*/}

          <Ficha position={fichaPos} />
        </div>
      </div>
      <ZonaInferior onDadoResultado={setValorDado} />
    </div>


  );


}

export default Tablero;


