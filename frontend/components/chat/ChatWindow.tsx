"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import MessageBubble from "@/components/chat/MessageBubble";

type Message = {
  id: string;
  role: "user" | "ai";
  content: string;
  model?: string;
  tokensPerSec?: number;
  latency?: number;
  ram?: string;
  score?: number;
};

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
}

export default function ChatWindow({ messages, isLoading }: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <ScrollArea className="flex-1 px-4 py-4">
      {messages.length === 0 ? (
        // Empty State
        <div className="h-full flex flex-col items-center justify-center text-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="w-14 h-14 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-6 h-6 text-red-400" />
            </div>
            <h3 className="text-[16px] font-medium text-white/70 mb-2">
              Start a conversation
            </h3>
            <p className="text-[13px] text-white/30 max-w-[300px] leading-relaxed">
              Ask anything. Your AI runs locally via Ollama — fast, private, and
              free.
            </p>

            {/* Quick prompts */}
            <div className="flex flex-wrap gap-2 justify-center mt-6">
              {[
                "Explain quantum computing",
                "Write a Python script",
                "Summarize a topic",
                "Debug my code",
              ].map((prompt) => (
                <div
                  key={prompt}
                  className="text-[12px] text-white/30 border border-white/[0.08] px-3 py-1.5 rounded-full hover:bg-white/[0.04] hover:text-white/50 cursor-pointer transition-colors"
                >
                  {prompt}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      ) : (
        // Messages
        <div className="flex flex-col gap-4 max-w-[760px] mx-auto pb-4">
          <AnimatePresence>
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
          </AnimatePresence>

          {/* Loading indicator */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-[#111] border border-white/[0.06] rounded-[14px] rounded-bl-[4px] px-4 py-3">
                <div className="flex gap-1.5 items-center">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                      className="w-1.5 h-1.5 rounded-full bg-white/40"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          <div ref={bottomRef} />
        </div>
      )}
    </ScrollArea>
  );
}
