import { create } from "zustand";
import { MODELS } from "@/types/models";
import type { Model, ModelId } from "@/types/models";

type ModelStore = {
  models: Model[];
  selectedModel: Model;
  setSelectedModel: (model: Model) => void;
  setSelectedModelById: (id: ModelId) => void;
};

export const useModelStore = create<ModelStore>((set) => ({
  models: MODELS,
  selectedModel: MODELS[0],
  setSelectedModel: (model) => set({ selectedModel: model }),
  setSelectedModelById: (id) => {
    const model = MODELS.find((m) => m.id === id);
    if (model) set({ selectedModel: model });
  },
}));
