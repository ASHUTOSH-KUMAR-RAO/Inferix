from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.voice_service import voice_service

router = APIRouter()


@router.post("")
async def transcribe_audio(audio: UploadFile = File(...)):
    """
    Transcribe audio file to text.
    Accepts WAV, AIFF, or FLAC audio files.
    Uses Google Speech Recognition (free, no API key needed).
    """
    try:
        audio_bytes = await audio.read()
        text = await voice_service.transcribe(audio_bytes)
        return {"text": text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
