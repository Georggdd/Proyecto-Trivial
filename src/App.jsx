
//Estos son ejemplos de componentes de React cuando desarrolleis otros elimiinad estos
import TarjetaPregunta from './components/tarjeta/TarjetaPregunta';

export default function App() {
  return (
    <div className='h-screen w-screen flex items-center justify-center bg-tablero bg-cover bg-center bg-no-repeat overflow-auto'>
        
        <TarjetaPregunta categoria="Biología" />
      
      
      
    </div>
    
  
  )
}