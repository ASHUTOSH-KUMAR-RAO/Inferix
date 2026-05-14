export type ModelId = "gemma:2b" | "phi3:mini" | "llama3.2:3b";

export type Model = {
  id: ModelId;
  label: string;
  speed: string;
  color: string;
  bg: string;
  border: string;
  tokensPerSec: number;
  latency: number;
  ram: string;
  score: number;
};

export const MODELS: Model[] = [
  {
    id: "gemma:2b",
    label: "gemma:2b",
    speed: "52 tok/s",
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
    tokensPerSec: 52,
    latency: 310,
    ram: "1.6 GB",
    score: 7.2,
  },
  {
    id: "phi3:mini",
    label: "phi3:mini",
    speed: "38 tok/s",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    tokensPerSec: 38,
    latency: 420,
    ram: "2.3 GB",
    score: 8.6,
  },
  {
    id: "llama3.2:3b",
    label: "llama3.2:3b",
    speed: "28 tok/s",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
    tokensPerSec: 28,
    latency: 580,
    ram: "2.0 GB",
    score: 9.1,
  },
];

export const MODEL_COLORS: Record<string, string> = {
  "gemma:2b": "text-green-400",
  "phi3:mini": "text-blue-400",
  "llama3.2:3b": "text-yellow-400",
};
