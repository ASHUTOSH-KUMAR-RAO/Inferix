# 📋 Changelog

All notable changes to **Inferix** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### In Progress
- Initial project setup and repository structure
- Architecture planning and tech stack finalization
- Backend boilerplate with FastAPI
- Frontend scaffold with Next.js 16 App Router

---

## [0.1.0] — Coming Soon

### Added

#### Core Chat
- Multi-model chat interface supporting `gemma:2b`, `phi3:mini`, and `llama3.2:3b`
- One-click model switching during active conversations
- Real-time streaming responses with token-by-token output
- Persistent conversation history stored via NeonDB

#### Benchmarking
- Live benchmark bar displaying tokens/sec, latency (ms), RAM usage, CPU%, and time-to-first-token (TTFT)
- Historical benchmark dashboard with interactive Recharts graphs
- Per-response benchmark data tracking and storage

#### Model Comparison
- Side-by-side compare mode — send one prompt to all 3 models simultaneously
- AI-powered model personality analyzer (creativity, factuality, verbosity scores)

#### AI-Powered Features
- Auto Prompt Improver — automatically optimizes weak or vague prompts
- Response Quality Scorer — rates each response 1–10 on accuracy, clarity, and depth
- Use-Case Recommender — real-time suggestion of the best model for your current task
- Smart Context Summarizer — automatically summarizes conversation before context window fills

#### Productivity
- Voice input — speak prompts directly using the microphone
- System Prompt Editor — set custom personas and instructions per session
- Prompt Templates Library — browse, use, and save reusable prompt templates
- Export Chat — download any conversation as PDF or Markdown

#### Privacy & Security
- 100% offline inference — all AI model processing runs locally via Ollama
- Privacy Indicator — every page clearly shows what is local vs cloud
- Clerk authentication with Email, GitHub, and Google sign-in support

#### Infrastructure
- FastAPI backend with LangChain orchestration
- NeonDB (PostgreSQL) integration via Prisma ORM
- Docker support via `Dockerfile`
- Environment variable setup via `.env.example`

---

## Version Format Reference

```
## [MAJOR.MINOR.PATCH] — YYYY-MM-DD

### Added      → New features
### Changed    → Changes to existing functionality
### Deprecated → Features that will be removed in a future release
### Removed    → Features removed in this release
### Fixed      → Bug fixes
### Security   → Security patches and vulnerability fixes
```

---

*For the full commit history, see the [GitHub Releases](https://github.com/ASHUTOSH-KUMAR-RAO/Inferix/releases) page.*
