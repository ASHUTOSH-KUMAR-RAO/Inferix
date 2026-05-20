import time
import psutil
import httpx
import json
from typing import AsyncGenerator
from app.core.config import settings


class OllamaService:
    def __init__(self):
        self.base_url = settings.OLLAMA_BASE_URL
        self.timeout = settings.OLLAMA_TIMEOUT

    # ─── Health Check ────────────────────────────────────────────────────────

    async def is_running(self) -> bool:
        """Check if Ollama is running."""
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(f"{self.base_url}/api/tags", timeout=5)
                return response.status_code == 200
        except Exception:
            return False

    # ─── Models ──────────────────────────────────────────────────────────────

    async def list_models(self) -> list[str]:
        """List all available models in Ollama."""
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    f"{self.base_url}/api/tags", timeout=self.timeout
                )
                data = response.json()
                models = [m["name"] for m in data.get("models", [])]
                return models
        except Exception:
            return settings.available_models

    async def get_model_info(self, model: str) -> dict:
        """Get info about a specific model."""
        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    f"{self.base_url}/api/show",
                    json={"name": model},
                    timeout=self.timeout,
                )
                data = response.json()
                size_bytes = data.get("details", {}).get("parameter_size", "Unknown")
                return {
                    "id": model,
                    "size": str(size_bytes),
                    "status": "available",
                }
        except Exception:
            return {"id": model, "size": "Unknown", "status": "unavailable"}

    # ─── Chat ─────────────────────────────────────────────────────────────────

    async def chat(
        self,
        message: str,
        model: str = "gemma:2b",
        system_prompt: str | None = None,
        temperature: float = 0.7,
        max_tokens: int = 1024,
    ) -> dict:
        """Send a chat message and return response with benchmark metrics."""

        messages = []
        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})
        messages.append({"role": "user", "content": message})

        # Capture metrics
        ram_before = psutil.virtual_memory().used
        start_time = time.time()

        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    f"{self.base_url}/api/chat",
                    json={
                        "model": model,
                        "messages": messages,
                        "stream": False,
                        "options": {
                            "temperature": temperature,
                            "num_predict": max_tokens,
                        },
                    },
                    timeout=self.timeout,
                )
                data = response.json()

            end_time = time.time()
            ram_after = psutil.virtual_memory().used

            # Calculate metrics
            latency = round((end_time - start_time) * 1000, 2)  # ms
            content = data.get("message", {}).get("content", "")
            eval_count = data.get("eval_count", 1)
            eval_duration = data.get("eval_duration", 1)  # nanoseconds
            tokens_per_sec = round(
                eval_count / (eval_duration / 1e9), 2
            ) if eval_duration > 0 else 0.0
            ram_used_mb = round((ram_after - ram_before) / (1024 ** 2), 1)
            ram_str = f"{ram_used_mb} MB" if ram_used_mb > 0 else "< 1 MB"

            # Calculate quality score using ai_service
            # Import here to avoid circular imports
            score = 0.0
            try:
                from app.services.ai_service import ai_service
                result = await ai_service.score_response(
                    response=content,
                    prompt=message,
                )
                score = result.get("score", 0.0)
            except Exception:
                score = 0.0  # Silently fail — score is optional

            return {
                "content": content,
                "tokensPerSec": tokens_per_sec,
                "latency": latency,
                "ram": ram_str,
                "score": score,
            }

        except Exception as e:
            raise Exception(f"Ollama chat error: {str(e)}")

    # ─── Streaming Chat ───────────────────────────────────────────────────────

    async def chat_stream(
        self,
        message: str,
        model: str = "gemma:2b",
        system_prompt: str | None = None,
    ) -> AsyncGenerator[str, None]:
        """Stream chat response token by token."""

        messages = []
        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})
        messages.append({"role": "user", "content": message})

        try:
            async with httpx.AsyncClient() as client:
                async with client.stream(
                    "POST",
                    f"{self.base_url}/api/chat",
                    json={
                        "model": model,
                        "messages": messages,
                        "stream": True,
                    },
                    timeout=self.timeout,
                ) as response:
                    async for line in response.aiter_lines():
                        if line:
                            try:
                                data = json.loads(line)
                                token = data.get("message", {}).get("content", "")
                                if token:
                                    yield token
                                if data.get("done"):
                                    break
                            except json.JSONDecodeError:
                                continue
        except Exception as e:
            raise Exception(f"Ollama stream error: {str(e)}")

    # ─── Raw Generate (for AI features) ──────────────────────────────────────

    async def generate(
        self,
        prompt: str,
        model: str = "gemma:2b",
        system: str | None = None,
    ) -> str:
        """Simple text generation for AI utility features."""
        try:
            async with httpx.AsyncClient() as client:
                payload = {
                    "model": model,
                    "prompt": prompt,
                    "stream": False,
                }
                if system:
                    payload["system"] = system

                response = await client.post(
                    f"{self.base_url}/api/generate",
                    json=payload,
                    timeout=self.timeout,
                )
                data = response.json()
                return data.get("response", "")
        except Exception as e:
            raise Exception(f"Ollama generate error: {str(e)}")


# Singleton instance
ollama_service = OllamaService()
