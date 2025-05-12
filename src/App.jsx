
//Estos son ejemplos de componentes de React cuando desarrolleis otros elimiinad estos
import Header from './components/Header';
import Tarjeta_Pregunta from './components/Tarjeta_Pregunta';

export default function App() {
  return (
    <div className="h-screen w-screen flex flex-col">
      <header className='flex-1]'>
        <Header/>
      </header>
      
      <main className='flex-1 h-[88%] flex items-center justify-center bg-tablero bg-cover bg-center bg-no-repeat overflow-auto'>
        <Tarjeta_Pregunta categoria="Biología" />
      </main>
      
      
    </div>
    
  
  )
}