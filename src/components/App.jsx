import { useState } from 'react'
import './App.css'

//Estos son ejemplos de componentes de React cuando desarrolleis otros eliminad estos
function App() {
  const [count, setCount] = useState(0)

  return (
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
  )
}

export default App
