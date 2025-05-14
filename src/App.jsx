
//Estos son ejemplos de componentes de React cuando desarrolleis otros elimiinad estos
import Tarjeta_Pregunta_Turnos from './components/Tarjeta_Pregunta_Turnos';

export default function App() {
  return (
    <div className='h-screen w-screen flex items-center justify-center bg-tablero bg-cover bg-center bg-no-repeat overflow-auto'>
        
        <Tarjeta_Pregunta_Turnos categoria="Biología" />
      
      
      
    </div>
    
  
  )
}