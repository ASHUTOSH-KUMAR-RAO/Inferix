"use client";

import { motion } from "framer-motion";

const rows = [
  ["~", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "⌫"],
  ["Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["Caps", "A", "S", "D", "F", "G", "H", "J", "K", "L", "↵"],
  ["⇧", "Z", "X", "C", "V", "B", "N", "M", "⇧"],
];

const highlightKeys = ["⌘", "⌘ K"];

export default function Keyboard() {
  return (
    <section className="py-16 px-5 bg-[#0a0a0a] border-b border-white/[0.06] overflow-hidden">
      {/* Top content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative text-center max-w-[500px] mx-auto mb-12 px-4"
      >
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[400px] h-[200px] rounded-full bg-red-900/30 blur-[80px] pointer-events-none" />
        <div className="text-[11px] text-red-500 tracking-[1.2px] uppercase mb-3 relative z-10">
          Shortcuts
        </div>
        <h2 className="text-[clamp(20px,3vw,28px)] font-medium tracking-[-0.8px] mb-4 leading-[1.25] relative z-10">
          Take the short way.{" "}
          <span className="text-white/20">Inferix is built for speed.</span>
        </h2>
        <p className="text-[13px] text-white/28 leading-[1.7] mb-6 relative z-10">
          Every action in Inferix has a keyboard shortcut. Switch models, send
          prompts, compare outputs, export chats — all without touching your
          mouse.
        </p>
        <div className="flex flex-wrap gap-2 justify-center relative z-10">
          {[
            { keys: "⌘ K", desc: "Open command palette" },
            { keys: "⌘ M", desc: "Switch model" },
            { keys: "⌘ E", desc: "Export chat" },
            { keys: "⌘ /", desc: "Improve prompt" },
          ].map((s, i) => (
            <motion.div
              key={s.keys}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="flex items-center gap-2"
            >
              <kbd className="bg-[#111] border border-white/10 border-b-2 border-b-white/[0.06] text-white/60 text-[11px] px-2.5 py-1 rounded-[6px] font-mono">
                {s.keys}
              </kbd>
              <span className="text-[13px] text-white/30">{s.desc}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Keyboard background */}
      <div className="relative overflow-hidden py-8">
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full bg-red-900/25 blur-[70px] pointer-events-none z-0" />
        <div className="absolute inset-y-0 left-0 w-[80px] sm:w-[120px] bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-[80px] sm:w-[120px] bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-[70px] bg-gradient-to-t from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative z-2 flex flex-col items-center gap-[6px] sm:gap-[10px]"
        >
          {rows.map((row, ri) => (
            <div key={ri} className="flex gap-[6px] sm:gap-[10px] justify-center">
              {row.map((key, ki) => (
                <motion.div
                  key={`${ri}-${ki}`}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (ri * row.length + ki) * 0.008, duration: 0.3 }}
                  whileHover={{ y: -2, transition: { duration: 0.15 } }}
                  className={`
                    flex items-center justify-center rounded-[6px] sm:rounded-[8px]
                    border border-b-2 cursor-default select-none
                    h-9 w-9 sm:h-14 sm:w-14 md:h-16 md:w-16
                    text-[10px] sm:text-[13px] md:text-[16px]
                    ${key.length > 1 ? "!w-auto px-2 sm:px-3 md:px-4 min-w-[36px] sm:min-w-[60px] md:min-w-[80px]" : ""}
                    ${
                      highlightKeys.includes(key)
                        ? "bg-red-500/12 border-red-500/35 border-b-red-500/50 text-red-400/75"
                        : "bg-[#121212]/70 border-white/[0.07] border-b-white/[0.04] text-white/18"
                    }
                  `}
                >
                  {key}
                </motion.div>
              ))}
            </div>
          ))}

          {/* Space row */}
          <div className="flex gap-[6px] sm:gap-[10px] justify-center">
            {["fn", "⌃", "⌥"].map((k) => (
              <div
                key={k}
                className="flex items-center justify-center h-9 sm:h-14 md:h-16 px-2 sm:px-3 md:px-4 min-w-[36px] sm:min-w-[60px] md:min-w-[80px] rounded-[6px] sm:rounded-[8px] bg-[#121212]/70 border border-white/[0.07] border-b-2 border-b-white/[0.04] text-[10px] sm:text-[13px] text-white/18"
              >
                {k}
              </div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="flex items-center justify-center h-9 sm:h-14 md:h-16 px-2 sm:px-3 md:px-4 min-w-[36px] sm:min-w-[60px] md:min-w-[80px] rounded-[6px] sm:rounded-[8px] bg-red-500/12 border border-red-500/35 border-b-2 border-b-red-500/50 text-[10px] sm:text-[13px] text-red-400/75"
            >
              ⌘
            </motion.div>
            <div className="h-9 sm:h-14 md:h-16 w-[120px] sm:w-[200px] md:w-[260px] rounded-[6px] sm:rounded-[8px] bg-red-500/12 border border-red-500/35 border-b-2 border-b-red-500/50" />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="flex items-center justify-center h-9 sm:h-14 md:h-16 px-2 sm:px-3 md:px-4 min-w-[44px] sm:min-w-[70px] md:min-w-[86px] rounded-[6px] sm:rounded-[8px] bg-red-500/12 border border-red-500/35 border-b-2 border-b-red-500/50 text-[10px] sm:text-[13px] text-red-400/75"
            >
              ⌘ K
            </motion.div>
            <div className="flex items-center justify-center h-9 sm:h-14 md:h-16 px-2 sm:px-3 md:px-4 min-w-[36px] sm:min-w-[60px] md:min-w-[80px] rounded-[6px] sm:rounded-[8px] bg-[#121212]/70 border border-white/[0.07] border-b-2 border-b-white/[0.04] text-[10px] sm:text-[13px] text-white/18">
              ⌥
            </div>
          </div>
        </motion.div>
      </div>

      <p className="text-center text-[11px] text-white/15 mt-3 tracking-[0.3px] relative z-10">
        <span className="text-red-500/60">⌘K</span> — Open Inferix command palette anywhere
      </p>
    </section>
  );
}
