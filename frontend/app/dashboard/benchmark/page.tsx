"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, RotateCcw, Zap, Clock, Cpu, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import BenchmarkChart from "@/components/benchmark/BenchmarkChart";
import BenchmarkHistory from "@/components/benchmark/BenchmarkHistory";

const MODELS = [
  { id: "gemma:2b", color: "#22c55e", label: "gemma:2b" },
  { id: "phi3:mini", color: "#3b82f6", label: "phi3:mini" },
  { id: "llama3.2:3b", color: "#eab308", label: "llama3.2:3b" },
];

const PROMPTS = [
  "Explain quantum computing in simple terms",
  "Write a Python function to sort a list",
  "Summarize the history of artificial intelligence",
  "What are the benefits of exercise?",
];

type BenchmarkResult = {
  model: string;
  tokensPerSec: number;
  latency: number;
  ram: string;
  score: number;
  prompt: string;
};

type HistoryEntry = {
  id: string;
  timestamp: string;
  prompt: string;
  results: BenchmarkResult[];
};

export default function BenchmarkPage() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [selectedPrompt, setSelectedPrompt] = useState(PROMPTS[0]);
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<BenchmarkResult[]>([]);
  const [hasRun, setHasRun] = useState(false);

  async function runBenchmark() {
    setIsRunning(true);
    setHasRun(true);
    setResults([]);
    setHistory((prev) => [
      {
        id: Date.now().toString(),
        timestamp: new Date().toLocaleString(),
        prompt: selectedPrompt,
        results: [], // Will be updated after benchmark completes
      },
      ...prev,
    ]);
    // Simulate benchmark — backend se connect karenge baad mein
    setTimeout(() => {
      const mockResults: BenchmarkResult[] = MODELS.map((m, i) => ({
        model: m.id,
        tokensPerSec: [52, 38, 28][i],
        latency: [310, 420, 580][i],
        ram: ["1.6 GB", "2.3 GB", "2.0 GB"][i],
        score: [7.2, 8.6, 9.1][i],
        prompt: selectedPrompt,
      }));
      setResults(mockResults);
      setIsRunning(false);
    }, 2500);
  }

  function reset() {
    setResults([]);
    setHasRun(false);
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <div className="px-4 md:px-6 py-4 border-b border-white/[0.06] flex-shrink-0">
        <div className="max-w-[1000px] mx-auto flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-[18px] font-medium text-white tracking-[-0.4px] mb-0.5">
              Benchmark
            </h1>
            <p className="text-[13px] text-white/30">
              Compare inference performance across all 3 models
            </p>
          </div>
          <div className="flex gap-2">
            {hasRun && (
              <button
                onClick={reset}
                className="flex items-center gap-2 px-4 py-2 rounded-[8px] bg-white/[0.05] border border-white/[0.08] text-white/50 text-[13px] hover:bg-white/[0.08] transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
            )}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={runBenchmark}
              disabled={isRunning}
              className="flex items-center gap-2 px-4 py-2 rounded-[8px] bg-red-500 text-white text-[13px] font-medium hover:bg-red-600 transition-colors disabled:opacity-50"
            >
              <Play className="w-3.5 h-3.5" />
              {isRunning ? "Running..." : "Run Benchmark"}
            </motion.button>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="px-4 md:px-6 py-4 max-w-[1000px] mx-auto space-y-4 pb-8">
          {/* Prompt Selector */}
          <div className="bg-[#111] border border-white/[0.07] rounded-[14px] p-4">
            <div className="text-[11px] text-white/25 uppercase tracking-[0.8px] mb-3">
              Select Test Prompt
            </div>
            <div className="flex flex-col gap-2">
              {PROMPTS.map((p) => (
                <button
                  key={p}
                  onClick={() => setSelectedPrompt(p)}
                  className={`text-left text-[13px] px-3 py-2.5 rounded-[8px] transition-colors ${
                    selectedPrompt === p
                      ? "bg-red-500/10 border border-red-500/20 text-red-400"
                      : "text-white/40 hover:bg-white/[0.04] hover:text-white/60 border border-transparent"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Running State */}
          {isRunning && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-[#111] border border-white/[0.07] rounded-[14px] p-8 text-center"
            >
              <div className="flex gap-1.5 justify-center mb-3">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.2, 1] }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                    className="w-2 h-2 rounded-full bg-red-500"
                  />
                ))}
              </div>
              <p className="text-[13px] text-white/40">
                Running benchmark on all 3 models...
              </p>
            </motion.div>
          )}

          {/* Results */}
          {results.length > 0 && (
            <>
              {/* Model Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {results.map((r, i) => (
                  <motion.div
                    key={r.model}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-[#111] border border-white/[0.07] rounded-[14px] p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className="text-[13px] font-medium"
                        style={{ color: MODELS[i].color }}
                      >
                        {r.model}
                      </span>
                      <Badge
                        variant="outline"
                        className="text-[10px] bg-white/[0.04] border-white/10 text-white/40"
                      >
                        #{i + 1}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-[#0a0a0a] rounded-[8px] p-2.5">
                        <div className="flex items-center gap-1 mb-1">
                          <Zap className="w-3 h-3 text-green-400" />
                          <span className="text-[10px] text-white/30">
                            Speed
                          </span>
                        </div>
                        <div className="text-[15px] font-medium text-white/80">
                          {r.tokensPerSec}
                          <span className="text-[10px] text-white/30 ml-1">
                            tok/s
                          </span>
                        </div>
                      </div>
                      <div className="bg-[#0a0a0a] rounded-[8px] p-2.5">
                        <div className="flex items-center gap-1 mb-1">
                          <Clock className="w-3 h-3 text-blue-400" />
                          <span className="text-[10px] text-white/30">
                            Latency
                          </span>
                        </div>
                        <div className="text-[15px] font-medium text-white/80">
                          {r.latency}
                          <span className="text-[10px] text-white/30 ml-1">
                            ms
                          </span>
                        </div>
                      </div>
                      <div className="bg-[#0a0a0a] rounded-[8px] p-2.5">
                        <div className="flex items-center gap-1 mb-1">
                          <Cpu className="w-3 h-3 text-yellow-400" />
                          <span className="text-[10px] text-white/30">RAM</span>
                        </div>
                        <div className="text-[15px] font-medium text-white/80">
                          {r.ram}
                        </div>
                      </div>
                      <div className="bg-[#0a0a0a] rounded-[8px] p-2.5">
                        <div className="flex items-center gap-1 mb-1">
                          <Star className="w-3 h-3 text-red-400" />
                          <span className="text-[10px] text-white/30">
                            Score
                          </span>
                        </div>
                        <div className="text-[15px] font-medium text-white/80">
                          {r.score}
                          <span className="text-[10px] text-white/30 ml-1">
                            /10
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Charts */}
              <BenchmarkChart results={results} />
            </>
          )}
          <div>
            <div className="text-[11px] text-white/25 uppercase tracking-[0.8px] mb-3">
              History
            </div>
            <BenchmarkHistory
              history={history}
              onDelete={(id) =>
                setHistory((prev) => prev.filter((h) => h.id !== id))
              }
            />
          </div>
          {/* Empty State */}
          {!hasRun && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#111] border border-white/[0.07] rounded-[14px] p-12 text-center"
            >
              <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-5 h-5 text-red-400" />
              </div>
              <h3 className="text-[15px] font-medium text-white/60 mb-2">
                Ready to benchmark
              </h3>
              <p className="text-[13px] text-white/25 max-w-[280px] mx-auto leading-relaxed">
                Select a prompt above and click "Run Benchmark" to test all 3
                models
              </p>
            </motion.div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
