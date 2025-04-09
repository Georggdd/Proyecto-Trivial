
//Estos son ejemplos de componentes de React cuando desarrolleis otros elimiinad estos
import Header from './components/Header';
import Tarjeta_Pregunta from './components/Tarjeta_Pregunta';
import { preguntas } from './data/preguntas';

export default function App() {
  return (
    <div className="h-screen w-screen">
      <header>
        <Header/> 
      </header>  
      
      <main className='flex items-center justify-center bg-tablero bg-cover bg-no-repeat'>
     
       <Tarjeta_Pregunta pregunta={preguntas[0]}/>
      </main>
      
      
    </div>
    
  
  )
}