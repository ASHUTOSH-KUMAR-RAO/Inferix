"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, X } from "lucide-react";
import { MODELS } from "@/types/models";

interface ModelRecommenderProps {
  recommendedModel: string;
  reason: string;
  onSelect: (model: string) => void;
  onDismiss: () => void;
}

export default function ModelRecommender({
  recommendedModel,
  reason,
  onSelect,
  onDismiss,
}: ModelRecommenderProps) {
  const model = MODELS.find((m) => m.id === recommendedModel);

  if (!model) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        className="bg-[#111] border border-blue-500/20 rounded-[12px] px-4 py-3 flex items-center justify-between gap-3 mb-3"
      >
        <div className="flex items-start gap-2">
          <Lightbulb className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-[12px] text-blue-400 font-medium mb-0.5">
              Recommended: {model.label}
            </div>
            <div className="text-[11px] text-white/35">{reason}</div>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => onSelect(recommendedModel)}
            className={`text-[11px] px-2.5 py-1 rounded-full ${model.bg} ${model.color} border ${model.border} hover:opacity-80 transition-opacity`}
          >
            Switch
          </button>
          <button onClick={onDismiss}>
            <X className="w-3.5 h-3.5 text-white/25 hover:text-white/50" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
