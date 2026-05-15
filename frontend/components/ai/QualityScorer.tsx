"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface QualityScorerProps {
  score: number;
  reasoning?: string;
}

export default function QualityScorer({
  score,
  reasoning,
}: QualityScorerProps) {
  const color =
    score >= 8
      ? "text-green-400"
      : score >= 6
        ? "text-yellow-400"
        : "text-red-400";

  const bg =
    score >= 8
      ? "bg-green-500/10 border-green-500/20"
      : score >= 6
        ? "bg-yellow-500/10 border-yellow-500/20"
        : "bg-red-500/10 border-red-500/20";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${bg}`}
    >
      <Star className={`w-3 h-3 ${color}`} />
      <span className={`text-[11px] font-medium ${color}`}>{score}/10</span>
      {reasoning && (
        <span className="text-[10px] text-white/30 ml-1">{reasoning}</span>
      )}
    </motion.div>
  );
}
