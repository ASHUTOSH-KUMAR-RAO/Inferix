"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, FileText, Zap, Clock, Cpu, Star, Shield, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const radarData = [
  { metric: "Speed", gemma: 90, phi3: 65, llama: 45 },
  { metric: "Quality", gemma: 72, phi3: 86, llama: 91 },
  { metric: "RAM Eff.", gemma: 95, phi3: 70, llama: 80 },
  { metric: "Latency", gemma: 85, phi3: 70, llama: 50 },
  { metric: "Accuracy", gemma: 70, phi3: 85, llama: 92 },
];

const models = [
  {
    name: "gemma:2b",
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
    tokensPerSec: 52,
    latency: 310,
    ram: "1.6 GB",
    score: 7.2,
    bestFor: ["Speed", "Lightweight tasks", "Quick responses"],
    weakAt: ["Complex reasoning", "Long context"],
  },
  {
    name: "phi3:mini",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    tokensPerSec: 38,
    latency: 420,
    ram: "2.3 GB",
    score: 8.6,
    bestFor: ["Balanced tasks", "Code generation", "Analysis"],
    weakAt: ["Very long documents", "Creative writing"],
  },
  {
    name: "llama3.2:3b",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
    tokensPerSec: 28,
    latency: 580,
    ram: "2.0 GB",
    score: 9.1,
    bestFor: ["Complex reasoning", "High quality output", "Research"],
    weakAt: ["Speed sensitive tasks", "Resource constrained"],
  },
];

