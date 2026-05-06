"use client";

import { motion } from "framer-motion";

const models = ["gemma:2b", "phi3:mini", "llama3.2:3b"];
const history = ["Explain quantum...", "Write a Python...", "Summarize this..."];
const tags = ["52 tok/s", "310ms", "3.1GB RAM", "Score 8.4/10"];

export default function AppPreview() {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-5 bg-[#0a0a0a] text-center border-b border-white/[0.06] overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-[clamp(18px,3vw,26px)] font-medium text-white tracking-[-0.5px] mb-2">
          Run AI. Benchmark it. Own it.
        </h2>
        <p className="text-[13px] sm:text-[14px] text-white/30 mb-8 sm:mb-10">
          One interface, three models, zero cloud dependency.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-[900px] mx-auto relative"
      >
        {/* Glow blobs */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[300px] sm:w-[500px] h-[200px] sm:h-[220px] rounded-full bg-red-900/40 blur-[80px] pointer-events-none z-0" />
        <div className="absolute bottom-0 left-[30%] w-[200px] sm:w-[300px] h-[150px] sm:h-[180px] rounded-full bg-red-900/25 blur-[70px] pointer-events-none z-0" />
        <div className="absolute top-[30%] -right-10 w-[150px] sm:w-[200px] h-[150px] sm:h-[200px] rounded-full bg-red-900/20 blur-[60px] pointer-events-none z-0" />

        <div className="relative z-10 bg-[#111] border border-white/[0.08] rounded-[12px] sm:rounded-[14px] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.6)]">

          {/* macOS Menu Bar — hidden on mobile */}
          <div className="hidden sm:flex items-center justify-between px-4 h-7 bg-[#1e1e1e] border-b border-white/[0.05]">
            <div className="flex items-center gap-4">
              <span className="text-[13px] text-white/70">&#63743;</span>
              <div className="flex gap-3">
                {["Inferix", "File", "Edit", "View", "Window"].map((m) => (
                  <span key={m} className="text-[12px] text-white/50">{m}</span>
                ))}
              </div>
            </div>
            <div className="flex gap-2.5">
              <span className="text-[11px] text-white/40">Mon Jun 22</span>
              <span className="text-[11px] text-white/40">9:41 AM</span>
            </div>
          </div>

          {/* Title Bar */}
          <div className="flex items-center gap-2.5 px-3 sm:px-4 py-2.5 bg-[#161616] border-b border-white/[0.05]">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#28ca42]" />
            </div>
            <span className="flex-1 text-center text-[11px] sm:text-[12px] text-white/25 tracking-[0.2px]">
              Inferix — gemma:2b
            </span>
          </div>

          {/* Window Body */}
          <div
            className="grid grid-cols-1 sm:grid-cols-[160px_1fr] md:grid-cols-[190px_1fr] min-h-[300px] sm:min-h-[360px]"
            style={{
              background:
                "linear-gradient(135deg, rgba(80,8,8,0.45) 0%, rgba(30,5,5,0.6) 35%, rgba(10,10,10,0.85) 70%, rgba(12,12,12,0.9) 100%)",
            }}
          >
            {/* Sidebar — hidden on mobile */}
            <div className="hidden sm:block border-r border-white/[0.05] p-3 sm:p-4 bg-black/30">
              <div className="text-[10px] text-white/20 tracking-[0.8px] uppercase mb-2 px-2">
                Models
              </div>
              {models.map((m, i) => (
                <div
                  key={m}
                  className={`flex items-center gap-2 px-2 py-1.5 rounded-[7px] text-[11px] sm:text-[12px] mb-1 ${
                    i === 0 ? "bg-red-500/10 text-red-400" : "text-white/35"
                  }`}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                  {m}
                </div>
              ))}
              <div className="mt-4 pt-3 border-t border-white/[0.05]">
                <div className="text-[10px] text-white/20 tracking-[0.8px] uppercase mb-2 px-2">
                  History
                </div>
                {history.map((h) => (
                  <div key={h} className="text-[11px] text-white/28 px-2 py-1.5 rounded-[7px] hover:bg-white/[0.04] cursor-pointer">
                    {h}
                  </div>
                ))}
              </div>
            </div>

            {/* Chat */}
            <div className="flex flex-col justify-end gap-3 sm:gap-4 p-4 sm:p-6">
              <div className="self-end max-w-[85%] sm:max-w-[78%]">
                <div className="bg-red-500/[0.15] text-white/80 text-[12px] sm:text-[13px] px-3 sm:px-4 py-2 sm:py-2.5 rounded-[10px] rounded-br-[3px] leading-relaxed">
                  Which model is fastest for summarization?
                </div>
                <div className="text-[10px] text-white/20 mt-1 text-right">You</div>
              </div>
              <div className="max-w-[90%] sm:max-w-[85%]">
                <div className="bg-white/[0.05] text-white/55 text-[12px] sm:text-[13px] px-3 sm:px-4 py-2 sm:py-2.5 rounded-[10px] rounded-bl-[3px] leading-relaxed">
                  On your hardware, gemma:2b leads at 52 tok/s vs phi3:mini at 38 tok/s. For short summaries, gemma wins on speed with only a minor quality tradeoff...
                </div>
                <div className="flex gap-1.5 mt-2 flex-wrap">
                  {tags.map((tag) => (
                    <span key={tag} className="text-[10px] bg-green-500/10 border border-green-500/[0.2] text-green-400 px-2 py-0.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="text-[10px] text-white/20 mt-1.5">gemma:2b — 100% local</div>
              </div>
            </div>
          </div>

          {/* Bottom Input Bar */}
          <div className="flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-2 sm:py-2.5 bg-[#0a0a0a]/90 border-t border-white/[0.05]">
            <div className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-[8px] h-7 sm:h-8 px-3 flex items-center">
              <span className="text-[11px] text-white/20">Ask anything...</span>
            </div>
            <div className="bg-red-500/15 border border-red-500/30 text-red-400 text-[11px] px-2.5 sm:px-3 py-1 rounded-[6px] whitespace-nowrap">
              ↵ Send
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
