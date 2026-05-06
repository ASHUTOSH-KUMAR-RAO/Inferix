"use client";

import { motion } from "framer-motion";

const localItems = [
  "All model inference via Ollama",
  "Prompt processing",
  "Response generation",
  "Voice input processing",
  "Benchmark computation",
];

const cloudItems = [
  "Conversation history",
  "Saved benchmark results",
  "Prompt templates",
  "User preferences",
  "Generated reports",
];

export default function Privacy() {
  return (
    <section className="py-14 sm:py-20 px-4 sm:px-6 bg-[#0a0a0a] border-b border-white/[0.06] relative overflow-hidden">

      {/* Glows */}
      <div className="absolute -top-16 -right-10 w-[280px] sm:w-[420px] h-[240px] sm:h-[300px] rounded-full bg-red-900/[0.22] blur-[90px] pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-[240px] sm:w-[360px] h-[200px] sm:h-[260px] rounded-full bg-green-900/[0.12] blur-[80px] pointer-events-none" />

      <div className="max-w-[900px] mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 sm:mb-10 relative z-10"
        >
          <div className="text-[11px] text-red-500 tracking-[1.2px] uppercase mb-3">
            Privacy
          </div>
          <h2 className="text-[clamp(22px,3.5vw,34px)] font-medium tracking-[-1px] leading-[1.2] mb-2">
            We drew a clear line.{" "}
            <span className="text-white/20">You deserve to know.</span>
          </h2>
          <p className="text-[13px] sm:text-[14px] text-white/28 leading-relaxed max-w-[460px]">
            Inference is local. History is cloud. We document every tradeoff so you're never in the dark.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4 relative z-10">

          {/* Local Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-[16px] overflow-hidden border border-white/[0.07]"
            style={{
              background:
                "linear-gradient(160deg, rgba(15,30,15,0.9) 0%, rgba(10,14,10,0.95) 100%)",
            }}
          >
            {/* Card Header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.05] bg-green-500/[0.05]">
              <div className="w-8 h-8 bg-green-500/10 rounded-[8px] flex items-center justify-center text-[15px] flex-shrink-0">
                🖥️
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-medium text-green-400/90 leading-none mb-0.5">
                  Local
                </div>
                <div className="text-[10px] text-green-400/40">
                  stays on your machine
                </div>
              </div>
              <div className="text-[10px] bg-green-500/10 border border-green-500/25 text-green-400/80 px-2.5 py-1 rounded-full flex-shrink-0">
                Never leaves
              </div>
            </div>

            {/* Items */}
            <div>
              {localItems.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.35 }}
                >
                  <div className="flex items-center gap-3 px-5 py-2.5 hover:bg-white/[0.025] transition-colors cursor-default">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0 shadow-[0_0_6px_rgba(34,197,94,0.5)]" />
                    <span className="text-[12px] text-white/45">{item}</span>
                  </div>
                  {i !== localItems.length - 1 && (
                    <div className="h-px bg-white/[0.04] mx-5" />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Cloud Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-[16px] overflow-hidden border border-white/[0.07]"
            style={{
              background:
                "linear-gradient(160deg, rgba(28,12,12,0.9) 0%, rgba(14,10,10,0.95) 100%)",
            }}
          >
            {/* Card Header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.05] bg-red-500/[0.05]">
              <div className="w-8 h-8 bg-red-500/10 rounded-[8px] flex items-center justify-center text-[15px] flex-shrink-0">
                ☁️
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-medium text-red-400/90 leading-none mb-0.5">
                  Cloud
                </div>
                <div className="text-[10px] text-red-400/40">
                  NeonDB only
                </div>
              </div>
              <div className="text-[10px] bg-red-500/10 border border-red-500/25 text-red-400/80 px-2.5 py-1 rounded-full flex-shrink-0">
                Encrypted
              </div>
            </div>

            {/* Items */}
            <div>
              {cloudItems.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.35 }}
                >
                  <div className="flex items-center gap-3 px-5 py-2.5 hover:bg-white/[0.025] transition-colors cursor-default">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0 shadow-[0_0_6px_rgba(239,68,68,0.4)]" />
                    <span className="text-[12px] text-white/45">{item}</span>
                  </div>
                  {i !== cloudItems.length - 1 && (
                    <div className="h-px bg-white/[0.04] mx-5" />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Trust Bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="relative z-10"
        >
          <div className="bg-[#0f0f0f] border border-white/[0.07] rounded-[12px] px-4 sm:px-5 py-3.5 flex items-center gap-3">
            <div className="w-8 h-8 bg-white/[0.04] rounded-[8px] flex items-center justify-center text-[15px] flex-shrink-0">
              🔒
            </div>
            <p className="text-[11px] sm:text-[12px] text-white/30 leading-[1.55]">
              <span className="text-white/60 font-medium">Your AI never phones home.</span>{" "}
              Every inference runs entirely on your hardware via Ollama. Only your history and preferences sync — encrypted — to NeonDB.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
