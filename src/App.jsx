import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import RankingPage from './pages/ranking'

//Estos son ejemplos de componentes de React cuando desarrolleis otros elimiinad estos
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RankingPage />} />
      </Routes>
    </Router>
  )
}