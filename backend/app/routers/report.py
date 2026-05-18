from fastapi import APIRouter, HTTPException
from app.core.database import get_db

router = APIRouter()


@router.get("")
async def generate_report():
    """
    Generate a comprehensive performance report.
    Aggregates benchmark history, conversation stats,
    and model performance data from NeonDB.
    """
    try:
        db = await get_db()

        # Fetch all benchmark results
        benchmarks = await db.benchmarkresult.find_many(
            order={"createdAt": "desc"},
            take=100,
        )

        # Fetch all conversations
        conversations = await db.conversation.find_many(
            order={"createdAt": "desc"},
            take=50,
        )

        # Aggregate stats per model
        model_stats = {}
        for b in benchmarks:
            if b.model not in model_stats:
                model_stats[b.model] = {
                    "model": b.model,
                    "totalRuns": 0,
                    "avgTokensPerSec": 0,
                    "avgLatency": 0,
                    "avgScore": 0,
                }
            stats = model_stats[b.model]
            n = stats["totalRuns"]
            stats["avgTokensPerSec"] = (stats["avgTokensPerSec"] * n + b.tokensPerSec) / (n + 1)
            stats["avgLatency"] = (stats["avgLatency"] * n + b.latency) / (n + 1)
            stats["avgScore"] = (stats["avgScore"] * n + b.score) / (n + 1)
            stats["totalRuns"] += 1

        # Round values
        for model in model_stats:
            stats = model_stats[model]
            stats["avgTokensPerSec"] = round(stats["avgTokensPerSec"], 2)
            stats["avgLatency"] = round(stats["avgLatency"], 2)
            stats["avgScore"] = round(stats["avgScore"], 2)

        report = {
            "summary": {
                "totalConversations": len(conversations),
                "totalBenchmarkRuns": len(benchmarks),
                "modelsUsed": list(model_stats.keys()),
            },
            "modelPerformance": list(model_stats.values()),
            "recentBenchmarks": [
                {
                    "model": b.model,
                    "prompt": b.prompt[:50],
                    "tokensPerSec": b.tokensPerSec,
                    "latency": b.latency,
                    "createdAt": b.createdAt.isoformat(),
                }
                for b in benchmarks[:10]
            ],
            "recentConversations": [
                {
                    "id": c.id,
                    "title": c.title,
                    "model": c.model,
                    "createdAt": c.createdAt.isoformat(),
                }
                for c in conversations[:10]
            ],
        }

        return {"report": report}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
