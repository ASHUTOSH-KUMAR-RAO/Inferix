"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, Copy, Check, Tag, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/api";

type Template = {
  id: string;
  title: string;
  content: string;
  category: string;
  isCustom?: boolean;
};

const CATEGORIES = [
  "All",
  "Coding",
  "Writing",
  "Analysis",
  "Creative",
  "Custom",
];

const DEFAULT_TEMPLATES: Template[] = [
  {
    id: "d1",
    title: "Explain like I'm 5",
    content:
      "Explain [topic] in simple terms that a 5-year-old could understand.",
    category: "Writing",
  },
  {
    id: "d2",
    title: "Code Review",
    content:
      "Review the following code and suggest improvements for readability, performance, and best practices:\n\n[paste code here]",
    category: "Coding",
  },
  {
    id: "d3",
    title: "Debug Helper",
    content:
      "I'm getting this error: [error message]\n\nHere's my code:\n[paste code]\n\nWhat's wrong and how do I fix it?",
    category: "Coding",
  },
  {
    id: "d4",
    title: "Summarize Text",
    content:
      "Summarize the following text in 3-5 bullet points:\n\n[paste text here]",
    category: "Analysis",
  },
  {
    id: "d5",
    title: "Write a Blog Post",
    content:
      "Write a blog post about [topic]. Include an introduction, 3 main points, and a conclusion. Make it engaging and informative.",
    category: "Writing",
  },
  {
    id: "d6",
    title: "Pros and Cons",
    content:
      "List the pros and cons of [topic]. Be objective and comprehensive.",
    category: "Analysis",
  },
  {
    id: "d7",
    title: "Write a Story",
    content:
      "Write a short story about [topic]. Include interesting characters, a conflict, and a resolution.",
    category: "Creative",
  },
  {
    id: "d8",
    title: "Python Function",
    content:
      "Write a Python function that [description]. Include type hints, docstring, and example usage.",
    category: "Coding",
  },
  {
    id: "d9",
    title: "Translate Text",
    content: "Translate the following text to [language]:\n\n[paste text here]",
    category: "Writing",
  },
  {
    id: "d10",
    title: "Compare Two Things",
    content:
      "Compare and contrast [thing 1] and [thing 2]. Cover similarities, differences, pros, and cons of each.",
    category: "Analysis",
  },
  {
    id: "d11",
    title: "Haiku Generator",
    content:
      "Write a haiku about [topic]. Follow the 5-7-5 syllable structure.",
    category: "Creative",
  },
  {
    id: "d12",
    title: "SQL Query",
    content: "Write a SQL query to [description]. Explain what each part does.",
    category: "Coding",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  Coding: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  Writing: "text-green-400 bg-green-500/10 border-green-500/20",
  Analysis: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  Creative: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  Custom: "text-red-400 bg-red-500/10 border-red-500/20",
};

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>(DEFAULT_TEMPLATES);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newCategory, setNewCategory] = useState("Custom");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch templates from backend on mount
  useEffect(() => {
    async function fetchTemplates() {
      try {
        const response = await api.templates.list();
        if (response.templates.length > 0) {
          // Merge backend templates with default templates
          const backendTemplates = response.templates.map((t: any) => ({
            id: t.id,
            title: t.title,
            content: t.content,
            category: t.category || "Custom",
            isCustom: true,
          }));
          setTemplates([...backendTemplates, ...DEFAULT_TEMPLATES]);
        }
      } catch (err) {
        // If backend fails, just show default templates
        console.error("Failed to fetch templates:", err);
      }
    }
    fetchTemplates();
  }, []);

  const filtered = templates.filter((t) => {
    const matchCat = activeCategory === "All" || t.category === activeCategory;
    const matchSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.content.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  function handleCopy(template: Template) {
    navigator.clipboard.writeText(template.content);
    setCopiedId(template.id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  async function handleAdd() {
    if (!newTitle.trim() || !newContent.trim()) return;
    setIsLoading(true);
    setError(null);

    try {
      // Save to backend
      const created = (await api.templates.create({
        title: newTitle.trim(),
        content: newContent.trim(),
        category: newCategory,
        tags: [],
      })) as any;

      const newTemplate: Template = {
        id: created.id || Date.now().toString(),
        title: newTitle.trim(),
        content: newContent.trim(),
        category: newCategory,
        isCustom: true,
      };

      setTemplates((prev) => [newTemplate, ...prev]);
      setNewTitle("");
      setNewContent("");
      setShowAdd(false);
    } catch (err) {
      setError("Failed to save template. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete(id: string) {
    // Only delete from backend if it's a custom template (not default)
    const template = templates.find((t) => t.id === id);
    if (template?.isCustom && !id.startsWith("d")) {
      try {
        await api.templates.delete(id);
      } catch (err) {
        console.error("Failed to delete template:", err);
      }
    }
    setTemplates((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div className="flex flex-col bg-[#0a0a0a] min-h-screen">
      {/* Header */}
      <div className="px-4 md:px-6 py-4 border-b border-white/[0.06] flex-shrink-0">
        <div className="max-w-[900px] mx-auto flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-[18px] font-medium text-white tracking-[-0.4px] mb-0.5">
              Prompt Templates
            </h1>
            <p className="text-[13px] text-white/30">
              Browse, use, and save reusable prompts
            </p>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAdd(!showAdd)}
            className="flex items-center gap-2 px-4 py-2 rounded-[8px] bg-red-500 text-white text-[13px] font-medium hover:bg-red-600 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            New Template
          </motion.button>
        </div>
      </div>

      <div className="flex-1">
        <div className="px-4 md:px-6 py-4 max-w-[900px] mx-auto space-y-4 pb-8">
          {/* Error Banner */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-[10px] px-4 py-3 text-red-400 text-[13px]">
              {error}
            </div>
          )}

          {/* Add Template Form */}
          <AnimatePresence>
            {showAdd && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-[#111] border border-red-500/20 rounded-[14px] p-4 overflow-hidden"
              >
                <div className="text-[13px] font-medium text-white/70 mb-3">
                  Create New Template
                </div>
                <div className="flex flex-col gap-3">
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Template title..."
                    className="w-full bg-[#0a0a0a] border border-white/[0.08] rounded-[8px] px-3 py-2 text-[13px] text-white/70 placeholder:text-white/25 outline-none focus:border-red-500/40 transition-colors"
                  />
                  <textarea
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder="Template content... use [placeholder] for dynamic parts"
                    rows={4}
                    className="w-full bg-[#0a0a0a] border border-white/[0.08] rounded-[8px] px-3 py-2 text-[13px] text-white/70 placeholder:text-white/25 outline-none focus:border-red-500/40 transition-colors resize-none"
                  />
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[12px] text-white/30">Category:</span>
                    {[
                      "Coding",
                      "Writing",
                      "Analysis",
                      "Creative",
                      "Custom",
                    ].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setNewCategory(cat)}
                        className={`text-[11px] px-2.5 py-1 rounded-full border transition-colors ${
                          newCategory === cat
                            ? CATEGORY_COLORS[cat]
                            : "text-white/30 border-white/[0.08] hover:bg-white/[0.04]"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowAdd(false)}
                      className="flex-1 py-2 rounded-[8px] text-[13px] text-white/40 border border-white/[0.08] hover:bg-white/[0.04] transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAdd}
                      disabled={
                        !newTitle.trim() || !newContent.trim() || isLoading
                      }
                      className="flex-1 py-2 rounded-[8px] text-[13px] text-white font-medium bg-red-500 hover:bg-red-600 transition-colors disabled:opacity-40"
                    >
                      {isLoading ? "Saving..." : "Save Template"}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search templates..."
              className="w-full bg-[#111] border border-white/[0.08] rounded-[10px] pl-9 pr-4 py-2.5 text-[13px] text-white/70 placeholder:text-white/25 outline-none focus:border-red-500/30 transition-colors"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative text-[12px] px-4 py-1.5 rounded-full border transition-all ${
                  activeCategory === cat
                    ? "text-white border-white/20 bg-white/10"
                    : "text-white/35 border-white/[0.08] hover:text-white/60 hover:bg-white/[0.04]"
                }`}
              >
                {cat}
                {cat !== "All" && (
                  <span className="ml-1.5 text-[10px] text-white/20">
                    {templates.filter((t) => t.category === cat).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <AnimatePresence mode="wait">
              {filtered.map((template, i) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ delay: i * 0.04 }}
                  className="bg-[#111] border border-white/[0.07] rounded-[14px] p-4 hover:border-white/[0.12] transition-colors group"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-[13px] font-medium text-white/80">
                      {template.title}
                    </h3>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      {template.isCustom && (
                        <button
                          onClick={() => handleDelete(template.id)}
                          className="opacity-0 group-hover:opacity-100 text-white/20 hover:text-red-400 transition-all"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <button
                        onClick={() => handleCopy(template)}
                        className="flex items-center gap-1 text-[11px] text-white/30 hover:text-white/60 transition-colors"
                      >
                        {copiedId === template.id ? (
                          <Check className="w-3.5 h-3.5 text-green-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                        {copiedId === template.id ? "Copied!" : "Copy"}
                      </button>
                    </div>
                  </div>

                  <p className="text-[12px] text-white/30 leading-relaxed line-clamp-3 mb-3">
                    {template.content}
                  </p>

                  <div className="flex items-center justify-between">
                    <Badge
                      variant="outline"
                      className={`text-[10px] px-2 py-0.5 ${CATEGORY_COLORS[template.category]}`}
                    >
                      <Tag className="w-2.5 h-2.5 mr-1" />
                      {template.category}
                    </Badge>
                    {template.isCustom && (
                      <span className="text-[10px] text-white/20">Custom</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-[13px] text-white/25">
                No templates found for "{search}"
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
