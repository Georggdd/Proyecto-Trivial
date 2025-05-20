import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes'; // automáticamente importa routes/index.jsx

function App() {
  const [preguntas, setPreguntas] = useState([]);
  const [error, setError] = useState(null);

  // Función para manejar la subida del CSV
  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("archivo", file); // "archivo" debe coincidir con el nombre en multer (backend)

    try {
      const response = await axios.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setPreguntas(response.data.preguntas);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || "Error al procesar el archivo");
      console.error("Error:", err.response?.data);
    }
  };
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;

