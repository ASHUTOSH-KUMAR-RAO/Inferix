"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 text-center relative overflow-hidden border-b border-white/[0.06] bg-[#0a0a0a]">

      {/* Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[200px] sm:h-[300px] rounded-full bg-red-500/[0.22] blur-[90px] pointer-events-none" />
      <div className="absolute top-1/2 left-[30%] -translate-y-1/2 w-[200px] sm:w-[300px] h-[160px] sm:h-[200px] rounded-full bg-red-900/[0.12] blur-[70px] pointer-events-none" />
      <div className="absolute top-1/2 right-[25%] -translate-y-1/2 w-[180px] sm:w-[280px] h-[150px] sm:h-[200px] rounded-full bg-red-900/[0.10] blur-[70px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-1.5 bg-red-500/[0.08] border border-red-500/20 text-red-400/80 text-[11px] px-3 py-1 rounded-full mb-5"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.6)]" />
          100% local · zero cloud dependency
        </motion.div>

        {/* Headline */}
        <h2 className="text-[clamp(28px,5vw,52px)] font-medium tracking-[-1.8px] leading-[1.1] text-white/94 mb-3">
          Start running AI
          <br />
          <span className="text-white/20">locally.</span>
        </h2>

        {/* Sub */}
        <p className="text-[13px] sm:text-[14px] text-white/28 leading-relaxed max-w-[320px] sm:max-w-[340px] mx-auto mb-7 sm:mb-8">
          No API key. No cloud. Just your machine and your models.
        </p>

        {/* Buttons */}
        <div className="flex gap-2.5 sm:gap-3 justify-center flex-wrap mb-8 sm:mb-10">
          <Link
            href="/sign-up"
            className="bg-white text-black text-[13px] sm:text-[14px] font-medium px-5 sm:px-6 py-2.5 sm:py-3 rounded-[10px] hover:bg-white/88 hover:-translate-y-[1px] transition-all"
          >
            Get started free
          </Link>
          <Link
            href="https://github.com/ASHUTOSH-KUMAR-RAO/Inferix"
            target="_blank"
            className="bg-white/[0.05] border border-white/[0.12] text-white/60 text-[13px] sm:text-[14px] px-5 sm:px-6 py-2.5 sm:py-3 rounded-[10px] hover:bg-white/[0.09] hover:text-white/90 hover:-translate-y-[1px] transition-all"
          >
            Star on GitHub →
          </Link>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex items-center border border-white/[0.07] rounded-[12px] overflow-hidden max-w-[340px] sm:max-w-[480px] mx-auto bg-[#0f0f0f]"
        >
          {[
            { val: "52", unit: "tok/s", label: "Avg speed" },
            { val: "0", unit: "bytes", label: "Data sent" },
            { val: "3", unit: "models", label: "Ready to run" },
          ].map((s, i) => (
            <div
              key={s.label}
              className={`flex-1 px-3 sm:px-5 py-3 sm:py-3.5 relative ${
                i !== 2
                  ? "after:absolute after:right-0 after:top-[20%] after:bottom-[20%] after:w-px after:bg-white/[0.07]"
                  : ""
              }`}
            >
              <div className="text-[16px] sm:text-[18px] font-medium text-white/85 tracking-[-0.5px] leading-none">
                {s.val}
                <span className="text-[10px] sm:text-[11px] text-white/28 font-normal ml-1">
                  {s.unit}
                </span>
              </div>
              <div className="text-[10px] text-white/25 mt-1 tracking-[0.2px]">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>

      </motion.div>
    </section>
  );
}
