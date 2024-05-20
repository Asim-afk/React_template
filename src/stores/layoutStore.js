import { create } from "zustand";
const useLayoutStore = create((set) => ({
  collapsed: false,
  setCollapsed: (collapsed) => set({ collapsed }),
}));

export { useLayoutStore };
