import { create } from "zustand";
import type { Chat, Message } from "@/types/index";

type ChatStore = {
  chats: Chat[];
  activeChatId: string | null;
  isLoading: boolean;

  setActiveChatId: (id: string) => void;
  addChat: (chat: Chat) => void;
  deleteChat: (id: string) => void;
  addMessage: (chatId: string, message: Message) => void;
  updateChatTitle: (chatId: string, title: string) => void;
  setLoading: (loading: boolean) => void;
  clearChats: () => void;
  getActiveChat: () => Chat | undefined;
};

export const useChatStore = create<ChatStore>((set, get) => ({
  chats: [
    {
      id: "1",
      title: "New Chat",
      messages: [],
      model: "gemma:2b",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  activeChatId: "1",
  isLoading: false,

  setActiveChatId: (id) => set({ activeChatId: id }),

  addChat: (chat) =>
    set((state) => ({
      chats: [...state.chats, chat],
      activeChatId: chat.id,
    })),

  deleteChat: (id) =>
    set((state) => {
      const remaining = state.chats.filter((c) => c.id !== id);
      return {
        chats: remaining,
        activeChatId:
          state.activeChatId === id
            ? remaining[0]?.id || null
            : state.activeChatId,
      };
    }),

  addMessage: (chatId, message) =>
    set((state) => ({
      chats: state.chats.map((c) =>
        c.id === chatId
          ? {
              ...c,
              messages: [...c.messages, message],
              updatedAt: new Date().toISOString(),
            }
          : c,
      ),
    })),

  updateChatTitle: (chatId, title) =>
    set((state) => ({
      chats: state.chats.map((c) => (c.id === chatId ? { ...c, title } : c)),
    })),

  setLoading: (loading) => set({ isLoading: loading }),

  clearChats: () =>
    set({
      chats: [
        {
          id: "1",
          title: "New Chat",
          messages: [],
          model: "gemma:2b",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
      activeChatId: "1",
    }),

  getActiveChat: () => {
    const { chats, activeChatId } = get();
    return chats.find((c) => c.id === activeChatId);
  },
}));
