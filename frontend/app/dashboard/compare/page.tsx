"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import ComparePanel from "@/components/compare/ComparePanel";
import { api } from "@/lib/api";

const MODELS = [
  {
    id: "gemma:2b",
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
  },
  {
    id: "phi3:mini",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  {
    id: "llama3.2:3b",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
  },
];

type ModelResponse = {
  model: string;
  content: string;
  tokensPerSec: number;
  latency: number;
  ram: string;
  score: number;
  isLoading: boolean;
  error?: string;
};

export default function ComparePage() {
  const [prompt, setPrompt] = useState("");
  const [responses, setResponses] = useState<ModelResponse[]>([]);
  const [hasCompared, setHasCompared] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCompare() {
    if (!prompt.trim()) return;
    setHasCompared(true);
    setError(null);

    // Set all models to loading state
    const initial: ModelResponse[] = MODELS.map((m) => ({
      model: m.id,
      content: "",
      tokensPerSec: 0,
      latency: 0,
      ram: "",
      score: 0,
      isLoading: true,
    }));
    setResponses(initial);

    try {
      // Real API call — all 3 models run in parallel on backend
      const response = await api.compare.run({ prompt });

      setResponses(
        response.responses.map((r: any) => ({
          model: r.model,
          content: r.content,
          tokensPerSec: r.tokensPerSec,
          latency: r.latency,
          ram: r.ram,
          score: r.score,
          isLoading: false,
        })),
      );
    } catch (err) {
      setError("Comparison failed. Make sure Ollama is running.");
      setResponses(
        MODELS.map((m) => ({
          model: m.id,
          content: "",
          tokensPerSec: 0,
          latency: 0,
          ram: "",
          score: 0,
          isLoading: false,
          error: "Failed to get response",
        })),
      );
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleCompare();
    }
  }

  return (
    <div className="flex flex-col h-screen bg-[#0a0a0a] overflow-hidden relative">
      {/* Glow */}
      <div className="absolute -top-16 -right-10 w-[300px] sm:w-[400px] h-[250px] rounded-full bg-red-900/15 blur-[90px] pointer-events-none z-0" />

      {/* Header */}
      <div className="px-4 md:px-6 py-4 border-b border-white/[0.06] flex-shrink-0 relative z-10">
        <div className="max-w-[1100px] mx-auto">
          <h1 className="text-[18px] font-medium text-white/90 tracking-[-0.4px] mb-0.5">
            Model Comparison
          </h1>
          <p className="text-[13px] text-white/28">
            Send one prompt to all 3 models simultaneously and compare outputs
          </p>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="px-4 md:px-6 py-2 bg-red-500/10 border-b border-red-500/20 text-red-400 text-[12px] relative z-10">
          {error}
        </div>
      )}

      {/* Prompt Input */}
      <div className="px-4 md:px-6 py-4 border-b border-white/[0.06] flex-shrink-0 relative z-10">
        <div className="max-w-[1100px] mx-auto">
          <div className="flex gap-3 items-stretch mb-3">
            <div className="flex-1 bg-[#111] border border-white/[0.08] rounded-[12px] px-4 py-3 focus-within:border-red-500/40 transition-colors">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter a prompt to compare across all 3 models..."
                rows={2}
                className="w-full bg-transparent text-[13px] text-white/80 placeholder:text-white/25 outline-none resize-none leading-relaxed"
              />
            </div>
            <motion.div
              whileTap={{ scale: 0.95 }}
              onClick={handleCompare}
              className={`
                px-5 rounded-[12px] bg-red-500 text-white text-[13px] font-medium
                hover:bg-red-600 transition-all flex items-center gap-2
                flex-shrink-0 cursor-pointer hover:-translate-y-[1px]
                min-w-[48px] sm:min-w-[110px] justify-center
                ${!prompt.trim() ? "opacity-40 pointer-events-none" : ""}
              `}
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:block">Compare</span>
            </motion.div>
          </div>

          {/* Model Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] text-white/25">Comparing:</span>
            {MODELS.map((m) => (
              <div
                key={m.id}
                className={`text-[11px] ${m.color} ${m.bg} border ${m.border} px-2.5 py-1 rounded-full`}
              >
                {m.id}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Compare Panel */}
      <div className="flex-1 overflow-y-auto relative z-10">
        <ComparePanel
          responses={responses}
          hasCompared={hasCompared}
          prompt={prompt}
          onSelectPrompt={(p) => setPrompt(p)}
        />
      </div>
    </div>
  );
}
