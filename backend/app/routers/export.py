from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
from app.models.schemas import ExportRequest, ExportResponse
from app.services.export_service import export_service
import os

router = APIRouter()


@router.post("")
async def export_chat(request: ExportRequest):
    """
    Export a conversation as PDF or Markdown.
    Returns the exported file as a download response.
    """
    try:
        file_path = await export_service.export_chat(
            chat_id=request.chatId,
            format=request.format.value,
        )

        media_type = "application/pdf" if request.format == "pdf" else "text/markdown"
        filename = os.path.basename(file_path)

        return FileResponse(
            path=file_path,
            media_type=media_type,
            filename=filename,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
