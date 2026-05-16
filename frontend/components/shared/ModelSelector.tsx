"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MODELS } from "@/types/models";
import type { Model } from "@/types/models";

interface ModelSelectorProps {
  selectedModel: Model;
  onSelect: (model: Model) => void;
  size?: "sm" | "md";
}

export default function ModelSelector({
  selectedModel,
  onSelect,
  size = "md",
}: ModelSelectorProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <motion.div
          whileTap={{ scale: 0.97 }}
          className={`flex items-center gap-2 bg-[#111] border border-white/[0.08] rounded-[8px] cursor-pointer hover:bg-[#161616] transition-colors ${
            size === "sm" ? "px-2.5 py-1.5" : "px-3 py-2"
          }`}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
          <span
            className={`text-white/70 ${
              size === "sm" ? "text-[12px]" : "text-[13px]"
            }`}
          >
            {selectedModel.label}
          </span>
          <ChevronDown
            className={`text-white/30 ${
              size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5"
            }`}
          />
        </motion.div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-[#111] border-white/[0.08] text-white min-w-[180px]">
        {MODELS.map((model) => (
          <DropdownMenuItem
            key={model.id}
            onClick={() => onSelect(model)}
            className={`flex items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.05] ${
              selectedModel.id === model.id ? "bg-white/[0.04]" : ""
            }`}
          >
            <div className="flex items-center gap-2">
              <div
                className={`w-1.5 h-1.5 rounded-full ${
                  selectedModel.id === model.id ? "bg-green-500" : "bg-white/20"
                }`}
              />
              <span className="text-[13px]">{model.label}</span>
            </div>
            <span className={`text-[11px] ${model.color}`}>{model.speed}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
