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
        <div className="absolute top-[32.5%] right-[12%] w-[8.5%] -translate-x-1/2 -translate-y-1/2 z-10"> <Casilla numero={5} /> </div>

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

        {/* */}
      
        <div className="absolute top-[9.5%] left-1/2 w-[9%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={31} /></div>
        <div className="absolute top-[10.5%] right-[36.2%] h-[8%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={32} /></div>
        <div className="absolute top-[11.8%] right-[30.2%] h-[8%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={33} /></div>
        <div className="absolute top-[13.8%] right-[25.2%] h-[8%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={34} /></div>
        <div className="absolute top-[16.5%] right-[20%] h-[8%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={35} /></div>
        <div className="absolute top-[19.5%] right-[15.5%] w-[8%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={36} /></div>
        <div className="absolute top-[23%] right-[12%] w-[8%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={37} /></div>

        {/* */}

        <div className="absolute top-[29.5%] right-[5.8%] h-[10%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={38} /></div>
        <div className="absolute bottom-[56.7%] right-[4%] w-[8%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={39} /></div>
        <div className="absolute bottom-[52%] right-[2.9%] w-[8%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={40} /></div>
        <div className="absolute bottom-[47%] right-[2.3%] h-[5.7%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={41} /></div>
        <div className="absolute bottom-[41.2%] right-[2.5%] h-[6%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={42} /></div>
        <div className="absolute bottom-[35.5%] right-[2.9%] w-[7.8%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={43} /></div>
        <div className="absolute bottom-[29.6%] right-[4.2%] w-[7.8%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={44} /></div>
        
        {/* */}

        <div className="absolute bottom-[19.5%] right-[5.8%] h-[10%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={45} /></div>
        <div className="absolute bottom-[16.5%] right-[11.9%] w-[7.8%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={46} /></div>
        <div className="absolute bottom-[11.6%] right-[15.2%] w-[8%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={47} /></div>
        <div className="absolute bottom-[8.8%] right-[20%] h-[8%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={48} /></div>
        <div className="absolute bottom-[6%] right-[25%] h-[8%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={49} /></div>
        <div className="absolute bottom-[4.3%] right-[30.7%] h-[8%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={50} /></div>
        <div className="absolute bottom-[3%] right-[36%] h-[8%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={51} /></div>
        
        {/* */}
       
        <div className="absolute bottom-[3%] left-1/2 w-[9%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={52} /></div>
        <div className="absolute bottom-[3%] left-[41.7%] h-[8%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={53} /></div>
        <div className="absolute bottom-[4.4%] left-[37%] h-[8%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={54} /></div>
        <div className="absolute bottom-[6.5%] left-[32.4%] h-[8%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={55} /></div>
        <div className="absolute bottom-[9%] left-[27.5%] h-[8%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={56} /></div>
        <div className="absolute bottom-[12.4%] left-[23.3%] w-[8%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={57} /></div>
        <div className="absolute bottom-[16.7%] left-[19.8%] w-[7.8%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={58} /></div>

       {/* */}

        <div className="absolute bottom-[20.5%] left-[15.5%] h-[10%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={59} /></div>
        <div className="absolute bottom-[30.7%] left-[12.3%] w-[7.8%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={60} /></div>
        <div className="absolute bottom-[36%] left-[11%] w-[7.8%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={61} /></div>
        <div className="absolute bottom-[41.6%] left-[10.3%] w-[7.8%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={62} /></div>
        <div className="absolute bottom-[47%] left-[10.5%] h-[6%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={63} /></div>
        <div className="absolute bottom-[51.9%] left-[11%] w-[8%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={64} /></div>
        <div className="absolute bottom-[56.5%] left-[12.5%] w-[8%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={65} /></div>

       {/* */}

        <div className="absolute top-[29.3%] left-[15.5%] h-[10%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={66} /></div>
        <div className="absolute top-[23%] left-[20%] w-[8%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={67} /></div>
        <div className="absolute top-[19.5%] left-[23.7%] w-[8%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={68} /></div>
        <div className="absolute top-[16.3%] left-[27.7%] h-[8%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={69} /></div>
        <div className="absolute top-[14%] left-[32.2%] h-[8%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={70} /></div>
        <div className="absolute top-[12%] left-[37.2%] h-[8%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={71} /></div>
        <div className="absolute top-[10.7%] left-[41.7%] h-[7.8%] -translate-x-1/2 -translate-y-1/2 z-10"><Casilla numero={72} /></div>
      
        </div>
      </div>

    );

  }
  
  export default Tablero;


