"use client";

import { motion } from "framer-motion";

const cards = [
  {
    title: "Fast. Think in milliseconds.",
    desc: "No network round-trips. Local inference at full CPU speed.",
  },
  {
    title: "Private. Zero data leaves.",
    desc: "Ollama runs 100% offline. Your prompts stay on your machine.",
  },
  {
    title: "Free. No API bills.",
    desc: "No tokens, no subscriptions. Run unlimited queries for $0.",
  },
  {
    title: "Smart. AI-powered tools.",
    desc: "Auto prompt improver, quality scorer, and model recommender built in.",
  },
];

export default function WhyInferix() {
  return (
    <section className="py-20 px-5 border-b border-white/[0.06]">
      <div className="max-w-[960px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-[11px] text-red-500 tracking-[1px] uppercase mb-3">
            Why Inferix
          </div>
          <h2 className="text-[clamp(24px,3vw,32px)] font-medium tracking-[-0.8px] leading-[1.2] mb-4">
            It's not about saving money.
            <br />
            <span className="text-white/25">
              It's about never giving up your privacy.
            </span>
          </h2>
          <p className="text-[14px] text-white/35 leading-[1.7] mb-6">
            Every prompt you send to a cloud AI leaves your machine forever.
            Inferix runs everything locally — your words, your data, your
            machine.
          </p>
          <button className="bg-white/05 border border-white/14 text-white/60 text-[13px] px-5 py-2.5 rounded-[10px] hover:bg-white/09 hover:text-white transition-all">
            Explore features →
          </button>
        </motion.div>

        {/* Right — Mini Cards */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 gap-3"
        >
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="bg-[#111] border border-white/[0.07] rounded-[10px] p-4 hover:border-red-500/20 transition-all"
            >
              <h4 className="text-[12px] font-medium text-white/80 mb-1.5">
                {card.title}
              </h4>
              <p className="text-[11px] text-white/30 leading-[1.6]">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

