import { create } from 'zustand';

export const usePartidaStore = create((set) => ({
  partidaId: null,
  setPartidaId: (id) => set({ partidaId: id }),
}));