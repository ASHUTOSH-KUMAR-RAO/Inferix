"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Save, RotateCcw, Brain, Sliders, Shield, Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const MODELS = [
  { id: "gemma:2b", speed: "52 tok/s", color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20" },
  { id: "phi3:mini", speed: "38 tok/s", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
  { id: "llama3.2:3b", speed: "28 tok/s", color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/20" },
];

const DEFAULT_SYSTEM_PROMPT = "You are a helpful, accurate, and concise AI assistant running locally via Ollama. Always provide clear and well-structured responses.";

type Settings = {
  defaultModel: string;
  systemPrompt: string;
  temperature: number;
  maxTokens: number;
  streamingEnabled: boolean;
  benchmarkEnabled: boolean;
  voiceEnabled: boolean;
  autoImprovePrompts: boolean;
  privacyMode: boolean;
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    defaultModel: "gemma:2b",
    systemPrompt: DEFAULT_SYSTEM_PROMPT,
    temperature: 0.7,
    maxTokens: 2048,
    streamingEnabled: true,
    benchmarkEnabled: true,
    voiceEnabled: true,
    autoImprovePrompts: false,
    privacyMode: true,
  });
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handleReset() {
    setSettings({
      defaultModel: "gemma:2b",
      systemPrompt: DEFAULT_SYSTEM_PROMPT,
      temperature: 0.7,
      maxTokens: 2048,
      streamingEnabled: true,
      benchmarkEnabled: true,
      voiceEnabled: true,
      autoImprovePrompts: false,
      privacyMode: true,
    });
  }

  function Toggle({ value, onChange }: { value: boolean; onChange: () => void }) {
    return (
      <button
        onClick={onChange}
        className={`relative w-10 h-5 rounded-full transition-colors ${
          value ? "bg-red-500" : "bg-white/10"
        }`}
      >
        <motion.div
          animate={{ x: value ? 20 : 2 }}
          transition={{ duration: 0.2 }}
          className="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow"
        />
      </button>
    );
  }

  return (
    <div className="bg-[#0a0a0a] min-h-screen">

      {/* Header */}
      <div className="px-4 md:px-6 py-4 border-b border-white/[0.06]">
        <div className="max-w-[700px] mx-auto flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-[18px] font-medium text-white tracking-[-0.4px] mb-0.5">
              Settings
            </h1>
            <p className="text-[13px] text-white/30">
              Configure your Inferix experience
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 rounded-[8px] bg-white/[0.05] border border-white/[0.08] text-white/50 text-[13px] hover:bg-white/[0.08] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 rounded-[8px] bg-red-500 text-white text-[13px] font-medium hover:bg-red-600 transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              {saved ? "Saved! ✓" : "Save Changes"}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 md:px-6 py-4 max-w-[700px] mx-auto space-y-4 pb-10">

        {/* Default Model */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#111] border border-white/[0.07] rounded-[14px] p-4"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 bg-red-500/10 rounded-[7px] flex items-center justify-center">
              <Brain className="w-3.5 h-3.5 text-red-400" />
            </div>
            <h2 className="text-[14px] font-medium text-white/80">Default Model</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {MODELS.map((model) => (
              <button
                key={model.id}
                onClick={() => setSettings((s) => ({ ...s, defaultModel: model.id }))}
                className={`flex items-center justify-between px-3 py-2.5 rounded-[10px] border transition-all ${
                  settings.defaultModel === model.id
                    ? `${model.bg} ${model.border} ${model.color}`
                    : "bg-[#0a0a0a] border-white/[0.07] text-white/40 hover:border-white/15"
                }`}
              >
                <span className="text-[12px] font-medium">{model.id}</span>
                <span className="text-[10px] opacity-60">{model.speed}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* System Prompt */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#111] border border-white/[0.07] rounded-[14px] p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-blue-500/10 rounded-[7px] flex items-center justify-center">
                <Sliders className="w-3.5 h-3.5 text-blue-400" />
              </div>
              <h2 className="text-[14px] font-medium text-white/80">System Prompt</h2>
            </div>
            <button
              onClick={() => setSettings((s) => ({ ...s, systemPrompt: DEFAULT_SYSTEM_PROMPT }))}
              className="text-[11px] text-white/25 hover:text-white/50 transition-colors"
            >
              Reset to default
            </button>
          </div>
          <textarea
            value={settings.systemPrompt}
            onChange={(e) => setSettings((s) => ({ ...s, systemPrompt: e.target.value }))}
            rows={4}
            className="w-full bg-[#0a0a0a] border border-white/[0.08] rounded-[10px] px-3 py-2.5 text-[13px] text-white/65 placeholder:text-white/25 outline-none focus:border-red-500/30 transition-colors resize-none leading-relaxed"
          />
          <p className="text-[11px] text-white/20 mt-2">
            This prompt is sent to the model before every conversation
          </p>
        </motion.div>

        {/* Model Parameters */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#111] border border-white/[0.07] rounded-[14px] p-4"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 bg-yellow-500/10 rounded-[7px] flex items-center justify-center">
              <Sliders className="w-3.5 h-3.5 text-yellow-400" />
            </div>
            <h2 className="text-[14px] font-medium text-white/80">Model Parameters</h2>
          </div>

          <div className="space-y-4">
            {/* Temperature */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="text-[13px] text-white/65">Temperature</div>
                  <div className="text-[11px] text-white/25">Higher = more creative, Lower = more focused</div>
                </div>
                <Badge variant="outline" className="bg-white/[0.04] border-white/10 text-white/50 text-[12px]">
                  {settings.temperature}
                </Badge>
              </div>
              <input
                type="range"
                min={0}
                max={1}
                step={0.1}
                value={settings.temperature}
                onChange={(e) => setSettings((s) => ({ ...s, temperature: parseFloat(e.target.value) }))}
                className="w-full accent-red-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-white/20 mt-1">
                <span>Focused (0.0)</span>
                <span>Creative (1.0)</span>
              </div>
            </div>

            {/* Max Tokens */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="text-[13px] text-white/65">Max Tokens</div>
                  <div className="text-[11px] text-white/25">Maximum length of model response</div>
                </div>
                <Badge variant="outline" className="bg-white/[0.04] border-white/10 text-white/50 text-[12px]">
                  {settings.maxTokens}
                </Badge>
              </div>
              <input
                type="range"
                min={256}
                max={4096}
                step={256}
                value={settings.maxTokens}
                onChange={(e) => setSettings((s) => ({ ...s, maxTokens: parseInt(e.target.value) }))}
                className="w-full accent-red-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-white/20 mt-1">
                <span>256</span>
                <span>4096</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Feature Toggles */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#111] border border-white/[0.07] rounded-[14px] p-4"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 bg-green-500/10 rounded-[7px] flex items-center justify-center">
              <Bell className="w-3.5 h-3.5 text-green-400" />
            </div>
            <h2 className="text-[14px] font-medium text-white/80">Features</h2>
          </div>

          <div className="space-y-3">
            {[
              { key: "streamingEnabled", label: "Streaming Responses", desc: "Show responses token by token" },
              { key: "benchmarkEnabled", label: "Live Benchmarking", desc: "Show tok/s, latency, RAM with each response" },
              { key: "voiceEnabled", label: "Voice Input", desc: "Enable microphone for voice prompts" },
              { key: "autoImprovePrompts", label: "Auto Improve Prompts", desc: "Automatically enhance your prompts before sending" },
            ].map((feature) => (
              <div key={feature.key} className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-none">
                <div>
                  <div className="text-[13px] text-white/65">{feature.label}</div>
                  <div className="text-[11px] text-white/25">{feature.desc}</div>
                </div>
                <Toggle
                  value={settings[feature.key as keyof Settings] as boolean}
                  onChange={() => setSettings((s) => ({ ...s, [feature.key]: !s[feature.key as keyof Settings] }))}
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Privacy */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-[#111] border border-white/[0.07] rounded-[14px] p-4"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 bg-red-500/10 rounded-[7px] flex items-center justify-center">
              <Shield className="w-3.5 h-3.5 text-red-400" />
            </div>
            <h2 className="text-[14px] font-medium text-white/80">Privacy</h2>
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <div className="text-[13px] text-white/65">Privacy Mode</div>
              <div className="text-[11px] text-white/25">
                Disable conversation history sync to NeonDB
              </div>
            </div>
            <Toggle
              value={settings.privacyMode}
              onChange={() => setSettings((s) => ({ ...s, privacyMode: !s.privacyMode }))}
            />
          </div>

          <div className="mt-3 bg-green-500/[0.06] border border-green-500/15 rounded-[10px] px-3 py-2.5">
            <p className="text-[12px] text-green-400/70 leading-relaxed">
              🔒 All AI inference runs locally via Ollama — your prompts never leave your machine regardless of this setting.
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
