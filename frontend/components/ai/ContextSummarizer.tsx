"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import type { Message } from "@/types/index";

interface ContextSummarizerProps {
  messages: Message[];
  threshold?: number;
}

export default function ContextSummarizer({
  messages,
  threshold = 10,
}: ContextSummarizerProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const shouldSummarize = messages.length >= threshold;

  async function handleSummarize() {
    setIsLoading(true);
    // Placeholder — backend se connect karenge
    setTimeout(() => {
      setSummary(
        `This conversation covers ${messages.length} messages discussing various AI topics. The user has asked questions about model performance, benchmarking, and local AI inference. Key points discussed include model speed comparisons and privacy benefits.`,
      );
      setIsLoading(false);
      setExpanded(true);
    }, 1200);
  }

  if (!shouldSummarize) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        className="bg-[#111] border border-purple-500/20 rounded-[12px] p-3 mb-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-[12px] text-purple-400 font-medium">
              Context Summarizer
            </span>
            <span className="text-[11px] text-white/25">
              {messages.length} messages
            </span>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-white/30 hover:text-white/60 transition-colors"
          >
            {expanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 overflow-hidden"
            >
              {!summary && !isLoading && (
                <button
                  onClick={handleSummarize}
                  className="w-full py-2 rounded-[8px] bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[12px] hover:bg-purple-500/15 transition-colors"
                >
                  🧠 Summarize conversation
                </button>
              )}

              {isLoading && (
                <div className="flex items-center justify-center gap-2 py-2">
                  <Loader2 className="w-3.5 h-3.5 text-purple-400 animate-spin" />
                  <span className="text-[12px] text-white/40">
                    Summarizing...
                  </span>
                </div>
              )}

              {summary && (
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-[8px] px-3 py-2">
                  <div className="text-[10px] text-purple-400 mb-1">
                    Summary
                  </div>
                  <div className="text-[12px] text-white/55 leading-relaxed">
                    {summary}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
