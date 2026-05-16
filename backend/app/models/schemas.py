from pydantic import BaseModel
from typing import Optional, List, Any
from enum import Enum


# ─── Enums ───────────────────────────────────────────────────────────────────

class ModelName(str, Enum):
    GEMMA   = "gemma:2b"
    PHI3    = "phi3:mini"
    LLAMA   = "llama3.2:3b"


class ExportFormat(str, Enum):
    PDF = "pdf"
    MD  = "md"


# ─── Chat ────────────────────────────────────────────────────────────────────

class ChatRequest(BaseModel):
    message: str
    model: str = "gemma:2b"
    system_prompt: Optional[str] = None
    temperature: Optional[float] = 0.7
    max_tokens: Optional[int] = 1024

class ChatResponse(BaseModel):
    content: str
    tokensPerSec: float
    latency: float
    ram: str
    score: float


# ─── Models ──────────────────────────────────────────────────────────────────

class ModelInfo(BaseModel):
    id: str
    size: str
    status: str

class ModelsListResponse(BaseModel):
    models: List[str]


# ─── Benchmark ───────────────────────────────────────────────────────────────

class BenchmarkRequest(BaseModel):
    prompt: str
    models: List[str]

class BenchmarkResult(BaseModel):
    model: str
    tokensPerSec: float
    latency: float
    ram: str
    score: float

class BenchmarkResponse(BaseModel):
    results: List[BenchmarkResult]

class BenchmarkHistoryResponse(BaseModel):
    history: List[Any]


# ─── Compare ─────────────────────────────────────────────────────────────────

class CompareRequest(BaseModel):
    prompt: str

class CompareResponse(BaseModel):
    responses: List[Any]


# ─── Templates ───────────────────────────────────────────────────────────────

class TemplateCreate(BaseModel):
    title: str
    content: str
    category: Optional[str] = None
    tags: Optional[List[str]] = []

class TemplatesListResponse(BaseModel):
    templates: List[Any]


# ─── AI Features ─────────────────────────────────────────────────────────────

class ImprovePromptRequest(BaseModel):
    prompt: str

class ImprovePromptResponse(BaseModel):
    improved: str

class ScoreResponseRequest(BaseModel):
    response: str
    prompt: str

class ScoreResponseResponse(BaseModel):
    score: float
    reasoning: str

class RecommendModelRequest(BaseModel):
    prompt: str

class RecommendModelResponse(BaseModel):
    model: str
    reason: str

class SummarizeRequest(BaseModel):
    messages: List[Any]

class SummarizeResponse(BaseModel):
    summary: str

class PersonalityRequest(BaseModel):
    responses: List[Any]

class PersonalityResponse(BaseModel):
    personality: Any


# ─── Export ──────────────────────────────────────────────────────────────────

class ExportRequest(BaseModel):
    chatId: str
    format: ExportFormat

class ExportResponse(BaseModel):
    url: str


# ─── Report ──────────────────────────────────────────────────────────────────

class ReportResponse(BaseModel):
    report: Any


# ─── Voice ───────────────────────────────────────────────────────────────────

class VoiceResponse(BaseModel):
    text: str
