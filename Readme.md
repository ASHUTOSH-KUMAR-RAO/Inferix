<div align="center">

<br />

```
██╗███╗   ██╗███████╗███████╗██████╗ ██╗██╗  ██╗
██║████╗  ██║██╔════╝██╔════╝██╔══██╗██║╚██╗██╔╝
██║██╔██╗ ██║█████╗  █████╗  ██████╔╝██║ ╚███╔╝
██║██║╚██╗██║██╔══╝  ██╔══╝  ██╔══██╗██║ ██╔██╗
██║██║ ╚████║██║     ███████╗██║  ██║██║██╔╝ ██╗
╚═╝╚═╝  ╚═══╝╚═╝     ╚══════╝╚═╝  ╚═╝╚═╝╚═╝  ╚═╝
```

### 🧠 Your Privacy-First, Offline AI Playground

**Run. Compare. Benchmark. All offline.**

<br />

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Ollama](https://img.shields.io/badge/Ollama-Local_AI-white?style=for-the-badge)](https://ollama.ai/)
[![LangChain](https://img.shields.io/badge/LangChain-Enabled-1C3C3C?style=for-the-badge)](https://langchain.com/)
[![NeonDB](https://img.shields.io/badge/NeonDB-PostgreSQL-00E599?style=for-the-badge&logo=postgresql)](https://neon.tech/)
[![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF?style=for-the-badge)](https://clerk.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](./LICENSE)

<br />

[🚀 Live Demo](#) · [📖 Docs](#) · [🐛 Report Bug](https://github.com/ASHUTOSH-KUMAR-RAO/Inferix/issues) · [💡 Request Feature](https://github.com/ASHUTOSH-KUMAR-RAO/Inferix/issues)

<br />

</div>

---

## 🧠 What is Inferix?

**Inferix** is a production-grade, privacy-first AI playground that lets you run, benchmark, and compare Small Language Models (SLMs) **entirely on your own machine** — no internet required, no API costs, no data leaving your device.

Think of it as **your own offline ChatGPT** — but smarter, faster, and completely in your control.

> *"We built a privacy-first, offline AI playground that benchmarks and compares Small Language Models on your own hardware — no cloud, no cost, no compromise."*

---

## ✨ Features

### 🤖 Core
- **Multi-Model Chat** — Chat with `gemma:2b`, `phi3:mini`, and `llama3.2:3b` with one-click model switching
- **Streaming Responses** — Real-time token-by-token output just like ChatGPT
- **Conversation History** — All chats saved and accessible anytime via NeonDB

### ⚡ Benchmarking
- **Live Benchmark Bar** — Tokens/sec, latency (ms), RAM usage, CPU%, time-to-first-token shown with every response
- **Historical Dashboard** — Track and compare benchmark performance over time with interactive Recharts graphs

### 📊 Model Comparison
- **Side-by-Side Compare Mode** — Send one prompt to all 3 models simultaneously and compare outputs
- **Model Personality Analyzer** — AI-powered analysis of each model's personality: creativity, factuality, verbosity

### 🧠 AI-Powered Features
- **Auto Prompt Improver** — Weak prompt in → optimized prompt out, automatically
- **Response Quality Scorer** — Every response rated 1–10 on accuracy, clarity, and depth
- **Use-Case Recommender** — Real-time suggestion of which model best fits your current task
- **Smart Context Summarizer** — Automatic conversation summarization before context window fills up

### 🎯 Productivity
- **Voice Input** — Speak your prompt directly into the mic
- **System Prompt Editor** — Set custom personas and instructions per session
- **Prompt Templates Library** — Browse, use, and save reusable prompt templates
- **Export Chat** — Download any conversation as PDF or Markdown

### 🔒 Privacy
- **100% Offline Inference** — All AI runs locally via Ollama. Zero prompts sent to any cloud
- **Clear Privacy Boundary** — Inference is local; only conversation history touches NeonDB (documented tradeoff)
- **Privacy Indicator** — Every page shows exactly what is local vs cloud

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| Next.js 16 (App Router) | Core framework |
| TypeScript (strict) | Type safety |
| Tailwind CSS v4 | Styling |
| shadcn/ui + Aceternity UI | UI components |
| Framer Motion | Animations & transitions |
| Zustand | Global state management |
| Recharts | Benchmark charts & graphs |

### Backend
| Technology | Purpose |
|---|---|
| Python + FastAPI | REST API server |
| LangChain | AI chain orchestration |
| Ollama | Local model inference |
| psutil + asyncio | Benchmarking & performance metrics |

### Infrastructure
| Technology | Purpose |
|---|---|
| NeonDB (PostgreSQL) | Cloud database |
| Prisma ORM | Database schema & queries |
| Clerk | Authentication (Email, GitHub, Google) |
| pnpm | Fast package management |

### Local Models
| Model | Size | Strength |
|---|---|---|
| `gemma:2b` | ~1.6 GB | Fastest, most lightweight |
| `phi3:mini` | ~2.3 GB | Balanced quality & speed |
| `llama3.2:3b` | ~2.0 GB | Most popular, strong reasoning |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────┐
│              Next.js 16 Frontend             │
│   (Clerk Auth · Zustand · Framer Motion)    │
└──────────────────┬──────────────────────────┘
                   │ HTTP / Streaming
┌──────────────────▼──────────────────────────┐
│           FastAPI Backend (Python)           │
│         LangChain · psutil · asyncio        │
└───────────┬──────────────────┬──────────────┘
            │                  │
┌───────────▼──────┐  ┌────────▼─────────────┐
│  Ollama (Local)  │  │   NeonDB (PostgreSQL) │
│  gemma:2b        │  │   Prisma ORM          │
│  phi3:mini       │  │   Conversations       │
│  llama3.2:3b     │  │   Benchmarks          │
│  100% Offline ✅ │  │   Templates · Reports │
└──────────────────┘  └──────────────────────┘
```

### Privacy Boundary

```
🟢 LOCAL (Your Machine)          ☁️  CLOUD (NeonDB)
─────────────────────────        ──────────────────
✅ All AI model inference         📝 Conversation history
✅ Prompt processing              📊 Benchmark results
✅ Response generation            📄 Saved templates
✅ Voice input processing         👤 User preferences
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js 20+](https://nodejs.org/)
- [Python 3.11+](https://python.org/)
- [Ollama](https://ollama.ai/) installed and running
- [pnpm](https://pnpm.io/) — `npm install -g pnpm`

### 1. Clone the Repository

```bash
git clone https://github.com/ASHUTOSH-KUMAR-RAO/Inferix.git
cd inferix
```

### 2. Pull Local Models

```bash
ollama pull gemma:2b
ollama pull phi3:mini
ollama pull llama3.2:3b
```

### 3. Setup Environment Variables

```bash
# Frontend (.env.local)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
CLERK_SECRET_KEY=your_secret
DATABASE_URL=your_neondb_url
NEXT_PUBLIC_API_URL=http://localhost:8000

# Backend (.env)
DATABASE_URL=your_neondb_url
OLLAMA_BASE_URL=http://localhost:11434
```

### 4. Install & Run Frontend

```bash
cd frontend
pnpm install
pnpm dev
```

### 5. Install & Run Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### 6. Open Inferix

```
http://localhost:3000
```

---

## 📸 Screenshots

> Coming soon — UI under development 🎨

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the repository
2. Create your feature branch — `git checkout -b feature/AmazingFeature`
3. Commit your changes — `git commit -m 'Add some AmazingFeature'`
4. Push to the branch — `git push origin feature/AmazingFeature`
5. Open a Pull Request

Please make sure to update tests as appropriate and follow the existing code style.

---

## 📋 Changelog

### [Unreleased]
- Initial project setup
- Architecture planning
- Tech stack finalization

### [0.1.0] — Coming Soon
- Multi-model chat with Ollama
- Live benchmarking
- Side-by-side model comparison
- Clerk authentication

---

## 📄 License

Distributed under the MIT License. See [`LICENSE`](./LICENSE) for more information.

---

## 🙏 Acknowledgements

- [Ollama](https://ollama.ai/) — Making local AI actually possible
- [LangChain](https://langchain.com/) — The backbone of our AI orchestration
- [shadcn/ui](https://ui.shadcn.com/) — Beautiful, accessible components
- [Aceternity UI](https://ui.aceternity.com/) — Stunning animated components
- [NeonDB](https://neon.tech/) — Serverless PostgreSQL made easy
- [Clerk](https://clerk.dev/) — The best auth experience for Next.js

---

<div align="center">

**Built with ❤️ by [Ashutosh Kumar Rao](https://github.com/ASHUTOSH-KUMAR-RAO)**

*If Inferix helped you, please consider giving it a ⭐ on GitHub!*

</div>
