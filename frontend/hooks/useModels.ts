import { useModelStore } from "@/store/useModelStore";
import { MODELS } from "@/types/models";
import type { ModelId } from "@/types/models";

export function useModels() {
  const { models, selectedModel, setSelectedModel, setSelectedModelById } =
    useModelStore();

  function getModelById(id: ModelId) {
    return MODELS.find((m) => m.id === id);
  }

  function getModelColor(id: string) {
    const colors: Record<string, string> = {
      "gemma:2b": "text-green-400",
      "phi3:mini": "text-blue-400",
      "llama3.2:3b": "text-yellow-400",
    };
    return colors[id] || "text-white/50";
  }

  return {
    models,
    selectedModel,
    setSelectedModel,
    setSelectedModelById,
    getModelById,
    getModelColor,
  };
}
