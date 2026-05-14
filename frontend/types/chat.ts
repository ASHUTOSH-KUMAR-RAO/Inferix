import type { Message } from "./index";

export type ChatState = {
  chats: Chat[];
  activeChatId: string | null;
  isLoading: boolean;
};

export type Chat = {
  id: string;
  title: string;
  messages: Message[];
  model: string;
  createdAt: string;
  updatedAt: string;
};

export type SendMessagePayload = {
  chatId: string;
  content: string;
  model: string;
};

export type StreamChunk = {
  content: string;
  done: boolean;
  tokensPerSec?: number;
  latency?: number;
  ram?: string;
};
