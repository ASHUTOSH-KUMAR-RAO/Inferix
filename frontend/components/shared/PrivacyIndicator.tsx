"use client";

import { motion } from "framer-motion";
import { Shield } from "lucide-react";

interface PrivacyIndicatorProps {
  variant?: "minimal" | "full";
}

export default function PrivacyIndicator({
  variant = "minimal",
}: PrivacyIndicatorProps) {
  if (variant === "minimal") {
    return (
      <div className="flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
        <span className="text-[11px] text-green-400/70">100% local</span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-green-500/[0.06] border border-green-500/15 rounded-[12px] px-4 py-3 flex items-center gap-3"
    >
      <div className="w-8 h-8 bg-green-500/10 rounded-[8px] flex items-center justify-center flex-shrink-0">
        <Shield className="w-4 h-4 text-green-400" />
      </div>
      <div>
        <div className="text-[13px] font-medium text-green-400 mb-0.5">
          100% Private
        </div>
        <div className="text-[11px] text-white/30 leading-relaxed">
          All inference runs locally via Ollama. Zero data leaves your machine.
        </div>
      </div>
      <div className="flex items-center gap-1.5 ml-auto flex-shrink-0">
        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
        <span className="text-[11px] text-green-400/70">Local</span>
      </div>
    </motion.div>
  );
}
