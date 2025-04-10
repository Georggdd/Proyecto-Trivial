import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes'; // automáticamente importa routes/index.jsx
import VistaRanking from './pages/VistaRanking';

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;