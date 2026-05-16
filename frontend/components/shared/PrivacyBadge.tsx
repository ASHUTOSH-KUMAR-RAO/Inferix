"use client";

import { Shield, Cloud } from "lucide-react";

interface PrivacyBadgeProps {
  type: "local" | "cloud";
  label?: string;
}

export default function PrivacyBadge({ type, label }: PrivacyBadgeProps) {
  if (type === "local") {
    return (
      <div className="flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 px-2.5 py-1 rounded-full">
        <Shield className="w-3 h-3 text-green-400" />
        <span className="text-[11px] text-green-400">
          {label || "Local — never leaves your machine"}
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 px-2.5 py-1 rounded-full">
      <Cloud className="w-3 h-3 text-red-400" />
      <span className="text-[11px] text-red-400">
        {label || "Cloud — synced to NeonDB"}
      </span>
    </div>
  );
}
