"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const tabs = ["All", "Core", "AI", "Tools"];

const features = [
  { tag: "Core", icon: "⚡", iconBg: "bg-red-500/10", tagColor: "text-red-400/80 border-red-500/20 bg-red-500/[0.08]", title: "Live benchmarking", desc: "Tokens/sec, latency, RAM shown with every response in real time." },
  { tag: "AI", icon: "🔍", iconBg: "bg-green-500/10", tagColor: "text-green-400/80 border-green-500/20 bg-green-500/[0.08]", title: "Prompt improver", desc: "Weak prompt in, strong prompt out. Automatically before sending." },
  { tag: "AI", icon: "🎯", iconBg: "bg-yellow-500/10", tagColor: "text-green-400/80 border-green-500/20 bg-green-500/[0.08]", title: "Model recommender", desc: "Real-time suggestion of the best model for your current task." },
  { tag: "Core", icon: "📊", iconBg: "bg-red-500/10", tagColor: "text-red-400/80 border-red-500/20 bg-red-500/[0.08]", title: "Side-by-side compare", desc: "One prompt, three answers. Compare outputs and quality scores." },
  { tag: "AI", icon: "🧠", iconBg: "bg-green-500/10", tagColor: "text-green-400/80 border-green-500/20 bg-green-500/[0.08]", title: "Personality analyzer", desc: "Understand model traits — creativity, factuality, verbosity." },
  { tag: "Tools", icon: "🎤", iconBg: "bg-yellow-500/10", tagColor: "text-yellow-400/80 border-yellow-500/20 bg-yellow-500/[0.08]", title: "Voice input", desc: "Speak your prompt. Inferix transcribes and sends instantly." },
  { tag: "Tools", icon: "📤", iconBg: "bg-red-500/10", tagColor: "text-yellow-400/80 border-yellow-500/20 bg-yellow-500/[0.08]", title: "Export chats", desc: "Download any conversation as PDF or Markdown in one click." },
  { tag: "AI", icon: "🔄", iconBg: "bg-green-500/10", tagColor: "text-green-400/80 border-green-500/20 bg-green-500/[0.08]", title: "Context summarizer", desc: "Auto-summarizes long chats before context window fills up." },
  { tag: "Tools", icon: "🏷️", iconBg: "bg-yellow-500/10", tagColor: "text-yellow-400/80 border-yellow-500/20 bg-yellow-500/[0.08]", title: "Prompt templates", desc: "Browse, save, and reuse your favourite prompts from a library." },
];

