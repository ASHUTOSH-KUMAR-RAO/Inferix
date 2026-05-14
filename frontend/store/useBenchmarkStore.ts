import { create } from "zustand";
import type { BenchmarkResult, HistoryEntry } from "@/types/index";

type BenchmarkStore = {
  results: BenchmarkResult[];
  history: HistoryEntry[];
  isRunning: boolean;

  setResults: (results: BenchmarkResult[]) => void;
  addHistory: (entry: HistoryEntry) => void;
  deleteHistory: (id: string) => void;
  clearHistory: () => void;
  setRunning: (running: boolean) => void;
  reset: () => void;
};

export const useBenchmarkStore = create<BenchmarkStore>((set) => ({
  results: [],
  history: [],
  isRunning: false,

  setResults: (results) => set({ results }),

  addHistory: (entry) =>
    set((state) => ({
      history: [entry, ...state.history],
    })),

  deleteHistory: (id) =>
    set((state) => ({
      history: state.history.filter((h) => h.id !== id),
    })),

  clearHistory: () => set({ history: [] }),

  setRunning: (running) => set({ isRunning: running }),

  reset: () => set({ results: [], isRunning: false }),
}));
