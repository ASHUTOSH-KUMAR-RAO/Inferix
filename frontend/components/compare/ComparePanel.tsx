"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Star, Zap } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ModelCard from "@/components/compare/ModelCard";

const MODELS = [
  {
    id: "gemma:2b",
    label: "gemma:2b",
    color: "text-green-400",
    bg: "bg-green-500/[0.05]",
    border: "border-green-500/20",
    dot: "bg-green-500",
    glow: "rgba(34,197,94,0.5)",
    ramColor: "from-green-500 to-green-600",
  },
  {
    id: "phi3:mini",
    label: "phi3:mini",
    color: "text-blue-400",
    bg: "bg-blue-500/[0.05]",
    border: "border-blue-500/20",
    dot: "bg-blue-400",
    glow: "rgba(59,130,246,0.5)",
    ramColor: "from-blue-500 to-blue-600",
  },
  {
    id: "llama3.2:3b",
    label: "llama3.2:3b",
    color: "text-yellow-400",
    bg: "bg-yellow-500/[0.05]",
    border: "border-yellow-500/20",
    dot: "bg-yellow-400",
    glow: "rgba(234,179,8,0.5)",
    ramColor: "from-yellow-500 to-yellow-600",
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
};

interface ComparePanelProps {
  responses: ModelResponse[];
  hasCompared: boolean;
  prompt: string;
  onSelectPrompt: (prompt: string) => void;
}

const examplePrompts = [
  "Explain machine learning",
  "Write a haiku about AI",
  "What is recursion?",
  "Best practices for Python",
];

export default function ComparePanel({
  responses,
  hasCompared,
  prompt,
  onSelectPrompt,
}: ComparePanelProps) {
  const winner =
    responses.length > 0 && !responses.some((r) => r.isLoading)
      ? responses.reduce((a, b) => (a.score > b.score ? a : b))
      : null;

  return (
    <ScrollArea className="flex-1 w-full">
      <div className="px-3 sm:px-4 md:px-6 py-4 w-full max-w-[1100px] mx-auto">
        {!hasCompared ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-16 sm:py-24 text-center px-4"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mb-4">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" />
            </div>
            <h3 className="text-[15px] sm:text-[16px] font-medium text-white/55 mb-2">
              Compare all 3 models
            </h3>
            <p className="text-[12px] sm:text-[13px] text-white/22 max-w-[260px] sm:max-w-[300px] leading-relaxed mb-6">
              Enter a prompt above and see how gemma, phi3, and llama respond simultaneously
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {examplePrompts.map((p) => (
                <div
                  key={p}
                  onClick={() => onSelectPrompt(p)}
                  className="text-[11px] sm:text-[12px] text-white/30 border border-white/[0.08] px-3 py-1.5 rounded-full hover:bg-white/[0.04] hover:text-white/50 cursor-pointer transition-colors"
                >
                  {p}
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <div className="space-y-3 sm:space-y-4 w-full">
            {/* Winner Banner */}
            <AnimatePresence>
              {winner && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-yellow-500/[0.07] border border-yellow-500/20 rounded-[12px] px-3 sm:px-4 py-2.5 flex items-center gap-2.5"
                >
                  <Star className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0" />
                  <span className="text-[12px] sm:text-[13px] text-yellow-400/85 leading-snug">
                    <strong className="text-yellow-400">{winner.model}</strong>{" "}
                    scored highest with {winner.score}/10 quality score
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Cards — single col mobile, 3 col desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 w-full">
              {MODELS.map((model, i) => {
                const response = responses.find((r) => r.model === model.id);
                return (
                  <ModelCard
                    key={model.id}
                    model={model}
                    response={response}
                    isWinner={winner?.model === model.id}
                    index={i}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  );
}
