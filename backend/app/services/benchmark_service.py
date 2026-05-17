import asyncio
from app.services.ollama_service import ollama_service
from app.core.database import get_db


class BenchmarkService:

    async def run(self, prompt: str, models: list[str]) -> list[dict]:
        """
        Run benchmark on multiple models simultaneously.
        Sends the same prompt to all requested models and collects metrics.
        Uses asyncio.gather to run all models in parallel for speed.
        """
        tasks = [self._benchmark_single(prompt, model) for model in models]
        results = await asyncio.gather(*tasks, return_exceptions=True)

        final = []
        for i, result in enumerate(results):
            if isinstance(result, Exception):
                # If a model fails, return error entry instead of crashing
                final.append({
                    "model": models[i],
                    "tokensPerSec": 0.0,
                    "latency": 0.0,
                    "ram": "N/A",
                    "score": 0.0,
                    "error": str(result),
                })
            else:
                final.append(result)

        # Save results to NeonDB
        await self._save_results(prompt, final)

        return final

    async def _benchmark_single(self, prompt: str, model: str) -> dict:
        """Run benchmark on a single model and return metrics."""
        result = await ollama_service.chat(
            message=prompt,
            model=model,
        )
        return {
            "model": model,
            "tokensPerSec": result["tokensPerSec"],
            "latency": result["latency"],
            "ram": result["ram"],
            "score": result["score"],
        }

    async def _save_results(self, prompt: str, results: list[dict]):
        """Save benchmark results to NeonDB."""
        try:
            db = await get_db()
            for result in results:
                if "error" not in result:
                    await db.benchmarkresult.create(
                        data={
                            "prompt": prompt,
                            "model": result["model"],
                            "tokensPerSec": result["tokensPerSec"],
                            "latency": result["latency"],
                            "ram": result["ram"],
                            "score": result["score"],
                        }
                    )
        except Exception as e:
            print(f"Benchmark DB save error: {e}")

    async def get_history(self) -> list[dict]:
        """Get benchmark history from NeonDB."""
        try:
            db = await get_db()
            results = await db.benchmarkresult.find_many(
                order={"createdAt": "desc"},
                take=50,
            )
            return [
                {
                    "id": r.id,
                    "prompt": r.prompt,
                    "model": r.model,
                    "tokensPerSec": r.tokensPerSec,
                    "latency": r.latency,
                    "ram": r.ram,
                    "score": r.score,
                    "createdAt": r.createdAt.isoformat(),
                }
                for r in results
            ]
        except Exception as e:
            print(f"Benchmark history error: {e}")
            return []


# Singleton instance
benchmark_service = BenchmarkService()
