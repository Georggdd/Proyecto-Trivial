import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PruebasElevenLabs from './pages/Pruebas-elevenlabs'

//Estos son ejemplos de componentes de React cuando desarrolleis otros elimiinad estos
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PruebasElevenLabs />} />
      </Routes>
    </Router>
  )
}