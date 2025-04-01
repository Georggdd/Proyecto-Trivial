import { useState } from 'react'
import Ranking from './components/Ranking'
import Hamburger from './components/PruebaBotonHamburguesa'
import VistaRanking from './components/VistaRanking'


//Estos son ejemplos de componentes de React cuando desarrolleis otros elimiinad estos
export default function App() {
  return (
    <div className="min-h-screen bg-slate-100">
      <header className="py-6">
        
       <VistaRanking/>
            
        
  

      </header>

      <main className="container mx-auto px-4">
        {/* Your game content will go here */}
      </main>
    </div>
  )
}