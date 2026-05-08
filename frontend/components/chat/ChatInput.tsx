"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mic, MicOff, Wand2, X, Paperclip, Eraser } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ChatInputProps {
  onSend: (message: string) => void;
  onClear?: () => void;
  isLoading: boolean;
}

export default function ChatInput({
  onSend,
  onClear,
  isLoading,
}: ChatInputProps) {
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [improvedPrompt, setImprovedPrompt] = useState<string | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function handleSend() {
    if (!input.trim() || isLoading) return;
    onSend(improvedPrompt || input);
    setInput("");
    setImprovedPrompt(null);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function handleImprove() {
    setImprovedPrompt(`Improved: ${input}`);
  }

  function handleVoice() {
    setIsRecording(!isRecording);
  }

  function handleClear() {
    if (showClearConfirm) {
      onClear?.();
      setShowClearConfirm(false);
      setInput("");
      setImprovedPrompt(null);
    } else {
      setShowClearConfirm(true);
      setTimeout(() => setShowClearConfirm(false), 3000);
    }
  }

  return (
    <TooltipProvider delay={0}>
      <div className="p-3 md:p-4 border-t border-white/[0.06] bg-[#0a0a0a]">
        {/* Improved Prompt Preview */}
        <AnimatePresence>
          {improvedPrompt && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="mb-2 bg-red-500/10 border border-red-500/20 rounded-[10px] px-3 py-2 flex items-start justify-between gap-2"
            >
              <div>
                <div className="text-[10px] text-red-400 mb-1">
                  ✨ Improved prompt
                </div>
                <div className="text-[12px] text-white/60">
                  {improvedPrompt}
                </div>
              </div>
              <div
                onClick={() => setImprovedPrompt(null)}
                className="cursor-pointer text-white/30 hover:text-white/60 transition-colors mt-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Clear confirm banner */}
        <AnimatePresence>
          {showClearConfirm && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="mb-2 bg-red-500/10 border border-red-500/25 rounded-[10px] px-3 py-2 flex items-center justify-between gap-2"
            >
              <div className="text-[12px] text-red-400/90">
                🗑️ Clear entire chat history?
              </div>
              <div className="flex items-center gap-2">
                <div
                  onClick={handleClear}
                  className="text-[11px] text-red-400 hover:text-red-300 cursor-pointer font-medium transition-colors"
                >
                  Yes, clear
                </div>
                <div className="text-white/20 text-[11px]">·</div>
                <div
                  onClick={() => setShowClearConfirm(false)}
                  className="text-[11px] text-white/40 hover:text-white/60 cursor-pointer transition-colors"
                >
                  Cancel
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-end gap-2">
          {/* Textarea */}
          <div className="flex-1 bg-[#111] border border-white/[0.08] rounded-[12px] px-3 py-2.5 flex items-end gap-2">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything..."
              rows={1}
              className="flex-1 bg-transparent text-[13px] text-white/80 placeholder:text-white/25 outline-none resize-none max-h-[120px] leading-relaxed"
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = "auto";
                target.style.height = `${target.scrollHeight}px`;
              }}
            />

            {/* Improve button */}
            <AnimatePresence>
              {input.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                >
                  <Tooltip>
                    <TooltipTrigger className="flex-shrink-0">
                      <div
                        onClick={handleImprove}
                        className="text-white/25 hover:text-yellow-400 transition-colors cursor-pointer"
                      >
                        <Wand2 className="w-4 h-4" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="top">Improve prompt</TooltipContent>
                  </Tooltip>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Voice Button */}
          <Tooltip>
            <TooltipTrigger>
              <motion.div
                whileTap={{ scale: 0.9 }}
                onClick={handleVoice}
                className={`w-10 h-10 rounded-[10px] flex items-center justify-center flex-shrink-0 transition-colors cursor-pointer ${
                  isRecording
                    ? "bg-red-500 text-white"
                    : "bg-[#111] border border-white/[0.08] text-white/40 hover:text-white/70"
                }`}
              >
                {isRecording ? (
                  <MicOff className="w-4 h-4" />
                ) : (
                  <Mic className="w-4 h-4" />
                )}
              </motion.div>
            </TooltipTrigger>
            <TooltipContent side="top">
              {isRecording ? "Stop recording" : "Voice input"}
            </TooltipContent>
          </Tooltip>

          {/* Clear chat button — Eraser icon */}
          <Tooltip>
            <TooltipTrigger>
              <motion.div
                whileTap={{ scale: 0.9 }}
                onClick={handleClear}
                className={`w-10 h-10 rounded-[10px] flex items-center justify-center flex-shrink-0 transition-colors cursor-pointer ${
                  showClearConfirm
                    ? "bg-red-500/20 border border-red-500/40 text-red-400"
                    : "bg-[#111] border border-white/[0.08] text-white/40 hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/10"
                }`}
              >
                <Eraser className="w-4 h-4" />
              </motion.div>
            </TooltipTrigger>
            <TooltipContent side="top">
              {showClearConfirm ? "Click to confirm" : "Clear chat"}
            </TooltipContent>
          </Tooltip>

          {/* Send Button */}
          <Tooltip>
            <TooltipTrigger>
              <motion.div
                whileTap={{ scale: 0.9 }}
                onClick={handleSend}
                className={`w-10 h-10 rounded-[10px] bg-red-500 flex items-center justify-center flex-shrink-0 hover:bg-red-600 transition-colors cursor-pointer ${
                  !input.trim() || isLoading
                    ? "opacity-40 cursor-not-allowed"
                    : ""
                }`}
              >
                <Send className="w-4 h-4 text-white" />
              </motion.div>
            </TooltipTrigger>
            <TooltipContent side="top">Send</TooltipContent>
          </Tooltip>
        </div>

        {/* Footer hints */}
        <div className="flex items-center justify-between mt-2 px-1">
          <div className="text-[10px] text-white/18">
            Press{" "}
            <kbd className="bg-white/[0.06] px-1 rounded text-[9px]">Enter</kbd>{" "}
            to send ·{" "}
            <kbd className="bg-white/[0.06] px-1 rounded text-[9px]">
              Shift+Enter
            </kbd>{" "}
            for new line
          </div>
          <div className="text-[10px] text-white/18">🔒 100% local</div>
        </div>
      </div>
    </TooltipProvider>
  );
}
