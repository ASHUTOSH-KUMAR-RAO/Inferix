"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section className="py-28 px-5 text-center relative overflow-hidden border-b border-white/[0.06]">
      {/* Glow */}
      <div className="absolute w-[500px] h-[250px] bg-red-500/[0.07] rounded-full blur-[80px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        <h2 className="text-[clamp(28px,5vw,44px)] font-medium tracking-[-1.5px] text-white mb-3">
          Start running AI locally.
        </h2>
        <p className="text-[15px] text-white/30 mb-8">
          No API key. No cloud. Just your machine and your models.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link
            href="/sign-up"
            className="bg-white text-black text-[14px] font-medium px-6 py-3 rounded-[10px] hover:bg-white/88 transition-all"
          >
            Get started free
          </Link>
          <Link
            href="https://github.com/ASHUTOSH-KUMAR-RAO/Inferix"
            target="_blank"
            className="bg-white/[0.05] border border-white/[0.14] text-white/65 text-[14px] px-6 py-3 rounded-[10px] hover:bg-white/[0.09] hover:text-white transition-all"
          >
            Star on GitHub →
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

