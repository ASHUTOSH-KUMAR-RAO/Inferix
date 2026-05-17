from fastapi import APIRouter, HTTPException
from app.models.schemas import ModelsListResponse, ModelInfo
from app.services.ollama_service import ollama_service

router = APIRouter()


@router.get("", response_model=ModelsListResponse)
async def list_models():
    """Get all available Ollama models."""
    models = await ollama_service.list_models()
    return {"models": models}


@router.get("/{model}", response_model=ModelInfo)
async def get_model(model: str):
    """Get info about a specific model."""
    info = await ollama_service.get_model_info(model)
    if info["status"] == "unavailable":
        raise HTTPException(status_code=404, detail=f"Model '{model}' not found")
    return info
