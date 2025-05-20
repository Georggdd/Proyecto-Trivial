import Tarjeta_Pregunta from './Tarjeta_Pregunta';

export default function ModalPregunta({ visible, onClose, categoria }) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative w-[95%] h-[95%] flex items-center justify-center">
        <Tarjeta_Pregunta 
          categoria={categoria} 
          onClose={onClose}
        />
        <button
          onClick={onClose}
          className="absolute top-5 right-5 bg-white border border-gray-800 px-4 py-2 rounded shadow hover:bg-black hover:text-white transition"
        >
          ✖
        </button>
      </div>
    </div>
  );
}