const tradeoffs = [
  {
    icon: Zap,
    title: "Speed vs Quality",
    desc: "gemma:2b is 85% faster than llama3.2:3b but scores 21% lower on quality. For real-time applications, gemma wins. For accuracy-critical tasks, llama is better.",
    winner: "gemma:2b for speed · llama3.2:3b for quality",
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
  },
  {
    icon: Cpu,
    title: "RAM Usage",
    desc: "gemma:2b uses only 1.6GB RAM — ideal for 8GB systems. phi3:mini needs 2.3GB but delivers significantly better quality. llama3.2:3b balances at 2.0GB with best quality.",
    winner: "gemma:2b for low RAM · phi3:mini for balance",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
  },
  {
    icon: Shield,
    title: "Privacy",
    desc: "All 3 models run 100% locally via Ollama. Zero prompts leave your machine. No API keys needed. No usage limits. Complete data sovereignty.",
    winner: "All models — 100% private",
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
  },
  {
    icon: TrendingUp,
    title: "Cost Analysis",
    desc: "Cloud AI costs $0.01-0.06 per 1K tokens. Running 1M tokens locally = $0. Inferix pays for itself in hours vs cloud alternatives.",
    winner: "$0 — forever free locally",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a1a1a] border border-white/10 rounded-[10px] px-3 py-2">
        <p className="text-[12px] text-white/60 mb-1">{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} className="text-[12px]" style={{ color: p.color }}>
            {p.name}: {p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function ReportPage() {
  const [exporting, setExporting] = useState(false);

  function handleExport() {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
    }, 1500);
  }

  return (
    <div className="bg-[#0a0a0a] min-h-screen">

      {/* Header */}
      <div className="px-4 md:px-6 py-4 border-b border-white/[0.06]">
        <div className="max-w-[900px] mx-auto flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-[18px] font-medium text-white tracking-[-0.4px] mb-0.5">
              Tradeoff Report
            </h1>
            <p className="text-[13px] text-white/30">
              Quality vs Speed analysis across all 3 models
            </p>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleExport}
            disabled={exporting}
            className="flex items-center gap-2 px-4 py-2 rounded-[8px] bg-red-500 text-white text-[13px] font-medium hover:bg-red-600 transition-colors disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5" />
            {exporting ? "Exporting..." : "Export PDF"}
          </motion.button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 md:px-6 py-4 max-w-[900px] mx-auto space-y-4 pb-10">

        {/* Summary Cards */}
        <div>
          <div className="text-[11px] text-white/25 uppercase tracking-[0.8px] mb-3">
            Model Summary
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {models.map((model, i) => (
              <motion.div
                key={model.name}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`bg-[#111] border ${model.border} rounded-[14px] p-4`}
              >
                {/* Model Name */}
                <div className={`text-[14px] font-medium ${model.color} mb-3`}>
                  {model.name}
                </div>

                {/* Stats */}
                <div className="space-y-2 mb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Zap className="w-3 h-3 text-green-400" />
                      <span className="text-[11px] text-white/30">Speed</span>
                    </div>
                    <span className="text-[12px] text-white/60">{model.tokensPerSec} tok/s</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-blue-400" />
                      <span className="text-[11px] text-white/30">Latency</span>
                    </div>
                    <span className="text-[12px] text-white/60">{model.latency}ms</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Cpu className="w-3 h-3 text-yellow-400" />
                      <span className="text-[11px] text-white/30">RAM</span>
                    </div>
                    <span className="text-[12px] text-white/60">{model.ram}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Star className="w-3 h-3 text-red-400" />
                      <span className="text-[11px] text-white/30">Quality</span>
                    </div>
                    <span className="text-[12px] text-white/60">{model.score}/10</span>
                  </div>
                </div>

                {/* Best For */}
                <div className="mb-2">
                  <div className="text-[10px] text-white/20 mb-1.5">Best for</div>
                  <div className="flex flex-wrap gap-1">
                    {model.bestFor.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className={`text-[9px] px-1.5 py-0 ${model.bg} ${model.color} ${model.border}`}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Weak At */}
                <div>
                  <div className="text-[10px] text-white/20 mb-1.5">Weak at</div>
                  <div className="flex flex-wrap gap-1">
                    {model.weakAt.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-[9px] px-1.5 py-0 bg-white/[0.03] text-white/30 border-white/[0.08]"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Radar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#111] border border-white/[0.07] rounded-[14px] p-4"
        >
          <div className="text-[12px] text-white/40 mb-4">
            Overall Performance Comparison
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(255,255,255,0.06)" />
              <PolarAngleAxis
                dataKey="metric"
                tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }}
              />
              <Radar name="gemma:2b" dataKey="gemma" stroke="#22c55e" fill="#22c55e" fillOpacity={0.15} />
              <Radar name="phi3:mini" dataKey="phi3" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.15} />
              <Radar name="llama3.2:3b" dataKey="llama" stroke="#eab308" fill="#eab308" fillOpacity={0.15} />
              <Legend formatter={(value) => (
                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>{value}</span>
              )} />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Tradeoffs */}
        <div>
          <div className="text-[11px] text-white/25 uppercase tracking-[0.8px] mb-3">
            Tradeoff Analysis
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {tradeoffs.map((t, i) => (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className={`bg-[#111] border ${t.border} rounded-[14px] p-4`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-7 h-7 ${t.bg} rounded-[7px] flex items-center justify-center flex-shrink-0`}>
                    <t.icon className={`w-3.5 h-3.5 ${t.color}`} />
                  </div>
                  <h3 className={`text-[13px] font-medium ${t.color}`}>{t.title}</h3>
                </div>
                <p className="text-[12px] text-white/35 leading-relaxed mb-3">
                  {t.desc}
                </p>
                <div className={`text-[11px] ${t.color} ${t.bg} border ${t.border} px-3 py-1.5 rounded-full inline-block`}>
                  ✓ {t.winner}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Privacy Note */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-[#111] border border-white/[0.07] rounded-[14px] p-4 flex items-start gap-3"
        >
          <div className="w-8 h-8 bg-green-500/10 rounded-[8px] flex items-center justify-center flex-shrink-0">
            <Shield className="w-4 h-4 text-green-400" />
          </div>
          <div>
            <div className="text-[13px] font-medium text-white/70 mb-1">
              Privacy & Cost Summary
            </div>
            <div className="text-[12px] text-white/30 leading-relaxed">
              All benchmarks run entirely on your local hardware via Ollama. Zero API costs. Zero data sent to cloud during inference. Only conversation history syncs to NeonDB for persistence.
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
