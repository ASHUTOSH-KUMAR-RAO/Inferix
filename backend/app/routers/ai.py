from fastapi import APIRouter, HTTPException
from app.models.schemas import (
    ImprovePromptRequest, ImprovePromptResponse,
    ScoreResponseRequest, ScoreResponseResponse,
    RecommendModelRequest, RecommendModelResponse,
    SummarizeRequest, SummarizeResponse,
    PersonalityRequest, PersonalityResponse,
)
from app.services.ai_service import ai_service

router = APIRouter()


@router.post("/improve", response_model=ImprovePromptResponse)
async def improve_prompt(request: ImprovePromptRequest):
    """Rewrite a weak prompt into a clear, detailed, effective prompt."""
    try:
        improved = await ai_service.improve_prompt(request.prompt)
        return {"improved": improved}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/score", response_model=ScoreResponseResponse)
async def score_response(request: ScoreResponseRequest):
    """Score an AI response 1-10 based on accuracy, clarity, and depth."""
    try:
        result = await ai_service.score_response(
            response=request.response,
            prompt=request.prompt,
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/recommend", response_model=RecommendModelResponse)
async def recommend_model(request: RecommendModelRequest):
    """Recommend the best model for a given prompt."""
    try:
        result = await ai_service.recommend_model(request.prompt)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/summarize", response_model=SummarizeResponse)
async def summarize_messages(request: SummarizeRequest):
    """Summarize a long conversation into 2-3 sentences."""
    try:
        summary = await ai_service.summarize_messages(request.messages)
        return {"summary": summary}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/personality", response_model=PersonalityResponse)
async def analyze_personality(request: PersonalityRequest):
    """Analyze model personality traits from a set of responses."""
    try:
        personality = await ai_service.analyze_personality(request.responses)
        return {"personality": personality}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
