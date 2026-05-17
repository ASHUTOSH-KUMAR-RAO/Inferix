from fastapi import APIRouter, HTTPException
from app.models.schemas import CompareRequest, CompareResponse
from app.services.ollama_service import ollama_service
from app.core.config import settings
import asyncio

router = APIRouter()


@router.post("", response_model=CompareResponse)
async def compare_models(request: CompareRequest):
    """
    Send the same prompt to all 3 models simultaneously.
    Returns responses from all models for side-by-side comparison.
    Uses asyncio.gather to run all models in parallel.
    """
    try:
        models = settings.available_models

        # Run all models in parallel
        tasks = [
            ollama_service.chat(message=request.prompt, model=model)
            for model in models
        ]
        results = await asyncio.gather(*tasks, return_exceptions=True)

        responses = []
        for i, result in enumerate(results):
            if isinstance(result, Exception):
                responses.append({
                    "model": models[i],
                    "content": f"Error: {str(result)}",
                    "tokensPerSec": 0.0,
                    "latency": 0.0,
                    "ram": "N/A",
                    "score": 0.0,
                })
            else:
                responses.append({
                    "model": models[i],
                    "content": result["content"],
                    "tokensPerSec": result["tokensPerSec"],
                    "latency": result["latency"],
                    "ram": result["ram"],
                    "score": result["score"],
                })

        return {"responses": responses}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
