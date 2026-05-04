# 🤝 Contributing to Inferix

First off, **thank you** for taking the time to contribute! 🎉
Inferix is an open-source, privacy-first AI playground — and contributions from the community make it better for everyone.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Coding Standards](#coding-standards)
- [Commit Message Convention](#commit-message-convention)
- [Reporting Bugs](#reporting-bugs)
- [Requesting Features](#requesting-features)

---

## 📜 Code of Conduct

By participating in this project, you agree to be respectful, inclusive, and constructive.
We are here to build something great together — harassment, discrimination, or toxic behavior of any kind will not be tolerated.

---

## 💡 How Can I Contribute?

There are many ways to contribute to Inferix:

- 🐛 **Report bugs** — Found something broken? Open an issue.
- 💡 **Request features** — Have an idea? We would love to hear it.
- 🔧 **Fix bugs** — Browse open issues labeled `bug`.
- ✨ **Build features** — Check issues labeled `enhancement` or `good first issue`.
- 📖 **Improve documentation** — Typos, clarity, missing info — all PRs welcome.
- 🧪 **Write tests** — Help us improve test coverage.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js 20+](https://nodejs.org/)
- [Python 3.11+](https://python.org/)
- [Ollama](https://ollama.ai/) installed and running
- [pnpm](https://pnpm.io/) — `npm install -g pnpm`

### Fork & Clone

```bash
# 1. Fork the repo on GitHub, then clone your fork:
git clone https://github.com/YOUR_USERNAME/Inferix.git
cd Inferix

# 2. Add the upstream remote
git remote add upstream https://github.com/ASHUTOSH-KUMAR-RAO/Inferix.git
```

### Setup Environment Variables

```bash
# Frontend
cp frontend/.env.example frontend/.env.local
# Fill in your Clerk and NeonDB keys

# Backend
cp backend/.env.example backend/.env
# Fill in your DATABASE_URL and OLLAMA_BASE_URL
```

### Pull Local Models

```bash
ollama pull gemma:2b
ollama pull phi3:mini
ollama pull llama3.2:3b
```

### Run the Project

```bash
# Terminal 1 — Frontend
cd frontend
pnpm install
pnpm dev

# Terminal 2 — Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

Open [http://localhost:3000](http://localhost:3000) to see Inferix running.

---

## 🔄 Development Workflow

```bash
# 1. Sync with upstream before starting any work
git checkout main
git pull upstream main

# 2. Create your feature or fix branch
git checkout -b feature/your-feature-name
# or for bug fixes:
git checkout -b fix/issue-description

# 3. Make your changes

# 4. Stage and commit with a meaningful message
git add .
git commit -m "feat: add amazing new feature"

# 5. Push to your fork
git push origin feature/your-feature-name

# 6. Open a Pull Request on GitHub
```

---

## 🔃 Pull Request Guidelines

Before submitting a Pull Request, please ensure the following:

- [ ] Your branch is up to date with `main`
- [ ] Your code follows the existing style and conventions
- [ ] You have tested your changes locally
- [ ] Tests are added or updated where applicable
- [ ] No new console errors or warnings are introduced
- [ ] The PR title is clear and descriptive
- [ ] The PR description explains **what** changed and **why**

**PR Title Format:**
```
feat: add voice input toggle
fix: resolve benchmark latency display bug
docs: update backend setup instructions
```

---

## 🧑‍💻 Coding Standards

### Frontend (TypeScript / Next.js)

- Use **TypeScript strict mode** — avoid `any` types
- Follow the **ESLint** rules configured in the project
- Use **Tailwind CSS** utility classes for all styling
- Keep components small, focused, and reusable
- Use **Zustand** for global state — avoid prop drilling
- Prefer named exports over default exports for components

### Backend (Python / FastAPI)

- Follow **PEP 8** style guidelines
- Use **type hints** on all functions and return values
- Keep routers thin — business logic belongs in services
- Handle all errors with proper HTTP status codes
- Document all endpoints using FastAPI's built-in docstrings

---

## 📝 Commit Message Convention

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification:

| Prefix | Description |
|--------|-------------|
| `feat:` | A new feature |
| `fix:` | A bug fix |
| `docs:` | Documentation changes only |
| `style:` | Formatting, missing semicolons, whitespace, etc. |
| `refactor:` | Code change that neither fixes a bug nor adds a feature |
| `test:` | Adding or updating tests |
| `chore:` | Build process or dependency updates |
| `perf:` | Performance improvements |

**Examples:**
```
feat: add side-by-side model comparison view
fix: correct token/sec calculation in benchmark service
docs: add voice input setup instructions
refactor: extract benchmark logic into dedicated service layer
perf: reduce TTFT by optimizing Ollama request headers
```

---

## 🐛 Reporting Bugs

When reporting a bug, please include:

1. **Description** — A clear and concise description of the bug
2. **Steps to Reproduce** — Exact steps to reproduce the behavior
3. **Expected Behavior** — What you expected to happen
4. **Actual Behavior** — What actually happened
5. **Screenshots** — If applicable
6. **Environment:**
   - OS: (e.g., Windows 11, macOS 14, Ubuntu 22.04)
   - Node.js version
   - Python version
   - Ollama version
   - Browser (if a frontend issue)

👉 [Open a Bug Report](https://github.com/ASHUTOSH-KUMAR-RAO/Inferix/issues/new)

---

## 💡 Requesting Features

When requesting a feature, please include:

1. **Problem Statement** — What problem does this feature solve?
2. **Proposed Solution** — How do you envision it working?
3. **Alternatives Considered** — Any other approaches you have thought of?
4. **Additional Context** — Mockups, examples, or references are welcome

👉 [Open a Feature Request](https://github.com/ASHUTOSH-KUMAR-RAO/Inferix/issues/new)

---

## 🙏 Thank You

Every contribution — big or small — makes Inferix better for everyone.
Built with ❤️ by [Ashutosh Kumar Rao](https://github.com/ASHUTOSH-KUMAR-RAO) and contributors like **you**.
