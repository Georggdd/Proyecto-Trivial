// src/hooks/useCategoriaStore.js
import { create } from 'zustand';

export const useCategoriaStore = create((set) => ({
  categoriaSeleccionada: null,
  setCategoriaSeleccionada: (categoria) => set({ categoriaSeleccionada: categoria }),
}));
