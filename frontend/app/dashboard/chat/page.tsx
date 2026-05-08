"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Plus, ChevronDown, Trash2 } from "lucide-react";
import ChatInput from "@/components/chat/ChatInput";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const MODELS = [
  {
    id: "gemma:2b",
    label: "gemma:2b",
    speed: "52 tok/s",
    color: "text-green-400",
  },
  {
    id: "phi3:mini",
    label: "phi3:mini",
    speed: "38 tok/s",
    color: "text-blue-400",
  },
  {
    id: "llama3.2:3b",
    label: "llama3.2:3b",
    speed: "28 tok/s",
    color: "text-yellow-400",
  },
];

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

type Chat = {
  id: string;
  title: string;
  messages: Message[];
};

export default function ChatPage() {
  const [selectedModel, setSelectedModel] = useState(MODELS[0]);
  const [chats, setChats] = useState<Chat[]>([
    { id: "1", title: "New Chat", messages: [] },
  ]);
  const [activeChatId, setActiveChatId] = useState("1");
  const [isLoading, setIsLoading] = useState(false);


  const activeChat = chats.find((c) => c.id === activeChatId)!;

  function newChat() {
    const id = Date.now().toString();
    setChats((prev) => [...prev, { id, title: "New Chat", messages: [] }]);
    setActiveChatId(id);
  }

  function deleteChat(chatId: string) {
    const remaining = chats.filter((c) => c.id !== chatId);
    setChats(remaining);
    if (activeChatId === chatId) {
      if (remaining.length > 0) {
        setActiveChatId(remaining[remaining.length - 1].id);
      } else {
        const newId = Date.now().toString();
        setChats([{ id: newId, title: "New Chat", messages: [] }]);
        setActiveChatId(newId);
      }
    }
  }

  async function handleSend(message: string) {
    if (!message.trim()) return;
    setIsLoading(true);

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: message,
    };

    // Update chat title
    setChats((prev) =>
      prev.map((c) =>
        c.id === activeChatId
          ? {
              ...c,
              title:
                c.messages.length === 0
                  ? message.slice(0, 30) + "..."
                  : c.title,
              messages: [...c.messages, userMsg],
            }
          : c
      )
    );

    // Simulate AI response — backend se connect karenge baad mein
    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content:
          "This is a placeholder response. Backend will be connected soon to run actual Ollama inference locally on your machine.",
        model: selectedModel.id,
        tokensPerSec: Math.floor(Math.random() * 20) + 30,
        latency: Math.floor(Math.random() * 200) + 200,
        ram: "1.6 GB",
        score: Math.floor(Math.random() * 2) + 8,
      };

      setChats((prev) =>
        prev.map((c) =>
          c.id === activeChatId
            ? { ...c, messages: [...c.messages, aiMsg] }
            : c
        )
      );
      setIsLoading(false);
    }, 1200);
  }

  return (
    <div className="flex h-screen bg-[#0a0a0a]">
      {/* Chat Sidebar */}
      <div className="hidden md:flex w-[200px] flex-col border-r border-white/[0.06] bg-[#0d0d0d] flex-shrink-0">
        {/* New Chat Button */}
        <div className="p-3 border-b border-white/[0.06]">
          <button
            onClick={newChat}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-[8px] bg-red-500/10 border border-red-500/20 text-red-400 text-[12px] hover:bg-red-500/15 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            New Chat
          </button>
        </div>

        {/* Chat History */}
        <ScrollArea className="flex-1 p-2">
          <div className="text-[10px] text-white/20 uppercase tracking-[0.8px] px-2 mb-2">
            History
          </div>

          <TooltipProvider delay={300}>
            {chats.map((chat) => (
              <div
                key={chat.id}
                className={`group flex items-center rounded-[8px] mb-1 transition-colors ${
                  chat.id === activeChatId
                    ? "bg-white/[0.06]"
                    : "hover:bg-white/[0.03]"
                }`}
              >
                {/* Chat select button */}
                <button
                  onClick={() => setActiveChatId(chat.id)}
                  className={`flex-1 flex items-center gap-2 px-2.5 py-2 text-left transition-colors min-w-0 ${
                    chat.id === activeChatId
                      ? "text-white/80"
                      : "text-white/35 hover:text-white/55"
                  }`}
                >
                  <MessageSquare className="w-3 h-3 flex-shrink-0" />
                  <span className="text-[12px] truncate">{chat.title}</span>
                </button>

                {/* Delete button — pure CSS group-hover, no React state */}
                <Tooltip>
                  <TooltipTrigger >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteChat(chat.id);
                      }}
                      className="mr-1.5 p-0.5 rounded-[4px] text-white/25 hover:text-red-400 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="text-[11px]">
                    Delete chat
                  </TooltipContent>
                </Tooltip>
              </div>
            ))}
          </TooltipProvider>
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat Header */}
        <div className="flex items-center justify-between px-4 h-14 border-b border-white/[0.06] flex-shrink-0">
          {/* Model Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex items-center gap-2 bg-[#111] border border-white/[0.08] rounded-[8px] px-3 py-1.5 hover:bg-[#161616] transition-colors cursor-pointer">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span className="text-[13px] text-white/70">
                  {selectedModel.label}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-white/30" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#111] border-white/[0.08] text-white">
              {MODELS.map((model) => (
                <DropdownMenuItem
                  key={model.id}
                  onClick={() => setSelectedModel(model)}
                  className="flex items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.05]"
                >
                  <span className="text-[13px]">{model.label}</span>
                  <span className={`text-[11px] ${model.color}`}>
                    {model.speed}
                  </span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Privacy Badge */}
          <div className="flex items-center gap-1.5 text-[11px] text-green-400/70">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            100% local
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 px-4 py-4">
          {activeChat.messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-20">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-5 h-5 text-red-400" />
                </div>
                <h3 className="text-[16px] font-medium text-white/70 mb-2">
                  Start a conversation
                </h3>
                <p className="text-[13px] text-white/30 max-w-[300px]">
                  Ask anything. Your AI runs locally via Ollama — fast, private,
                  and free.
                </p>
              </motion.div>
            </div>
          ) : (
            <div className="flex flex-col gap-4 max-w-[760px] mx-auto">
              <AnimatePresence>
                {activeChat.messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] ${msg.role === "user" ? "" : "w-full"}`}
                    >
                      {/* Bubble */}
                      <div
                        className={`px-4 py-3 rounded-[14px] text-[13px] leading-relaxed ${
                          msg.role === "user"
                            ? "bg-red-500/12 text-white/80 rounded-br-[4px]"
                            : "bg-[#111] border border-white/[0.06] text-white/70 rounded-bl-[4px]"
                        }`}
                      >
                        {msg.content}
                      </div>

                      {/* Benchmark tags — only for AI */}
                      {msg.role === "ai" && msg.tokensPerSec && (
                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                          <Badge
                            variant="outline"
                            className="text-[10px] bg-green-500/10 border-green-500/20 text-green-400 px-2 py-0.5"
                          >
                            {msg.tokensPerSec} tok/s
                          </Badge>
                          <Badge
                            variant="outline"
                            className="text-[10px] bg-blue-500/10 border-blue-500/20 text-blue-400 px-2 py-0.5"
                          >
                            {msg.latency}ms
                          </Badge>
                          <Badge
                            variant="outline"
                            className="text-[10px] bg-yellow-500/10 border-yellow-500/20 text-yellow-400 px-2 py-0.5"
                          >
                            {msg.ram}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="text-[10px] bg-red-500/10 border-red-500/20 text-red-400 px-2 py-0.5"
                          >
                            Score {msg.score}/10
                          </Badge>
                          <span className="text-[10px] text-white/20">
                            {msg.model}
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Loading */}
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
            </div>
          )}
        </ScrollArea>

        {/* Chat Input */}
        <ChatInput onSend={handleSend} isLoading={isLoading} />
      </div>
    </div>
  );
}
