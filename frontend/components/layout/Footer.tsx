"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const links = [
  { label: "GitHub", href: "https://github.com/ASHUTOSH-KUMAR-RAO/Inferix" },
  { label: "Docs", href: "#" },
  { label: "Privacy", href: "#" },
  { label: "MIT License", href: "#" },
];

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="border-t border-white/[0.06] px-5 md:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-4"
    >
      {/* Left */}
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded-[6px] bg-red-500/20 border border-red-500/40 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
        </div>
        <span className="text-[12px] text-white/20">
          Inferix — Built by{" "}
          <Link
            href="https://github.com/ASHUTOSH-KUMAR-RAO/Inferix"
            target="_blank"
            className="hover:text-white/50 transition-colors"
          >
            Ashutosh Kumar Rao
          </Link>{" "}
          · 2026
        </span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            className="text-[12px] text-white/20 hover:text-white/50 transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </motion.footer>
  );
}
