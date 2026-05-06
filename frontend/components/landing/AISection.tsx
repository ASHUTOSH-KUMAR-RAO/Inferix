"use client";

import { motion } from "framer-motion";

const chatMessages = [
  {
    type: "user",
    text: "What is the difference between gemma and phi3?",
  },
  {
    type: "ai",
    text: "Gemma:2b prioritises speed — it runs at 52 tok/s on your hardware with 1.6GB RAM usage. Phi3:mini is slower at 38 tok/s but scores significantly higher on reasoning tasks (8.6 vs 7.2 out of 10)...",
    tags: ["Quality: 9.1/10", "44 tok/s"],
  },
  {
    type: "user",
    text: "Which model should I use for coding?",
  },
  {
    type: "ai",
    text: "For coding tasks, phi3:mini is recommended — it scores 8.8/10 on code quality vs gemma's 7.1/10, with only 18% speed tradeoff.",
  },
];

const stats = [
  {
    label: "Speed · gemma:2b",
    value: "52",
    unit: "tok/s",
    barWidth: "78%",
    barColor: "from-red-500 to-orange-500",
    extra: true,
  },
  {
    label: "Quality score",
    value: "9.1",
    unit: "/ 10",
    barWidth: "91%",
    barColor: "from-green-500 to-green-600",
  },
  {
    label: "RAM usage",
    value: "1.6",
    unit: "GB",
    barWidth: "32%",
    barColor: "from-amber-500 to-amber-600",
  },
];

const aiFeats = [
  {
    icon: "💻",
    iconBg: "bg-red-500/10",
    title: "Ask Anything.",
    accent: "Locally.",
    accentColor: "text-red-400",
    desc: "Full AI power without a single byte leaving your machine.",
  },
  {
    icon: "📊",
    iconBg: "bg-green-500/10",
    title: "Always Benchmarked.",
    accent: "Scored.",
    accentColor: "text-green-400",
    desc: "Every response rated for quality, speed, and accuracy.",
  },
  {
    icon: "✨",
    iconBg: "bg-amber-500/10",
    title: "Prompt Assistant.",
    accent: "Auto-improved.",
    accentColor: "text-amber-400",
    desc: "Inferix upgrades your prompts before sending.",
  },
];

export default function AISection() {
  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 border-b border-white/[0.06] bg-[#0a0a0a] relative overflow-hidden">

      {/* Glows */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[300px] sm:w-[600px] h-[240px] sm:h-[320px] rounded-full bg-red-900/[0.28] blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-16 -right-10 w-[240px] sm:w-[400px] h-[200px] sm:h-[300px] rounded-full bg-red-900/[0.18] blur-[90px] pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-[220px] sm:w-[350px] h-[180px] sm:h-[260px] rounded-full bg-red-900/[0.14] blur-[80px] pointer-events-none" />

      <div className="max-w-[900px] mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="text-[11px] text-red-500 tracking-[1.2px] uppercase mb-3">
            AI
          </div>
          <h2 className="text-[clamp(24px,5vw,42px)] font-medium tracking-[-1px] leading-[1.15] mb-2.5">
            Your AI just got{" "}
            <span className="text-white/20">smarter.</span>
          </h2>
          <p className="text-[13px] sm:text-[14px] text-white/28 leading-relaxed">
            AI where it's most useful — running entirely on your OS.
          </p>
        </motion.div>

        {/* Stat Cards — 3 col on md+, 1 col on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 mb-3 sm:mb-4"
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="bg-[#0f0f0f] border border-white/[0.07] rounded-[12px] px-4 py-3.5 hover:border-white/[0.13] transition-colors"
            >
              <div className="text-[10px] text-white/28 mb-1.5 tracking-[0.3px]">
                {s.label}
              </div>
              <div className="text-[22px] font-medium text-white/88 tracking-[-0.6px] leading-none">
                {s.value}
                <span className="text-[11px] text-white/30 font-normal ml-1">
                  {s.unit}
                </span>
              </div>
              <div className="h-[3px] bg-white/[0.06] rounded-full mt-2 overflow-hidden">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${s.barColor}`}
                  style={{ width: s.barWidth }}
                />
              </div>
              {s.extra && (
                <div className="inline-flex items-center gap-1.5 mt-2 bg-red-500/10 border border-red-500/20 text-red-400/85 text-[10px] px-2 py-0.5 rounded-full">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  Local
                </div>
              )}
            </div>
          ))}
        </motion.div>

        {/* Chat Window — no sidebar on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="bg-[#0f0f0f] border border-white/[0.08] rounded-[14px] overflow-hidden mb-3 sm:mb-4"
        >
          {/* Topbar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#0c0c0c] border-b border-white/[0.05]">
            <span className="text-[12px] text-white/30">Inferix — AI Chat</span>
            <span className="text-[10px] bg-red-500/10 text-red-400/85 border border-red-500/20 px-2.5 py-0.5 rounded-full">
              gemma:2b
            </span>
          </div>

          {/* Body — sidebar only on sm+ */}
          <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr]">

            {/* Sidebar — hidden on mobile */}
            <div className="hidden sm:block border-r border-white/[0.05] p-3">
              {["New Chat", "Benchmark llama vs phi3", "Explain attention...", "Write Python code..."].map((item, i) => (
                <div
                  key={item}
                  className={`text-[11px] px-2 py-1.5 rounded-[7px] mb-1 cursor-default ${
                    i === 0
                      ? "bg-white/[0.05] text-white/75"
                      : "text-white/30 hover:bg-white/[0.03]"
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>

            {/* Messages */}
            <div className="flex flex-col gap-2.5 p-3 sm:p-4">
              {chatMessages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.35 }}
                  className={`${
                    msg.type === "user"
                      ? "self-end max-w-[80%]"
                      : "self-start max-w-[88%]"
                  }`}
                >
                  <div
                    className={`text-[12px] px-3 py-2 rounded-[10px] leading-[1.55] ${
                      msg.type === "user"
                        ? "bg-red-500/12 text-white/82 rounded-br-[3px]"
                        : "bg-white/[0.04] text-white/55 rounded-bl-[3px]"
                    }`}
                  >
                    {msg.text}
                  </div>
                  {msg.tags && (
                    <div className="flex gap-1.5 mt-1.5 flex-wrap">
                      {msg.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] bg-green-500/10 border border-green-500/20 text-green-400/85 px-2 py-0.5 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Feature Strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-3 bg-white/[0.04] rounded-[14px] overflow-hidden"
        >
          {aiFeats.map((feat, i) => (
            <div
              key={i}
              className={`px-4 sm:px-5 py-4 sm:py-5 bg-[#0a0a0a] hover:bg-[#0e0e0e] transition-colors ${
                i !== aiFeats.length - 1
                  ? "border-b sm:border-b-0 sm:border-r border-white/[0.05]"
                  : ""
              }`}
            >
              <div
                className={`w-8 h-8 ${feat.iconBg} rounded-[8px] flex items-center justify-center text-[14px] mb-3`}
              >
                {feat.icon}
              </div>
              <h4 className="text-[12px] sm:text-[13px] font-medium text-white/82 mb-1.5 leading-snug">
                {feat.title}{" "}
                <span className={feat.accentColor}>{feat.accent}</span>
              </h4>
              <p className="text-[11px] text-white/28 leading-[1.65]">
                {feat.desc}
              </p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
