import Casilla0 from '/src/components/casillas/Casilla0';
import Casilla1 from '/src/components/casillas/Casilla1';
import Casilla10 from '/src/components/casillas/Casilla10';
import Casilla11 from '/src/components/casillas/Casilla11';
import Casilla12 from '/src/components/casillas/Casilla12';
import Casilla13 from '/src/components/casillas/Casilla13';
import Casilla14 from '/src/components/casillas/Casilla14';
import Casilla15 from '/src/components/casillas/Casilla15';
import Casilla16 from '/src/components/casillas/Casilla16';
import Casilla17 from '/src/components/casillas/Casilla17';
import Casilla18 from '/src/components/casillas/Casilla18';
import Casilla19 from '/src/components/casillas/Casilla19';
import Casilla2 from '/src/components/casillas/Casilla2';
import Casilla20 from '/src/components/casillas/Casilla20';
import Casilla21 from '/src/components/casillas/Casilla21';
import Casilla22 from '/src/components/casillas/Casilla22';
import Casilla23 from '/src/components/casillas/Casilla23';
import Casilla24 from '/src/components/casillas/Casilla24';
import Casilla25 from '/src/components/casillas/Casilla25';
import Casilla26 from '/src/components/casillas/Casilla26';
import Casilla27 from '/src/components/casillas/Casilla27';
import Casilla28 from '/src/components/casillas/Casilla28';
import Casilla29 from '/src/components/casillas/Casilla29';
import Casilla3 from '/src/components/casillas/Casilla3';
import Casilla30 from '/src/components/casillas/Casilla30';
import Casilla31 from '/src/components/casillas/Casilla31';
import Casilla32 from '/src/components/casillas/Casilla32';
import Casilla33 from '/src/components/casillas/Casilla33';
import Casilla34 from '/src/components/casillas/Casilla34';
import Casilla35 from '/src/components/casillas/Casilla35';
import Casilla36 from '/src/components/casillas/Casilla36';
import Casilla37 from '/src/components/casillas/Casilla37';
import Casilla38 from '/src/components/casillas/Casilla38';
import Casilla39 from '/src/components/casillas/Casilla39';
import Casilla4 from '/src/components/casillas/Casilla4';
import Casilla40 from '/src/components/casillas/Casilla40';
import Casilla41 from '/src/components/casillas/Casilla41';
import Casilla42 from '/src/components/casillas/Casilla42';
import Casilla43 from '/src/components/casillas/Casilla43';
import Casilla44 from '/src/components/casillas/Casilla44';
import Casilla45 from '/src/components/casillas/Casilla45';
import Casilla46 from '/src/components/casillas/Casilla46';
import Casilla47 from '/src/components/casillas/Casilla47';
import Casilla48 from '/src/components/casillas/Casilla48';
import Casilla49 from '/src/components/casillas/Casilla49';
import Casilla5 from '/src/components/casillas/Casilla5';
import Casilla50 from '/src/components/casillas/Casilla50';
import Casilla51 from '/src/components/casillas/Casilla51';
import Casilla52 from '/src/components/casillas/Casilla52';
import Casilla53 from '/src/components/casillas/Casilla53';
import Casilla54 from '/src/components/casillas/Casilla54';
import Casilla55 from '/src/components/casillas/Casilla55';
import Casilla56 from '/src/components/casillas/Casilla56';
import Casilla57 from '/src/components/casillas/Casilla57';
import Casilla58 from '/src/components/casillas/Casilla58';
import Casilla59 from '/src/components/casillas/Casilla59';
import Casilla6 from '/src/components/casillas/Casilla6';
import Casilla60 from '/src/components/casillas/Casilla60';
import Casilla61 from '/src/components/casillas/Casilla61';
import Casilla62 from '/src/components/casillas/Casilla62';
import Casilla63 from '/src/components/casillas/Casilla63';
import Casilla64 from '/src/components/casillas/Casilla64';
import Casilla65 from '/src/components/casillas/Casilla65';
import Casilla66 from '/src/components/casillas/Casilla66';
import Casilla67 from '/src/components/casillas/Casilla67';
import Casilla68 from '/src/components/casillas/Casilla68';
import Casilla69 from '/src/components/casillas/Casilla69';
import Casilla7 from '/src/components/casillas/Casilla7';
import Casilla70 from '/src/components/casillas/Casilla70';
import Casilla71 from '/src/components/casillas/Casilla71';
import Casilla72 from '/src/components/casillas/Casilla72';
import Casilla8 from '/src/components/casillas/Casilla8';
import Casilla9 from '/src/components/casillas/Casilla9';


