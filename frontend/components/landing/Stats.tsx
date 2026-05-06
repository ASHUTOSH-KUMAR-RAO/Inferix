"use client";

import { motion } from "framer-motion";

const stats = [
  {
    num: "3",
    accent: "x",
    label: "Models benchmarked simultaneously",
  },
  {
    num: "0",
    accent: "",
    label: "Bytes sent to cloud during inference",
  },
  {
    num: "$0",
    accent: "",
    label: "API cost — forever, for everyone",
  },
];

export default function Stats() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 border-b border-white/[0.06]">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          className="flex flex-col items-center justify-center py-12 px-6 text-center border-b md:border-b-0 md:border-r border-white/[0.05] last:border-none"
        >
          <div className="text-[clamp(32px,5vw,44px)] font-medium tracking-[-1.5px] text-white">
            {stat.num}
            <span className="text-red-500">{stat.accent}</span>
          </div>
          <div className="text-[13px] text-white/28 mt-2 max-w-[180px]">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </section>
  );
}
