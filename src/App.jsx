import { useState } from 'react'
import Ranking from './components/Ranking'
import Hamburger from './components/PruebaBotonHamburguesa'
import VistaRanking from './components/VistaRanking'
import Header from './components/Header'
import Categorias from './components/Feature_Categorias'






export default function App() {
  return (
    <div className="">
      <header className="">
        {/* <Header /> */}
        {/* <Ranking/> */}
        {/* <VistaRanking className=""/> */}
        <Categorias></Categorias>



      </header>

      <main className="">
        {/* Your game content will go here */}
      </main>
    </div>
  )
}