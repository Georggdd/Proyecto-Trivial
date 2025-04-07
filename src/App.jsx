
//Estos son ejemplos de componentes de React cuando desarrolleis otros elimiinad estos
import Tarjeta_Pregunta from './components/Tarjeta_Pregunta';
import { preguntas } from './data/preguntas';

export default function App() {
  return (
    <div className="h-screen w-screen bg-tablero">
     {/* <header>
    <HeaderNav></HeaderNav>
      </header>   */}
      <main>
       <Tarjeta_Pregunta pregunta={preguntas[0]}/>
      </main>
      
      
    </div>
    
  
  )
}