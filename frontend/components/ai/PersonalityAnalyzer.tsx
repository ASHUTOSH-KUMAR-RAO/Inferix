"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import { MODELS } from "@/types/models";

type PersonalityTrait = {
  label: string;
  value: number;
  color: string;
};

type ModelPersonality = {
  model: string;
  traits: PersonalityTrait[];
  summary: string;
};

interface PersonalityAnalyzerProps {
  responses: Array<{
    model: string;
    content: string;
  }>;
}

const MOCK_PERSONALITIES: Record<string, ModelPersonality> = {
  "gemma:2b": {
    model: "gemma:2b",
    summary: "Fast and direct. Prefers concise answers with minimal elaboration. Great for quick tasks.",
    traits: [
      { label: "Speed", value: 95, color: "bg-green-500" },
      { label: "Creativity", value: 60, color: "bg-purple-500" },
      { label: "Accuracy", value: 72, color: "bg-blue-500" },
      { label: "Verbosity", value: 40, color: "bg-yellow-500" },
      { label: "Reasoning", value: 65, color: "bg-red-500" },
    ],
  },
  "phi3:mini": {
    model: "phi3:mini",
    summary: "Balanced and thoughtful. Good at structured responses. Excels at coding and analysis.",
    traits: [
      { label: "Speed", value: 65, color: "bg-green-500" },
      { label: "Creativity", value: 75, color: "bg-purple-500" },
      { label: "Accuracy", value: 86, color: "bg-blue-500" },
      { label: "Verbosity", value: 70, color: "bg-yellow-500" },
      { label: "Reasoning", value: 82, color: "bg-red-500" },
    ],
  },
  "llama3.2:3b": {
    model: "llama3.2:3b",
    summary: "Deep and comprehensive. Provides detailed explanations. Best for complex reasoning tasks.",
    traits: [
      { label: "Speed", value: 45, color: "bg-green-500" },
      { label: "Creativity", value: 88, color: "bg-purple-500" },
      { label: "Accuracy", value: 91, color: "bg-blue-500" },
      { label: "Verbosity", value: 90, color: "bg-yellow-500" },
      { label: "Reasoning", value: 94, color: "bg-red-500" },
    ],
  },
};

export default function PersonalityAnalyzer({ responses }: PersonalityAnalyzerProps) {
  const [personalities, setPersonalities] = useState<ModelPersonality[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  async function handleAnalyze() {
    setIsLoading(true);
    setExpanded(true);

    // Placeholder — backend se connect karenge baad mein
    setTimeout(() => {
      const results = responses.map((r) => MOCK_PERSONALITIES[r.model]).filter(Boolean);
      setPersonalities(results);
      setIsLoading(false);
      setAnalyzed(true);
    }, 1500);
  }

  return (
    <div className="bg-[#111] border border-pink-500/20 rounded-[14px] overflow-hidden">
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-white/[0.02] transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-pink-400" />
          <span className="text-[13px] font-medium text-pink-400">
            Personality Analyzer
          </span>
        </div>
        <button className="text-white/30 hover:text-white/60 transition-colors">
          {expanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-white/[0.05]"
          >
            <div className="p-4">
              {/* Analyze Button */}
              {!analyzed && !isLoading && (
                <button
                  onClick={handleAnalyze}
                  className="w-full py-2.5 rounded-[10px] bg-pink-500/10 border border-pink-500/20 text-pink-400 text-[13px] hover:bg-pink-500/15 transition-colors"
                >
                  ✨ Analyze model personalities
                </button>
              )}

              {/* Loading */}
              {isLoading && (
                <div className="flex items-center justify-center gap-2 py-4">
                  <Loader2 className="w-4 h-4 text-pink-400 animate-spin" />
                  <span className="text-[13px] text-white/40">
                    Analyzing personalities...
                  </span>
                </div>
              )}

              {/* Results */}
              {analyzed && personalities.length > 0 && (
                <div className="space-y-4">
                  {personalities.map((p, i) => {
                    const model = MODELS.find((m) => m.id === p.model);
                    return (
                      <motion.div
                        key={p.model}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-[#0a0a0a] border border-white/[0.06] rounded-[12px] p-3"
                      >
                        {/* Model Name */}
                        <div className={`text-[13px] font-medium ${model?.color || "text-white/70"} mb-1.5`}>
                          {p.model}
                        </div>

                        {/* Summary */}
                        <p className="text-[12px] text-white/40 leading-relaxed mb-3">
                          {p.summary}
                        </p>

                        {/* Traits */}
                        <div className="space-y-2">
                          {p.traits.map((trait) => (
                            <div key={trait.label}>
                              <div className="flex justify-between mb-1">
                                <span className="text-[11px] text-white/30">
                                  {trait.label}
                                </span>
                                <span className="text-[11px] text-white/40">
                                  {trait.value}%
                                </span>
                              </div>
                              <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${trait.value}%` }}
                                  transition={{ delay: i * 0.1 + 0.3, duration: 0.8, ease: "easeOut" }}
                                  className={`h-full rounded-full ${trait.color}`}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    );
                  })}

                  {/* Re-analyze */}
                  <button
                    onClick={() => {
                      setAnalyzed(false);
                      setPersonalities([]);
                    }}
                    className="w-full py-2 rounded-[8px] text-[12px] text-white/30 border border-white/[0.08] hover:bg-white/[0.04] transition-colors"
                  >
                    Re-analyze
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
