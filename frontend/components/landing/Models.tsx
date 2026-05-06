"use client";

import { motion } from "framer-motion";

const models = [
  {
    name: "gemma:2b",
    badge: "Fastest",
    badgeColor: "bg-green-500/10 text-green-400 border-green-500/20",
    stats: [
      { label: "Speed", value: "52 tok/s", fill: 92, color: "bg-green-500" },
      { label: "Quality", value: "7.2/10", fill: 72, color: "bg-red-500" },
      { label: "RAM", value: "1.6 GB", fill: 38, color: "bg-yellow-500" },
    ],
    highlight: false,
  },
  {
    name: "phi3:mini",
    badge: "Balanced",
    badgeColor: "bg-red-500/10 text-red-400 border-red-500/20",
    stats: [
      { label: "Speed", value: "38 tok/s", fill: 65, color: "bg-green-500" },
      { label: "Quality", value: "8.6/10", fill: 86, color: "bg-red-500" },
      { label: "RAM", value: "2.3 GB", fill: 52, color: "bg-yellow-500" },
    ],
    highlight: true,
  },
  {
    name: "llama3.2:3b",
    badge: "Strongest",
    badgeColor: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    stats: [
      { label: "Speed", value: "28 tok/s", fill: 45, color: "bg-green-500" },
      { label: "Quality", value: "9.1/10", fill: 91, color: "bg-red-500" },
      { label: "RAM", value: "2.0 GB", fill: 46, color: "bg-yellow-500" },
    ],
    highlight: false,
  },
];

export default function Models() {
  return (
    <section className="py-20 px-5 border-b border-white/[0.06]">
      <div className="max-w-[960px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="text-[11px] text-red-500 tracking-[1px] uppercase mb-2">
            Local Models
          </div>
          <h2 className="text-[clamp(22px,3vw,30px)] font-medium tracking-[-0.8px]">
            Three models.{" "}
            <span className="text-white/25">One benchmark.</span>
          </h2>
          <p className="text-[14px] text-white/30 mt-2">
            All running on your machine. Zero cloud. Zero cost.
          </p>
        </motion.div>

        {/* Model Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {models.map((model, i) => (
            <motion.div
              key={model.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`bg-[#111] rounded-[14px] p-6 border transition-all ${
                model.highlight
                  ? "border-red-500/25 shadow-[0_0_30px_rgba(239,68,68,0.08)]"
                  : "border-white/[0.07] hover:border-red-500/20"
              }`}
            >
              {/* Model Name */}
              <div className="text-[17px] font-medium text-white mb-1.5">
                {model.name}
              </div>

              {/* Badge */}
              <div
                className={`inline-block text-[10px] px-2 py-0.5 rounded-full border mb-5 ${model.badgeColor}`}
              >
                {model.badge}
              </div>

              {/* Stats */}
              <div className="flex flex-col gap-3">
                {model.stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="flex justify-between mb-1">
                      <span className="text-[11px] text-white/28">
                        {stat.label}
                      </span>
                      <span className="text-[11px] text-white/55 font-medium">
                        {stat.value}
                      </span>
                    </div>
                    <div className="h-[3px] bg-white/[0.05] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${stat.fill}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 + 0.3, duration: 0.8, ease: "easeOut" }}
                        className={`h-full rounded-full ${stat.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
