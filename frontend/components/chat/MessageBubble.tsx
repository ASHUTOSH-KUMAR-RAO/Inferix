"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, ThumbsUp, ThumbsDown } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

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

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);

  function handleCopy() {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
    >
      <div className={`max-w-[80%] ${message.role === "ai" ? "w-full" : ""}`}>

        {/* Avatar + Name */}
        <div className={`flex items-center gap-2 mb-1.5 ${message.role === "user" ? "justify-end" : ""}`}>
          {message.role === "ai" && (
            <>
              <div className="w-5 h-5 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center flex-shrink-0">
                <div className="w-2 h-2 rounded-full bg-red-500" />
              </div>
              <span className="text-[11px] text-white/30">{message.model || "AI"}</span>
            </>
          )}
          {message.role === "user" && (
            <span className="text-[11px] text-white/30">You</span>
          )}
        </div>

        {/* Bubble */}
        <div
          className={`px-4 py-3 rounded-[14px] text-[13px] leading-relaxed ${
            message.role === "user"
              ? "bg-red-500/12 text-white/80 rounded-br-[4px]"
              : "bg-[#111] border border-white/[0.06] text-white/70 rounded-bl-[4px]"
          }`}
        >
          {message.role === "ai" ? (
            <ReactMarkdown
              components={{
                p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                code: ({ children }) => (
                  <code className="bg-white/[0.06] px-1.5 py-0.5 rounded text-[12px] font-mono text-red-300">
                    {children}
                  </code>
                ),
                pre: ({ children }) => (
                  <pre className="bg-[#0a0a0a] border border-white/[0.06] rounded-[10px] p-3 overflow-x-auto my-2 text-[12px] font-mono">
                    {children}
                  </pre>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>
                ),
                li: ({ children }) => (
                  <li className="text-white/65">{children}</li>
                ),
                strong: ({ children }) => (
                  <strong className="text-white/85 font-medium">{children}</strong>
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          ) : (
            message.content
          )}
        </div>

        {/* Benchmark Tags — only for AI */}
        {message.role === "ai" && message.tokensPerSec && (
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <Badge
              variant="outline"
              className="text-[10px] bg-green-500/10 border-green-500/20 text-green-400 px-2 py-0.5"
            >
              ⚡ {message.tokensPerSec} tok/s
            </Badge>
            <Badge
              variant="outline"
              className="text-[10px] bg-blue-500/10 border-blue-500/20 text-blue-400 px-2 py-0.5"
            >
              🕐 {message.latency}ms
            </Badge>
            <Badge
              variant="outline"
              className="text-[10px] bg-yellow-500/10 border-yellow-500/20 text-yellow-400 px-2 py-0.5"
            >
              💾 {message.ram}
            </Badge>
            {message.score && (
              <Badge
                variant="outline"
                className="text-[10px] bg-red-500/10 border-red-500/20 text-red-400 px-2 py-0.5"
              >
                ⭐ {message.score}/10
              </Badge>
            )}
          </div>
        )}

        {/* Actions — only for AI */}
        {message.role === "ai" && (
          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-[11px] text-white/25 hover:text-white/55 transition-colors"
            >
              {copied ? (
                <Check className="w-3 h-3 text-green-400" />
              ) : (
                <Copy className="w-3 h-3" />
              )}
              {copied ? "Copied!" : "Copy"}
            </button>
            <button
              onClick={() => setFeedback("up")}
              className={`transition-colors ${
                feedback === "up" ? "text-green-400" : "text-white/25 hover:text-white/55"
              }`}
            >
              <ThumbsUp className="w-3 h-3" />
            </button>
            <button
              onClick={() => setFeedback("down")}
              className={`transition-colors ${
                feedback === "down" ? "text-red-400" : "text-white/25 hover:text-white/55"
              }`}
            >
              <ThumbsDown className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
