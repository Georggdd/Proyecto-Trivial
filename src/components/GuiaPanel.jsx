import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { usePartidaStore } from "../hooks/usePartidaStore";
import useGuiaStore from "../hooks/useGuiaStore";
import ConfirmModal from "./ConfirmModal";

const GuiaPanel = () => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { guiaAbierta, toggleGuia } = useGuiaStore();
  const navigate = useNavigate();
  const { partidaId } = usePartidaStore();

  const handleTerminar = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmTerminar = () => {
    toggleGuia();
    setShowConfirmModal(false);
    navigate(`/padre-ranking?partidaId=${partidaId}`);
  };

  return (
    <>
      <AnimatePresence>
        {guiaAbierta && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 h-full w-96 bg-white border-r border-orange-600 shadow-xl z-40 p-8 pt-40 overflow-y-auto"
          >
            {/* Título */}
            <h2 className="text-3xl font-bold text-naranja mb-8">
              Guía del Juego
            </h2>

            {/* Secciones */}
            <div className="space-y-8">
              {/* Objetivo */}
              <section>
                <h3 className="text-xl font-semibold text-naranja mb-3">
                  Objetivo
                </h3>
                <p className="text-gray-700">
                  Consigue todos los puntos que puedas para ganar el juego. Cada
                  equipo debe responder preguntas correctamente y acumular puntos,
                  aprovechad las casillas especiales y los bonus por aciertos
                  consecutivos
                </p>
              </section>

              {/* Sistema de Puntos */}
              <section>
                <h3 className="text-xl font-semibold text-naranja mb-3">
                  Sistema de Puntos
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>
                    Preguntas correctas Custom: Puntos determinados por el archivo
                    custom
                  </li>
                  <li>Preguntas correctas Predefinidas: Puntos de 10 a 30</li>
                  <li>Bonus por racha: hasta x3 multiplicador</li>
                </ul>
              </section>

              {/* Casillas Especiales */}
              <section>
                <h3 className="text-xl font-semibold text-naranja mb-3">
                  Casillas Especiales
                </h3>
                <div className="space-y-2 text-gray-700">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-yellow-400"></div>
                    <p>Quesito (x2 puntos)</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-green-400"></div>
                    <p>Tirar otra vez</p>
                  </div>
                </div>
              </section>

              {/* Multiplicadores */}
              <section>
                <h3 className="text-xl font-semibold text-naranja mb-3">
                  Sistema de Multiplicadores
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>4 aciertos grupales: x2 disponible</li>
                  <li>8 aciertos grupales: x3 disponible</li>
                  <li>El multiplicador se resetea al fallar</li>
                  <li>El multiplicador se resetea al llegar al x3</li>
                </ul>
              </section>

              {/* Controles */}
              <section>
                <h3 className="text-xl font-semibold text-naranja mb-3">
                  Controles
                </h3>
                <div className="grid grid-cols-2 gap-4 text-gray-700">
                  <div className="flex items-center gap-2">
                    <img
                      src="/assets/Dado.svg"
                      alt="Dado"
                      className="w-8 h-8"
                    />
                    <span>Tirar dado</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <img
                      src="/assets/Group.png"
                      alt="Multiplicador"
                      className="w-8 h-8"
                    />
                    <span>Indicador de Multiplicador</span>
                  </div>
                </div>
              </section>
            </div>

            {/* Botones de acción */}
            <div className="mt-8 space-y-4">
              <button
                onClick={toggleGuia}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg shadow transition"
              >
                Cerrar Guía
              </button>
              <button
                onClick={handleTerminar}
                className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg shadow transition"
              >
                Terminar Juego
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmTerminar}
        title="¿Terminar el juego?"
        message="¿Estás seguro de que quieres terminar el juego y ver el ranking final?"
      />
    </>
  );
};

export default GuiaPanel;

