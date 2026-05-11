"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Clock, Zap, Star, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

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

interface BenchmarkHistoryProps {
  history: HistoryEntry[];
  onDelete: (id: string) => void;
}

const MODEL_COLORS: Record<string, string> = {
  "gemma:2b": "text-green-400",
  "phi3:mini": "text-blue-400",
  "llama3.2:3b": "text-yellow-400",
};

export default function BenchmarkHistory({
  history,
  onDelete,
}: BenchmarkHistoryProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (history.length === 0) {
    return (
      <div className="bg-[#111] border border-white/[0.07] rounded-[14px] p-8 text-center">
        <Clock className="w-8 h-8 text-white/15 mx-auto mb-3" />
        <p className="text-[13px] text-white/25">No benchmark history yet</p>
        <p className="text-[11px] text-white/15 mt-1">
          Run a benchmark to see results here
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <AnimatePresence>
        {history.map((entry, i) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ delay: i * 0.05 }}
            className="bg-[#111] border border-white/[0.07] rounded-[14px] overflow-hidden"
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-white/[0.02] transition-colors"
              onClick={() =>
                setExpandedId(expandedId === entry.id ? null : entry.id)
              }
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-7 h-7 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Zap className="w-3.5 h-3.5 text-red-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] text-white/70 truncate">
                    {entry.prompt}
                  </p>
                  <p className="text-[11px] text-white/25">{entry.timestamp}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(entry.id);
                  }}
                  className="text-white/20 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                {expandedId === entry.id ? (
                  <ChevronUp className="w-4 h-4 text-white/25" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-white/25" />
                )}
              </div>
            </div>

            {/* Expanded Results */}
            <AnimatePresence>
              {expandedId === entry.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 border-t border-white/[0.05]">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
                      {entry.results.map((r) => (
                        <div
                          key={r.model}
                          className="bg-[#0a0a0a] border border-white/[0.06] rounded-[10px] p-3"
                        >
                          <div
                            className={`text-[12px] font-medium mb-2 ${MODEL_COLORS[r.model] || "text-white/60"}`}
                          >
                            {r.model}
                          </div>
                          <div className="grid grid-cols-2 gap-1.5">
                            <div>
                              <div className="text-[10px] text-white/25 mb-0.5">
                                Speed
                              </div>
                              <div className="text-[12px] text-white/60">
                                {r.tokensPerSec} tok/s
                              </div>
                            </div>
                            <div>
                              <div className="text-[10px] text-white/25 mb-0.5">
                                Latency
                              </div>
                              <div className="text-[12px] text-white/60">
                                {r.latency}ms
                              </div>
                            </div>
                            <div>
                              <div className="text-[10px] text-white/25 mb-0.5">
                                RAM
                              </div>
                              <div className="text-[12px] text-white/60">
                                {r.ram}
                              </div>
                            </div>
                            <div>
                              <div className="text-[10px] text-white/25 mb-0.5">
                                Score
                              </div>
                              <div className="text-[12px] text-white/60">
                                {r.score}/10
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
