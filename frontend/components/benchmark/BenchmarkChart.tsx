"use client";

import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  Legend,
} from "recharts";

type BenchmarkResult = {
  model: string;
  tokensPerSec: number;
  latency: number;
  ram: string;
  score: number;
};

interface BenchmarkChartProps {
  results: BenchmarkResult[];
}

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

export default function BenchmarkChart({ results }: BenchmarkChartProps) {
  const speedData = results.map((r) => ({
    model: r.model,
    speed: r.tokensPerSec,
  }));

  const latencyData = results.map((r) => ({
    model: r.model,
    latency: r.latency,
  }));

  const radarData = [
    {
      metric: "Speed",
      gemma: 90,
      phi3: 65,
      llama: 45,
    },
    {
      metric: "Quality",
      gemma: 72,
      phi3: 86,
      llama: 91,
    },
    {
      metric: "RAM Eff.",
      gemma: 95,
      phi3: 70,
      llama: 80,
    },
    {
      metric: "Latency",
      gemma: 85,
      phi3: 70,
      llama: 50,
    },
    {
      metric: "Accuracy",
      gemma: 70,
      phi3: 85,
      llama: 92,
    },
  ];

  return (
    <div className="space-y-4">
      {/* Speed + Latency Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Speed */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#111] border border-white/[0.07] rounded-[14px] p-4"
        >
          <div className="text-[12px] text-white/40 mb-4">
            Speed (tokens/sec)
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={speedData} barSize={32}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.04)"
              />
              <XAxis
                dataKey="model"
                tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="speed"
                fill="#22c55e"
                radius={[4, 4, 0, 0]}
                name="tok/s"
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Latency */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#111] border border-white/[0.07] rounded-[14px] p-4"
        >
          <div className="text-[12px] text-white/40 mb-4">Latency (ms)</div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={latencyData} barSize={32}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.04)"
              />
              <XAxis
                dataKey="model"
                tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="latency"
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
                name="ms"
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Radar Chart */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-[#111] border border-white/[0.07] rounded-[14px] p-4"
      >
        <div className="text-[12px] text-white/40 mb-4">Overall Comparison</div>
        <ResponsiveContainer width="100%" height={240}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="rgba(255,255,255,0.06)" />
            <PolarAngleAxis
              dataKey="metric"
              tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }}
            />
            <Radar
              name="gemma:2b"
              dataKey="gemma"
              stroke="#22c55e"
              fill="#22c55e"
              fillOpacity={0.15}
            />
            <Radar
              name="phi3:mini"
              dataKey="phi3"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.15}
            />
            <Radar
              name="llama3.2:3b"
              dataKey="llama"
              stroke="#eab308"
              fill="#eab308"
              fillOpacity={0.15}
            />
            <Legend
              formatter={(value) => (
                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>
                  {value}
                </span>
              )}
            />
            <Tooltip content={<CustomTooltip />} />
          </RadarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
