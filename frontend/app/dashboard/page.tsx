"use client";

import { motion } from "framer-motion";
import {
  MessageSquare,
  BarChart2,
  GitCompare,
  Zap,
  Activity,
  Clock,
  Cpu,
  Database,
} from "lucide-react";
import Link from "next/link";

const quickActions = [
  {
    icon: MessageSquare,
    label: "Start Chat",
    desc: "Chat with your local AI models",
    href: "/dashboard/chat",
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
  },
  {
    icon: GitCompare,
    label: "Compare Models",
    desc: "Side by side model comparison",
    href: "/dashboard/compare",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  {
    icon: BarChart2,
    label: "Benchmark",
    desc: "Run performance benchmarks",
    href: "/dashboard/benchmark",
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
  },
  {
    icon: Zap,
    label: "Templates",
    desc: "Use prompt templates library",
    href: "/dashboard/templates",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
  },
];

const stats = [
  {
    icon: Cpu,
    label: "Models Available",
    value: "3",
    sub: "gemma · phi3 · llama",
    color: "text-red-400",
    bg: "bg-red-500/10",
    bar: "bg-red-500",
    fill: 100,
  },
  {
    icon: Activity,
    label: "Inference",
    value: "Local",
    sub: "100% offline",
    color: "text-green-400",
    bg: "bg-green-500/10",
    bar: "bg-green-500",
    fill: 100,
  },
  {
    icon: Database,
    label: "API Cost",
    value: "$0",
    sub: "forever free",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    bar: "bg-blue-500",
    fill: 0,
  },
  {
    icon: Clock,
    label: "Data Sent",
    value: "0 bytes",
    sub: "to cloud",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    bar: "bg-yellow-500",
    fill: 0,
  },
];

const recentChats = [
  { title: "Explain quantum computing", model: "gemma:2b", time: "2m ago" },
  { title: "Write a Python script", model: "phi3:mini", time: "1h ago" },
  { title: "Summarize this article", model: "llama3.2:3b", time: "3h ago" },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] p-4 md:p-6 lg:p-8">
      <div className="max-w-[1000px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-between mb-6 flex-wrap gap-3"
        >
          <div>
            <h1 className="text-[20px] md:text-[24px] font-medium text-white tracking-[-0.5px] mb-1">
              Welcome to Inferix 👋
            </h1>
            <p className="text-[13px] text-white/35">
              Your private AI is ready. Run, benchmark, and compare models
              locally.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-3 py-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[12px] text-green-400">Ollama running</span>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -2, transition: { duration: 0.15 } }}
              className="bg-[#111] border border-white/[0.07] rounded-[14px] p-4"
            >
              <div
                className={`w-8 h-8 ${stat.bg} rounded-[8px] flex items-center justify-center mb-3`}
              >
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <div className="text-[18px] md:text-[22px] font-medium text-white tracking-[-0.5px] mb-0.5">
                {stat.value}
              </div>
              <div className="text-[11px] text-white/40 mb-2">{stat.label}</div>
              <div className="h-[2px] bg-white/[0.05] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stat.fill}%` }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                  className={`h-full rounded-full ${stat.bar}`}
                />
              </div>
              <div className="text-[10px] text-white/20 mt-1.5">{stat.sub}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Quick Actions — 2 cols */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="text-[11px] text-white/25 uppercase tracking-[1px] mb-3">
              Quick Actions
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {quickActions.map((action, i) => (
                <Link key={i} href={action.href}>
                  <motion.div
                    whileHover={{ y: -2, transition: { duration: 0.15 } }}
                    className={`bg-[#111] border ${action.border} rounded-[14px] p-4 cursor-pointer hover:bg-[#141414] transition-colors h-full`}
                  >
                    <div
                      className={`w-9 h-9 ${action.bg} rounded-[9px] flex items-center justify-center mb-3`}
                    >
                      <action.icon className={`w-4 h-4 ${action.color}`} />
                    </div>
                    <div className="text-[14px] font-medium text-white/85 mb-1">
                      {action.label}
                    </div>
                    <div className="text-[12px] text-white/30 leading-relaxed">
                      {action.desc}
                    </div>
                    <div className="text-[12px] text-white/20 mt-3">→</div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Recent Chats — 1 col */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <div className="text-[11px] text-white/25 uppercase tracking-[1px] mb-3">
              Recent Chats
            </div>
            <div className="bg-[#111] border border-white/[0.07] rounded-[14px] overflow-hidden">
              {recentChats.map((chat, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3.5 border-b border-white/[0.05] last:border-none hover:bg-white/[0.02] cursor-pointer transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MessageSquare className="w-3 h-3 text-red-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] text-white/70 truncate mb-1">
                      {chat.title}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-white/25 bg-white/[0.04] px-2 py-0.5 rounded-full">
                        {chat.model}
                      </span>
                      <span className="text-[10px] text-white/20">
                        {chat.time}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              <Link href="/dashboard/chat">
                <div className="p-3 text-center text-[12px] text-white/25 hover:text-white/50 transition-colors cursor-pointer">
                  View all chats →
                </div>
              </Link>
            </div>

            {/* Privacy Badge */}
            <div className="mt-3 bg-[#111] border border-white/[0.07] rounded-[14px] p-3.5 flex items-start gap-3">
              <div className="w-7 h-7 bg-green-500/10 rounded-[8px] flex items-center justify-center flex-shrink-0">
                🔒
              </div>
              <div>
                <div className="text-[12px] font-medium text-white/70 mb-0.5">
                  100% Private
                </div>
                <div className="text-[11px] text-white/25 leading-relaxed">
                  All inference runs locally via Ollama. Zero data leaves your
                  machine.
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
