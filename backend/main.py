from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.core.config import settings
from app.routers import (
    chat, benchmark, compare,
    models, templates, report,
    export, ai, voice
)

@asynccontextmanager
async def lifespan(app: FastAPI):
    print(f"🚀 Inferix Backend starting on port {settings.APP_PORT}")
    print(f"🤖 Ollama URL: {settings.OLLAMA_BASE_URL}")
    yield
    print("🛑 Inferix Backend shutting down...")

app = FastAPI(
    title="Inferix API",
    description="Privacy-first, offline AI playground backend",
    version="0.1.0",
    lifespan=lifespan
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.ALLOWED_ORIGINS],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(chat.router,       prefix="/api/chat",      tags=["Chat"])
app.include_router(benchmark.router,  prefix="/api/benchmark", tags=["Benchmark"])
app.include_router(compare.router,    prefix="/api/compare",   tags=["Compare"])
app.include_router(models.router,     prefix="/api/models",    tags=["Models"])
app.include_router(templates.router,  prefix="/api/templates", tags=["Templates"])
app.include_router(report.router,     prefix="/api/report",    tags=["Report"])
app.include_router(export.router,     prefix="/api/export",    tags=["Export"])
app.include_router(ai.router,         prefix="/api/ai",        tags=["AI"])
app.include_router(voice.router,      prefix="/api/voice",     tags=["Voice"])

@app.get("/")
async def root():
    return {
        "app": "Inferix",
        "version": "0.1.0",
        "status": "running",
        "docs": "/docs"
    }

@app.get("/health")
async def health():
    return {"status": "healthy"}
