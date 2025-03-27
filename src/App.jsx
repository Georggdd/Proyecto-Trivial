
//Estos son ejemplos de componentes de React cuando desarrolleis otros elimiinad estos
import HeaderNav from './components/HeaderNav';
import Tarjeta_Pregunta from './components/Tarjeta_Pregunta';
import Tarjeta_PreguntaTrasero from './components/Tarjeta_PreguntaTrasero';

export default function App() {
  return (
    <div className="h-screen w-screen gap-5">
      <header>
    <HeaderNav></HeaderNav>
      </header>
      <main >
  <Tarjeta_Pregunta></Tarjeta_Pregunta>
  <Tarjeta_PreguntaTrasero></Tarjeta_PreguntaTrasero>
      </main>
      
      
    </div> 
    
  
  )
}