function Tablero() {
    return (
      <div className="relative w-full h-screen">
        {/* Fondo del tablero */}
        <img
          src="/assets/img/fondo-tablero2.png"
          alt="Tablero"
          className="absolute w-[45%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0" />




        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[10%] z-20">
          <Casilla0 />
        </div>
        <div className="absolute top-[41%] left-[52.5%] w-[4%] z-10">
          <Casilla1 />
        </div>
        <div className="absolute top-[38.4%] left-[54.8%] w-[4%] z-10">
          <Casilla2 />
        </div>
        <div className="absolute top-[36%] left-[57%] w-[4%] z-10">
          <Casilla3 />
        </div>
        <div className="absolute top-[33.5%] left-[59.3%] w-[4%] z-10">
          <Casilla4 />
        </div>
        <div className="absolute top-[31.2%] left-[61.6%] w-[4%] z-10">
          <Casilla5 />
        </div>
        {/* */}
        <div className="absolute bottom-[41%] left-[52.5%] w-[4%] z-10">
          <Casilla6 />
        </div>
        <div className="absolute bottom-[38.4%] left-[54.8%] w-[4%] z-10">
          <Casilla7 />
        </div>
        <div className="absolute bottom-[36%] left-[57%] w-[4%] z-10">
          <Casilla8 />
        </div>
        <div className="absolute bottom-[33.5%] left-[59.3%] w-[4%] z-10">
          <Casilla9 />
        </div>
        <div className="absolute bottom-[31.2%] left-[61.6%] w-[4%] z-10">
          <Casilla10 />
        </div>
        {/* */}
        <div className="absolute bottom-[39%] left-1/2 -translate-x-1/2 w-[4%] z-10">
          <Casilla11 />
        </div>
        <div className="absolute bottom-[34.5%] left-1/2 -translate-x-1/2 w-[4%] z-10">
          <Casilla12 />
        </div>
        <div className="absolute bottom-[30%] left-1/2 -translate-x-1/2 w-[4%] z-10">
          <Casilla13 />
        </div>
        <div className="absolute bottom-[25.5%] left-1/2 -translate-x-1/2 w-[4%] z-10">
          <Casilla14 />
        </div>
        <div className="absolute bottom-[20.5%] left-1/2 -translate-x-1/2 w-[4%] z-10">
          <Casilla15 />
        </div>
        {/* */}
        <div className="absolute bottom-[41.3%] right-[52.5%] w-[4%] z-10">
          <Casilla16 />
        </div>
        <div className="absolute bottom-[39%] right-[54.7%] w-[4%] z-10">
          <Casilla17 />
        </div>
        <div className="absolute bottom-[36.5%] right-[57%] w-[4%] z-10">
          <Casilla18 />
        </div>
        <div className="absolute bottom-[34%] right-[59.3%] w-[4%] z-10">
          <Casilla19 />
        </div>
        <div className="absolute bottom-[31.7%] right-[61.6%] w-[4%] z-10">
          <Casilla20 />
        </div>
        {/* */}
        <div className="absolute top-[41%] right-[52.5%] w-[4%] z-10">
          <Casilla21 />
        </div>
        <div className="absolute top-[38.4%] right-[54.8%] w-[4%] z-10">
          <Casilla22 />
        </div>
        <div className="absolute top-[36%] right-[57%] w-[4%] z-10">
          <Casilla23 />
        </div>
        <div className="absolute top-[33.5%] right-[59.3%] w-[4%] z-10">
          <Casilla24 />
        </div>
        <div className="absolute top-[31%] right-[61.6%] w-[4%] z-10">
          <Casilla25 />
        </div>
        {/* */}
        <div className="absolute top-[38.5%] left-1/2 -translate-x-1/2 w-[4%] z-10">
          <Casilla26 />
        </div>
        <div className="absolute top-[33.9%] left-1/2 -translate-x-1/2 w-[4%] z-10">
          <Casilla27 />
        </div>
        <div className="absolute top-[29.5%] left-1/2 -translate-x-1/2 w-[4%] z-10">
          <Casilla28 />
        </div>
        <div className="absolute top-[25%] left-1/2 -translate-x-1/2 w-[4%] z-10">
          <Casilla29 />
        </div>
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[4%] z-10">
          <Casilla30 />
        </div>
        {/* */}
        <div className="absolute top-[14%] left-1/2 -translate-x-1/2 w-[4%] z-10"> <Casilla31 /> </div>
        <div className="absolute top-[14.4%] left-[52.4%] h-[6.5%] z-10"> <Casilla32 /> </div>
        <div className="absolute top-[15.4%] left-[54.2%] h-[6.5%] z-10"> <Casilla33 /> </div>
        <div className="absolute top-[17%] left-[56.3%] h-[6.5%] z-10"> <Casilla34 /> </div>
        <div className="absolute top-[19.2%] left-[58.3%] h-[6.5%] z-10"> <Casilla35 /> </div>
        <div className="absolute top-[21.5%] left-[59.9%] h-[6.5%] z-10"> <Casilla36 /> </div>
        <div className="absolute top-[24.5%] left-[61.5%] h-[6.5%] z-10"> <Casilla37 /></div>

        {/* */}
        <div className="absolute top-[29.5%] left-[63.7%] w-[4%] z-10"> <Casilla38 /> </div>
        <div className="absolute bottom-[58%] left-[65.4%] w-[3.5%] h-[6%]  z-10"> <Casilla39 /> </div>
        <div className="absolute bottom-[54%] left-[66%] w-[3.5%] h-[6%] z-10"> <Casilla40 /> </div>
        <div className="absolute bottom-[50%] left-[66.3%] w-[3.5%] h-[6%] z-10"> <Casilla41 /> </div>
        <div className="absolute bottom-[45.5%] left-[66.3%] w-[3.5%] h-[6%] z-10"> <Casilla42 /> </div>
        <div className="absolute bottom-[41%] left-[66%] w-[3.5%] h-[6%] z-10"> <Casilla43 /> </div>
        <div className="absolute bottom-[36.5%] left-[65.3%] w-[3.8%] h-[6%] z-10"> <Casilla44 /></div> 

        {/* */}
        <div className="absolute bottom-[29.5%] left-[63.5%] w-[4%] z-10"> <Casilla45 /> </div>
        <div className="absolute bottom-[25%] left-[61.5%] h-[5.9%] z-10"> <Casilla46 /> </div>
        <div className="absolute bottom-[21.8%] left-[59.9%] h-[6.5%] z-10"> <Casilla47 /> </div>
        <div className="absolute bottom-[19.2%] left-[58.3%] h-[6.5%] z-10"> <Casilla48 /> </div>
        <div className="absolute bottom-[17%] left-[56.3%] h-[6.5%] z-10"> <Casilla49 /> </div>
        <div className="absolute bottom-[15.4%] left-[54.2%] h-[6.5%] z-10"> <Casilla50 /> </div>
        <div className="absolute bottom-[14%] left-[52.4%] h-[6.5%] z-10"> <Casilla51 /></div> 
        {/* */}

        <div className="absolute bottom-[14.5%] left-1/2 -translate-x-1/2 w-[4%] z-10"> <Casilla52 /> </div>
        <div className="absolute bottom-[14.7%] right-[52.4%] h-[6.5%] z-10"> <Casilla53 /> </div>
        <div className="absolute bottom-[15.8%] right-[54.2%] h-[6.5%] z-10"> <Casilla54 /> </div>
        <div className="absolute bottom-[17.5%] right-[56.3%] h-[6.5%] z-10"> <Casilla55 /> </div>
        <div className="absolute bottom-[19.5%] right-[58.3%] h-[6.5%] z-10"> <Casilla56 /> </div>
        <div className="absolute bottom-[22%] right-[59.9%] h-[6.5%] z-10"> <Casilla57 /> </div>
        <div className="absolute bottom-[25%] right-[61.5%] h-[6.5%] z-10"> <Casilla58 /></div>
        {/* */}
        <div className="absolute bottom-[30%] right-[63.7%] w-[4%] z-10"> <Casilla59 /> </div>
        <div className="absolute bottom-[36.5%] right-[65.3%] w-[3.5%] h-[6%]  z-10"> <Casilla60 /> </div>
        <div className="absolute bottom-[41%] right-[66%] w-[3.5%] h-[6%] z-10"> <Casilla61 /> </div>
        <div className="absolute bottom-[45.5%] right-[66.3%] w-[3.5%] h-[6%] z-10"> <Casilla62 /> </div>
        <div className="absolute bottom-[50%] right-[66.3%] w-[3.5%] h-[6%] z-10"> <Casilla63 /> </div>
        <div className="absolute bottom-[54%] right-[66%] w-[3.5%] h-[6%] z-10"> <Casilla64 /> </div>
        <div className="absolute bottom-[58%] right-[65.4%] w-[3.8%] h-[6%] z-10"> <Casilla65 /></div> 

        {/* */}

        <div className="absolute top-[29%] right-[63.5%] w-[4%] z-10"> <Casilla66 /> </div>
        <div className="absolute top-[25%] right-[61.5%] h-[6.5%] z-10"> <Casilla67 /> </div>
        <div className="absolute top-[22%] right-[59.9%] h-[6.5%] z-10"> <Casilla68 /> </div>
        <div className="absolute top-[19.5%] right-[58.3%] h-[6.5%] z-10"> <Casilla69 /> </div>
        <div className="absolute top-[17.5%] right-[56.3%] h-[6.5%] z-10"> <Casilla70 /> </div>
        <div className="absolute top-[15.8%] right-[54.2%] h-[6.5%] z-10"> <Casilla71 /> </div>
        <div className="absolute top-[14.7%] right-[52.4%] h-[6.5%] z-10"> <Casilla72 /> </div>






        </div>

    );

  }
  
  export default Tablero;


