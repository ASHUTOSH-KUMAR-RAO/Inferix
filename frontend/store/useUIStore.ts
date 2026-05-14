import { create } from "zustand";

type UIStore = {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;

  theme: "dark" | "light";
  setTheme: (theme: "dark" | "light") => void;

  isVoiceOpen: boolean;
  setVoiceOpen: (open: boolean) => void;

  isExporting: boolean;
  setExporting: (exporting: boolean) => void;
};

export const useUIStore = create<UIStore>((set) => ({
  sidebarCollapsed: false,
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
  toggleSidebar: () =>
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

  theme: "dark",
  setTheme: (theme) => set({ theme }),

  isVoiceOpen: false,
  setVoiceOpen: (open) => set({ isVoiceOpen: open }),

  isExporting: false,
  setExporting: (exporting) => set({ isExporting: exporting }),
}));