export default function Features() {
  const [activeTab, setActiveTab] = useState("All");
  const trackRef = useRef<HTMLDivElement>(null);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const offsetRef = useRef(0);
  const dragRef = useRef({ dragging: false, startX: 0, startOffset: 0 });

  const filtered = features.filter((f) => activeTab === "All" || f.tag === activeTab);
  const CARD_W = 234; // card width + gap

  function getMax() {
    const track = trackRef.current;
    if (!track) return 0;
    const total = filtered.length * CARD_W - 14;
    return Math.max(0, total - track.parentElement!.offsetWidth + 64);
  }

  function applyOffset(offset: number, animate: boolean) {
    const track = trackRef.current;
    if (!track) return;
    offsetRef.current = Math.max(0, Math.min(offset, getMax()));
    track.style.transition = animate ? "transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)" : "none";
    track.style.transform = `translateX(-${offsetRef.current}px)`;
  }

  function resetAuto() {
    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      const next = offsetRef.current + CARD_W;
      applyOffset(next > getMax() ? 0 : next, true);
    }, 2400);
  }

  useEffect(() => {
    offsetRef.current = 0;
    applyOffset(0, false);
    resetAuto();
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [activeTab]);

  // Mouse drag
  function onMouseDown(e: React.MouseEvent) {
    dragRef.current = { dragging: true, startX: e.clientX, startOffset: offsetRef.current };
    if (trackRef.current) trackRef.current.style.transition = "none";
  }
  function onMouseMove(e: React.MouseEvent) {
    if (!dragRef.current.dragging) return;
    applyOffset(dragRef.current.startOffset + (dragRef.current.startX - e.clientX), false);
  }
  function onMouseUp() {
    dragRef.current.dragging = false;
    resetAuto();
  }

  // Touch drag
  function onTouchStart(e: React.TouchEvent) {
    dragRef.current = { dragging: true, startX: e.touches[0].clientX, startOffset: offsetRef.current };
    if (trackRef.current) trackRef.current.style.transition = "none";
  }
  function onTouchMove(e: React.TouchEvent) {
    applyOffset(dragRef.current.startOffset + (dragRef.current.startX - e.touches[0].clientX), false);
  }
  function onTouchEnd() {
    dragRef.current.dragging = false;
    resetAuto();
  }

  return (
    <section className="py-16 sm:py-20 bg-[#0a0a0a] border-b border-white/[0.06] relative overflow-hidden">

      {/* Glows */}
      <div className="absolute -top-20 -right-16 w-[300px] sm:w-[500px] h-[300px] sm:h-[380px] rounded-full bg-red-900/30 blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-16 -left-10 w-[280px] sm:w-[420px] h-[240px] sm:h-[280px] rounded-full bg-red-900/20 blur-[90px] pointer-events-none" />

      {/* Header */}
      <div className="px-5 sm:px-8 mb-8 sm:mb-10 relative z-10">
        <div className="max-w-[960px] mx-auto flex items-end justify-between flex-wrap gap-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-[11px] text-red-500 tracking-[1px] uppercase mb-2">
              Features
            </div>
            <h2 className="text-[clamp(20px,3vw,28px)] font-medium tracking-[-0.8px]">
              Everything you need.{" "}
              <span className="text-white/22">Nothing you don't.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex gap-2 flex-wrap"
          >
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative text-[12px] px-4 py-1.5 rounded-full border transition-all duration-200 ${
                  activeTab === tab
                    ? "bg-white/10 border-white/20 text-white/90"
                    : "bg-white/[0.04] border-white/[0.08] text-white/38 hover:text-white/70 hover:bg-white/[0.07]"
                }`}
              >
                {tab}
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Carousel */}
      <div
        className="relative overflow-hidden"
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-[60px] sm:w-[80px] bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-[60px] sm:w-[80px] bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

        <div
          ref={trackRef}
          className="flex gap-3 sm:gap-[14px] px-5 sm:px-8 pb-4 cursor-grab active:cursor-grabbing select-none"
          style={{ willChange: "transform" }}
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {filtered.map((f, i) => (
            <motion.div
              key={f.title + activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.3 }}
              className="flex-shrink-0 w-[200px] sm:w-[220px] bg-[#0f0f0f] border border-white/[0.07] rounded-[14px] p-4 sm:p-5 hover:bg-[#151515] hover:border-white/[0.12] transition-all duration-200 group"
            >
              <div className={`inline-block text-[10px] px-2 py-0.5 rounded-full border mb-3 ${f.tagColor}`}>
                {f.tag}
              </div>
              <div className={`w-9 h-9 ${f.iconBg} rounded-[10px] flex items-center justify-center text-[17px] mb-3 transition-transform duration-200 group-hover:scale-110`}>
                {f.icon}
              </div>
              <h3 className="text-[13px] font-medium text-white/85 mb-1.5 leading-snug">
                {f.title}
              </h3>
              <p className="text-[11px] text-white/28 leading-[1.65]">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex gap-1.5 justify-center mt-4 relative z-10">
        {filtered.map((_, i) => (
          <button
            key={i}
            onClick={() => { applyOffset(i * CARD_W, true); resetAuto(); }}
            className="h-[5px] rounded-full transition-all duration-300 bg-white/15 hover:bg-white/30"
            style={{ width: i === Math.round(offsetRef.current / CARD_W) ? "16px" : "5px" }}
          />
        ))}
      </div>
    </section>
  );
}
