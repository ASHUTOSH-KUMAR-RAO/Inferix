import { useBenchmarkStore } from "@/store/useBenchmarkStore";
import { MODELS } from "@/types/models";
import type { BenchmarkResult } from "@/types/index";

export function useBenchmark() {
  const {
    results,
    history,
    isRunning,
    setResults,
    addHistory,
    deleteHistory,
    clearHistory,
    setRunning,
    reset,
  } = useBenchmarkStore();

  async function runBenchmark(prompt: string) {
    setRunning(true);
    setResults([]);

    // Placeholder — backend se connect karenge baad mein
    setTimeout(() => {
      const mockResults: BenchmarkResult[] = MODELS.map((m, i) => ({
        model: m.id,
        tokensPerSec: [52, 38, 28][i],
        latency: [310, 420, 580][i],
        ram: ["1.6 GB", "2.3 GB", "2.0 GB"][i],
        score: [7.2, 8.6, 9.1][i],
        prompt,
      }));

      setResults(mockResults);
      addHistory({
        id: Date.now().toString(),
        timestamp: new Date().toLocaleString(),
        prompt,
        results: mockResults,
      });
      setRunning(false);
    }, 2500);
  }

  const winner =
    results.length > 0
      ? results.reduce((a, b) => (a.score > b.score ? a : b))
      : null;

  return {
    results,
    history,
    isRunning,
    winner,
    runBenchmark,
    deleteHistory,
    clearHistory,
    reset,
  };
}
