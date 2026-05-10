"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Zap, Clock, Cpu, Star } from "lucide-react";
import ReactMarkdown from "react-markdown";

type ModelResponse = {
  model: string;
  content: string;
  tokensPerSec: number;
  latency: number;
  ram: string;
  score: number;
  isLoading: boolean;
};

interface ModelCardProps {
  model: {
    id: string;
    label: string;
    color: string;
    bg: string;
    border: string;
    dot: string;
    glow: string;
    ramColor: string;
  };
  response?: ModelResponse;
  isWinner: boolean;
  index: number;
}

function ramToPercent(ram: string): number {
  const val = parseFloat(ram);
  return Math.min((val / 4) * 100, 100);
}

export default function ModelCard({
  model,
  response,
  isWinner,
  index,
}: ModelCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className={`bg-[#111] border rounded-[14px] overflow-hidden flex flex-col w-full min-w-0 transition-all ${
        isWinner
          ? "border-yellow-500/30 shadow-[0_0_24px_rgba(234,179,8,0.07)]"
          : "border-white/[0.07]"
      }`}
    >
      {/* Header */}
      <div
        className={`px-3 sm:px-4 py-2.5 border-b border-white/[0.05] flex items-center justify-between flex-wrap gap-1 ${model.bg}`}
      >
        <div className="flex items-center gap-2 min-w-0">
          <div
            className={`w-2 h-2 rounded-full flex-shrink-0 ${model.dot}`}
            style={{ boxShadow: `0 0 5px ${model.glow}` }}
          />
          <span
            className={`text-[12px] sm:text-[13px] font-medium truncate ${model.color}`}
          >
            {model.label}
          </span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {response && !response.isLoading && (
            <span className="text-[10px] text-white/25">
              {response.tokensPerSec} tok/s
            </span>
          )}
          {isWinner && (
            <Badge className="bg-yellow-500/12 text-yellow-400/85 border-yellow-500/25 text-[10px] px-2 py-0.5 whitespace-nowrap">
              ⭐ Best
            </Badge>
          )}
        </div>
      </div>

      {/* RAM Bar */}
      {response && !response.isLoading && (
        <div className="px-3 sm:px-4 py-2 border-b border-white/[0.04]">
          <div className="flex justify-between mb-1.5">
            <span className="text-[10px] text-white/22">RAM usage</span>
            <span className="text-[10px] text-white/22">{response.ram}</span>
          </div>
          <div className="h-[2px] bg-white/[0.06] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${ramToPercent(response.ram)}%` }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              className={`h-full rounded-full bg-gradient-to-r ${model.ramColor}`}
            />
          </div>
        </div>
      )}

      {/* Response Body */}
      <div className="p-3 sm:p-4 flex-1 min-h-[120px] sm:min-h-[140px]">
        {!response || response.isLoading ? (
          <div className="flex items-center justify-center gap-2 py-8">
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                  className="w-1.5 h-1.5 rounded-full bg-white/25"
                />
              ))}
            </div>
            <span className="text-[11px] sm:text-[12px] text-white/25">
              Generating...
            </span>
          </div>
        ) : (
          <div className="text-[12px] sm:text-[13px] text-white/60 leading-relaxed prose prose-invert prose-sm max-w-none break-words">
            <ReactMarkdown>{response.content}</ReactMarkdown>
          </div>
        )}
      </div>

      {/* Benchmark Footer */}
      {response && !response.isLoading && (
        <div className="px-3 sm:px-4 py-2.5 border-t border-white/[0.05] grid grid-cols-2 gap-x-2 gap-y-1.5">
          {[
            {
              icon: <Zap className="w-3 h-3 text-green-400 flex-shrink-0" />,
              val: `${response.tokensPerSec}`,
              unit: "tok/s",
            },
            {
              icon: <Clock className="w-3 h-3 text-blue-400 flex-shrink-0" />,
              val: `${response.latency}`,
              unit: "ms",
            },
            {
              icon: <Cpu className="w-3 h-3 text-yellow-400 flex-shrink-0" />,
              val: response.ram,
              unit: "",
            },
            {
              icon: <Star className="w-3 h-3 text-red-400 flex-shrink-0" />,
              val: `${response.score}`,
              unit: "/10",
              highlight: true,
            },
          ].map((m, mi) => (
            <div key={mi} className="flex items-center gap-1.5 min-w-0">
              {m.icon}
              <span className="text-[11px] truncate">
                {m.highlight ? (
                  <span className="bg-red-500/[0.08] px-1.5 py-0.5 rounded text-red-400/80">
                    {m.val}
                  </span>
                ) : (
                  <span className="text-white/35">{m.val}</span>
                )}
                {m.unit && (
                  <span className="text-white/20 ml-0.5 text-[10px]">
                    {m.unit}
                  </span>
                )}
              </span>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
