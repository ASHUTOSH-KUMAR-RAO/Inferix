"use client";

import { motion } from "framer-motion";
import { Zap, Clock, Cpu, Star } from "lucide-react";

interface BenchmarkBarProps {
  tokensPerSec: number;
  latency: number;
  ram: string;
  score: number;
  model: string;
}

export default function BenchmarkBar({
  tokensPerSec,
  latency,
  ram,
  score,
  model,
}: BenchmarkBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3 flex-wrap mt-2"
    >
      <div className="flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 px-2.5 py-1 rounded-full">
        <Zap className="w-3 h-3 text-green-400" />
        <span className="text-[11px] text-green-400">{tokensPerSec} tok/s</span>
      </div>
      <div className="flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-full">
        <Clock className="w-3 h-3 text-blue-400" />
        <span className="text-[11px] text-blue-400">{latency}ms</span>
      </div>
      <div className="flex items-center gap-1.5 bg-yellow-500/10 border border-yellow-500/20 px-2.5 py-1 rounded-full">
        <Cpu className="w-3 h-3 text-yellow-400" />
        <span className="text-[11px] text-yellow-400">{ram}</span>
      </div>
      <div className="flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 px-2.5 py-1 rounded-full">
        <Star className="w-3 h-3 text-red-400" />
        <span className="text-[11px] text-red-400">{score}/10</span>
      </div>
      <span className="text-[10px] text-white/20">{model}</span>
    </motion.div>
  );
}
