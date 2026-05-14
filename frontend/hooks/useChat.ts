import { useChatStore } from "@/store/useChatStore";
import { useModelStore } from "@/store/useModelStore";
import type { Message } from "@/types/index";

export function useChat() {
  const {
    chats,
    activeChatId,
    isLoading,
    setActiveChatId,
    addChat,
    deleteChat,
    addMessage,
    updateChatTitle,
    setLoading,
    getActiveChat,
  } = useChatStore();

  const { selectedModel } = useModelStore();

  const activeChat = getActiveChat();

  function createNewChat() {
    const id = Date.now().toString();
    addChat({
      id,
      title: "New Chat",
      messages: [],
      model: selectedModel.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return id;
  }

  async function sendMessage(content: string) {
    if (!content.trim() || !activeChatId) return;
    setLoading(true);

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      createdAt: new Date().toISOString(),
    };

    addMessage(activeChatId, userMsg);

    // Update title if first message
    if (activeChat?.messages.length === 0) {
      updateChatTitle(activeChatId, content.slice(0, 40) + "...");
    }

    // Placeholder — backend se connect karenge baad mein
    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content:
          "This is a placeholder response. Backend will be connected to run actual Ollama inference.",
        model: selectedModel.id,
        tokensPerSec: selectedModel.tokensPerSec,
        latency: selectedModel.latency,
        ram: selectedModel.ram,
        score: selectedModel.score,
        createdAt: new Date().toISOString(),
      };
      addMessage(activeChatId, aiMsg);
      setLoading(false);
    }, 1200);
  }

  return {
    chats,
    activeChat,
    activeChatId,
    isLoading,
    createNewChat,
    sendMessage,
    deleteChat,
    setActiveChatId,
  };
}
