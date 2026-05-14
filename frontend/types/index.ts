export type Role = "user" | "ai";

export type Message = {
  id: string;
  role: Role;
  content: string;
  model?: string;
  tokensPerSec?: number;
  latency?: number;
  ram?: string;
  score?: number;
  createdAt?: string;
};

export type Chat = {
  id: string;
  title: string;
  messages: Message[];
  model: string;
  createdAt: string;
  updatedAt: string;
};

export type BenchmarkResult = {
  model: string;
  tokensPerSec: number;
  latency: number;
  ram: string;
  score: number;
  prompt: string;
};

export type HistoryEntry = {
  id: string;
  timestamp: string;
  prompt: string;
  results: BenchmarkResult[];
};

export type Template = {
  id: string;
  title: string;
  content: string;
  category: string;
  isCustom?: boolean;
  createdAt?: string;
};

export type ModelResponse = {
  model: string;
  content: string;
  tokensPerSec: number;
  latency: number;
  ram: string;
  score: number;
  isLoading: boolean;
};

export type ExportFormat = "pdf" | "md";
