import { motion, AnimatePresence } from "framer-motion";
import useGuiaStore from "../hooks/useGuiaStore";

const GuiaPanel = () => {
    const { guiaAbierta, toggleGuia } = useGuiaStore();
  
    return (
      <AnimatePresence>
        {guiaAbierta && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 h-full w-80 bg-white border-r border-purple-600 shadow-xl z-40 p-6 pt-24 overflow-y-auto"
          >
            <h2 className="text-2xl font-bold text-purple-700 mb-6">
              Guía del Juego
            </h2>
  
            <ul className="list-disc list-inside space-y-4 text-gray-700 text-base">
              <li>El objetivo es conseguir todos los quesitos.</li>
              <li>Cada 1000 puntos recibes un quesito</li>
              <li>Al tirar el dado, se iluminan casillas posibles.</li>
              <li>Las preguntas tienen dificultad variable.</li>
              <li>Comodines positivos o negativos aparecen al azar.</li>
            </ul>
  
            <button
              onClick={toggleGuia}
              className="mt-10 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded shadow"
            >
              Cerrar Guía
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };
  
  export default GuiaPanel;

