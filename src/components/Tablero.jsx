import * as Casillas from '/src/components/casillas';

const Casilla = ({ numero }) => {
    const CasillaComponent = Casillas[`Casilla${numero}`];
    return CasillaComponent ? <CasillaComponent /> : null;
  };


function Tablero() {
    return (
      <div className="relative w-full h-screen">
        {/* Contenedor Tablero */}
        <div className='absolute aspect-square w-[40%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        {/* Fondo del tablero */}
        <img
          src="/assets/img/fondo-tablero2.png"
          alt="Tablero"
          className="absolute w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-contain z-0" />




        {/* Casilla central */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[23%] z-20"> <Casilla numero={0} /> </div>

        {/* Resto de casillas */}
        <div className="absolute top-[44.5%] right-[32%] w-[8.5%] -translate-x-1/2 -translate-y-1/2 z-10"> <Casilla numero={1} /> </div>
        <div className="absolute top-[41.5%] right-[27%] w-[8.5%] -translate-x-1/2 -translate-y-1/2 z-10"> <Casilla numero={2} /> </div>
        <div className="absolute top-[38.5%] right-[22%] w-[8.5%] -translate-x-1/2 -translate-y-1/2 z-10"> <Casilla numero={3}/> </div>
        <div className="absolute top-[35.5%] right-[17%] w-[8.5%] -translate-x-1/2 -translate-y-1/2 z-10"> <Casilla numero={4} /> </div>
        <div className="absolute top-[32.5%] right-[11.8%] w-[8.5%] -translate-x-1/2 -translate-y-1/2 z-10"> <Casilla numero={5} /> </div>

        {/* */}

        <div className="absolute bottom-[34.5%] right-[32%] w-[8.5%] -translate-x-1/2 -translate-y-1/2 z-10"> <Casilla numero={6} /> </div>
        <div className="absolute bottom-[31.5%] right-[27.1%] w-[8.5%] -translate-x-1/2 -translate-y-1/2 z-10"> <Casilla numero={7} /> </div>
        <div className="absolute bottom-[28.7%] right-[22%] w-[8.5%] -translate-x-1/2 -translate-y-1/2 z-10"> <Casilla numero={8}/> </div>
        <div className="absolute bottom-[25.5%] right-[17%] w-[8.5%] -translate-x-1/2 -translate-y-1/2 z-10"> <Casilla numero={9} /> </div>
        <div className="absolute bottom-[23%] right-[11.8%] w-[8.5%] -translate-x-1/2 -translate-y-1/2 z-10"> <Casilla numero={10} /> </div>
        {/* */}
        
        <div className="absolute bottom-[33%] left-1/2 w-[9%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={11} /></div>
        <div className="absolute bottom-[27.5%] left-1/2 w-[9%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={12} /></div>
        <div className="absolute bottom-[22%] left-1/2 w-[9%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={13} /></div>
        <div className="absolute bottom-[16.5%] left-1/2 w-[9%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={14} /></div>
        <div className="absolute bottom-[10.5%] left-1/2 w-[9%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={15} /></div>

        {/* */}
        
        <div className="absolute bottom-[35.5%] left-[41%] w-[8.5%] -translate-x-1/2 -translate-y-1/2 z-10"> <Casilla numero={16} /> </div>
        <div className="absolute bottom-[32.5%] left-[36%] w-[8.5%] -translate-x-1/2 -translate-y-1/2 z-10"> <Casilla numero={17} /> </div>
        <div className="absolute bottom-[29.7%] left-[31%] w-[8.5%] -translate-x-1/2 -translate-y-1/2 z-10"> <Casilla numero={18}/> </div>
        <div className="absolute bottom-[26.5%] left-[26%] w-[8.5%] -translate-x-1/2 -translate-y-1/2 z-10"> <Casilla numero={19} /> </div>
        <div className="absolute bottom-[24%] left-[21%] w-[8.5%] -translate-x-1/2 -translate-y-1/2 z-10"> <Casilla numero={20} /> </div>

        {/* */}
        
        <div className="absolute top-[44.5%] left-[41%] w-[8.5%] -translate-x-1/2 -translate-y-1/2 z-10"> <Casilla numero={21} /> </div>
        <div className="absolute top-[41.5%] left-[36%] w-[8.5%] -translate-x-1/2 -translate-y-1/2 z-10"> <Casilla numero={22} /> </div>
        <div className="absolute top-[38.5%] left-[31%] w-[8.5%] -translate-x-1/2 -translate-y-1/2 z-10"> <Casilla numero={23}/> </div>
        <div className="absolute top-[35.5%] left-[26%] w-[8.5%] -translate-x-1/2 -translate-y-1/2 z-10"> <Casilla numero={24} /> </div>
        <div className="absolute top-[32.5%] left-[21%] w-[8.5%] -translate-x-1/2 -translate-y-1/2 z-10"> <Casilla numero={25} /> </div>
        {/* */}
        
        <div className="absolute top-[39%] left-1/2 w-[9%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={26} /></div>
        <div className="absolute top-[33.5%] left-1/2 w-[9%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={27} /></div>
        <div className="absolute top-[27.7%] left-1/2 w-[9%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={28} /></div>
        <div className="absolute top-[22%] left-1/2 w-[9%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={29} /></div>
        <div className="absolute top-[16%] left-1/2 w-[9%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={30} /></div>

        {/* 
        <div className="absolute top-[9.5%] left-1/2 w-[9%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={31} /></div>
        <div className="absolute top-[14.4%] left-[52.4%] w-[9%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={32} /></div>
        <div className="absolute top-[15.4%] left-[54.2%] w-[10%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={33} /></div>
        <div className="absolute top-[17%] left-[56.3%] w-[10%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={34} /></div>
        <div className="absolute top-[19.2%] left-[58.3%] w-[10%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={35} /></div>
        <div className="absolute top-[21.5%] left-[59.9%] w-[10%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={36} /></div>
        <div className="absolute top-[24.5%] left-[61.5%] w-[10%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={37} /></div>

        

        <div className="absolute top-[29.5%] left-[63.7%] w-[10%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={38} /></div>
        <div className="absolute bottom-[58%] left-[65.4%] w-[10%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={39} /></div>
        <div className="absolute bottom-[54%] left-[66%] w-[10%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={40} /></div>
        <div className="absolute bottom-[50%] left-[66.3%] w-[10%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={41} /></div>
        <div className="absolute bottom-[45.5%] left-[66.3%] w-[10%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={42} /></div>
        <div className="absolute bottom-[41%] left-[66%] w-[10%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={43} /></div>
        <div className="absolute bottom-[36.5%] left-[65.3%] w-[10%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={44} /></div>
        
        -

        <div className="absolute bottom-[29.5%] left-[63.5%] w-[10%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={45} /></div>
        <div className="absolute bottom-[25%] left-[61.5%] w-[10%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={46} /></div>
        <div className="absolute bottom-[21.8%] left-[59.9%] w-[10%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={47} /></div>
        <div className="absolute bottom-[19.2%] left-[58.3%] w-[10%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={48} /></div>
        <div className="absolute bottom-[17%] left-[56.3%] w-[10%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={49} /></div>
        <div className="absolute bottom-[15.4%] left-[54.2%] w-[10%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={50} /></div>
        <div className="absolute bottom-[14%] left-[52.4%] w-[10%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={51} /></div>
        
       -
        <div className="absolute bottom-[3%] left-1/2 w-[9%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={52} /></div>
        <div className="absolute bottom-[14.7%] right-[52.4%] w-[10%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={53} /></div>
        <div className="absolute bottom-[15.8%] right-[54.2%] w-[10%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={54} /></div>
        <div className="absolute bottom-[17.5%] right-[56.3%] w-[10%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={55} /></div>
        <div className="absolute bottom-[19.5%] right-[58.3%] w-[10%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={56} /></div>
        <div className="absolute bottom-[22%] right-[59.9%] w-[10%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={57} /></div>
        <div className="absolute bottom-[25%] right-[61.5%] w-[10%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={58} /></div>

       -

        <div className="absolute bottom-[30%] right-[63.7%] w-[10%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={59} /></div>
        <div className="absolute bottom-[36.5%] right-[65.3%] w-[10%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={60} /></div>
        <div className="absolute bottom-[41%] right-[66%] w-[10%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={61} /></div>
        <div className="absolute bottom-[45.5%] right-[66.3%] w-[10%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={62} /></div>
        <div className="absolute bottom-[50%] right-[66.3%] w-[10%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={63} /></div>
        <div className="absolute bottom-[54%] right-[66%] w-[10%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={64} /></div>
        <div className="absolute bottom-[58%] right-[65.4%] w-[10%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={65} /></div>

       -

        <div className="absolute top-[29%] right-[63.5%] w-[10%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={66} /></div>
        <div className="absolute top-[25%] right-[61.5%] w-[10%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={67} /></div>
        <div className="absolute top-[22%] right-[59.9%] w-[10%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={68} /></div>
        <div className="absolute top-[19.5%] right-[58.3%] w-[10%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={69} /></div>
        <div className="absolute top-[17.5%] right-[56.3%] w-[10%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={70} /></div>
        <div className="absolute top-[15.8%] right-[54.2%] w-[10%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={71} /></div>
        <div className="absolute top-[14.7%] right-[52.4%] w-[10%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={72} /></div>        
        */}
        </div>
      </div>

    );

  }
  
  export default Tablero;


