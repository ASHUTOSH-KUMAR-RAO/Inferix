from fastapi import APIRouter, HTTPException
from app.models.schemas import BenchmarkRequest, BenchmarkResponse, BenchmarkHistoryResponse
from app.services.benchmark_service import benchmark_service

router = APIRouter()


@router.post("", response_model=BenchmarkResponse)
async def run_benchmark(request: BenchmarkRequest):
    """
    Run benchmark on multiple models with the same prompt.
    Returns tokensPerSec, latency, RAM, and score for each model.
    All models run in parallel using asyncio.gather.
    """
    try:
        results = await benchmark_service.run(
            prompt=request.prompt,
            models=request.models,
        )
        return {"results": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/history", response_model=BenchmarkHistoryResponse)
async def get_benchmark_history():
    """Get past benchmark results from NeonDB."""
    try:
        history = await benchmark_service.get_history()
        return {"history": history}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
