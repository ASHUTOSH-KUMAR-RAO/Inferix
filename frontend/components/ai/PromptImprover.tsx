"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wand2, X, Check, Loader2 } from "lucide-react";

interface PromptImproverProps {
  prompt: string;
  onAccept: (improved: string) => void;
  onClose: () => void;
}

export default function PromptImprover({
  prompt,
  onAccept,
  onClose,
}: PromptImproverProps) {
  const [improved, setImproved] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleImprove() {
    setIsLoading(true);
    // Placeholder — backend se connect karenge
    setTimeout(() => {
      setImproved(
        `Please provide a comprehensive and detailed explanation of: ${prompt}. Include examples, key concepts, and practical applications.`,
      );
      setIsLoading(false);
    }, 1000);
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        className="bg-[#111] border border-yellow-500/20 rounded-[12px] p-3 mb-2"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Wand2 className="w-3.5 h-3.5 text-yellow-400" />
            <span className="text-[12px] text-yellow-400 font-medium">
              Prompt Improver
            </span>
          </div>
          <button onClick={onClose}>
            <X className="w-3.5 h-3.5 text-white/30 hover:text-white/60" />
          </button>
        </div>

        {/* Original */}
        <div className="bg-[#0a0a0a] rounded-[8px] px-3 py-2 mb-2">
          <div className="text-[10px] text-white/25 mb-1">Original</div>
          <div className="text-[12px] text-white/50">{prompt}</div>
        </div>

        {/* Improved */}
        {!improved && !isLoading && (
          <button
            onClick={handleImprove}
            className="w-full py-2 rounded-[8px] bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-[12px] hover:bg-yellow-500/15 transition-colors"
          >
            ✨ Improve this prompt
          </button>
        )}

        {isLoading && (
          <div className="flex items-center justify-center gap-2 py-2">
            <Loader2 className="w-3.5 h-3.5 text-yellow-400 animate-spin" />
            <span className="text-[12px] text-white/40">Improving...</span>
          </div>
        )}

        {improved && (
          <>
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-[8px] px-3 py-2 mb-2">
              <div className="text-[10px] text-yellow-400 mb-1">
                ✨ Improved
              </div>
              <div className="text-[12px] text-white/70">{improved}</div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={onClose}
                className="flex-1 py-1.5 rounded-[7px] text-[12px] text-white/40 border border-white/[0.08] hover:bg-white/[0.04] transition-colors"
              >
                Keep original
              </button>
              <button
                onClick={() => onAccept(improved)}
                className="flex-1 py-1.5 rounded-[7px] text-[12px] text-white font-medium bg-yellow-500 hover:bg-yellow-600 transition-colors flex items-center justify-center gap-1"
              >
                <Check className="w-3 h-3" />
                Use improved
              </button>
            </div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
