import { useState } from 'react'
import Ranking from './components/Ranking'


//Estos son ejemplos de componentes de React cuando desarrolleis otros elimiinad estos
export default function App() {
  return (
    <div className="min-h-screen bg-slate-100">
      <header className="py-6">
        <h1 className="text-3xl font-bold text-center text-slate-800">
          Trivial Customizable
        </h1>
        <Ranking></Ranking>
  

      </header>

      <main className="container mx-auto px-4">
        {/* Your game content will go here */}
      </main>
    </div>
  )
}