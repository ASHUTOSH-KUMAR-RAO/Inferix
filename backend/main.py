from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.core.config import settings
from app.core.database import connect_db, disconnect_db

# Import routers
from app.routers import (
    ai,
    benchmark,
    chat,
    compare,
    export,
    models,
    report,
    templates,
    voice,
)


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    await connect_db()
    yield
    # Shutdown
    await disconnect_db()


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    debug=settings.DEBUG,
    lifespan=lifespan,
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(chat.router,      prefix="/api/chat",      tags=["Chat"])
app.include_router(models.router,    prefix="/api/models",    tags=["Models"])
app.include_router(benchmark.router, prefix="/api/benchmark", tags=["Benchmark"])
app.include_router(compare.router,   prefix="/api/compare",   tags=["Compare"])
app.include_router(ai.router,        prefix="/api/ai",        tags=["AI"])
app.include_router(export.router,    prefix="/api/export",    tags=["Export"])
app.include_router(report.router,    prefix="/api/report",    tags=["Report"])
app.include_router(templates.router, prefix="/api/templates", tags=["Templates"])
app.include_router(voice.router,     prefix="/api/voice",     tags=["Voice"])


@app.get("/health")
async def health_check():
    return {"status": "ok", "app": settings.APP_NAME, "version": settings.APP_VERSION}
