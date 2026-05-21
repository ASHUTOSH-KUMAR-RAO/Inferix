from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from app.models.schemas import ChatRequest, ChatResponse
from app.services.ollama_service import ollama_service
from app.core.database import get_db
import json

router = APIRouter()


@router.post("", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """Send a chat message and get response with metrics."""
    try:
        result = await ollama_service.chat(
            message=request.message,
            model=request.model,
            system_prompt=request.system_prompt,
            temperature=request.temperature or 0.7,
            max_tokens=request.max_tokens or 1024,
        )

        # Save to database
        try:
            db = await get_db()
            conversation = await db.conversation.create(
                data={
                    "title": request.message[:50],
                    "model": request.model,
                }
            )
            await db.message.create(
                data={
                    "role": "user",
                    "content": request.message,
                    "conversationId": conversation.id,
                }
            )
            await db.message.create(
                data={
                    "role": "assistant",
                    "content": result["content"],
                    "tokensPerSec": result["tokensPerSec"],
                    "latency": result["latency"],
                    "ram": result["ram"],
                    "score": result["score"],
                    "conversationId": conversation.id,
                }
            )
        except Exception as db_error:
            # Don't fail the request if DB save fails
            print(f"DB save error: {db_error}")

        return result

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/stream")
async def chat_stream(request: ChatRequest):
    """Stream chat response token by token."""
    try:
        async def generate():
            async for token in ollama_service.chat_stream(
                message=request.message,
                model=request.model,
                system_prompt=request.system_prompt,
            ):
                yield f"data: {json.dumps({'token': token})}\n\n"
            yield "data: [DONE]\n\n"

        return StreamingResponse(
            generate(),
            media_type="text/event-stream",
            headers={
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
            },
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
@router.get("/conversations")
async def get_conversations():
    """Get all conversations from Supabase."""
    try:
        db = await get_db()
        conversations = await db.conversation.find_many(
            order={"createdAt": "desc"},
            take=50,
        )
        return {
            "conversations": [
                {
                    "id": c.id,
                    "title": c.title,
                    "model": c.model,
                    "createdAt": c.createdAt.isoformat(),
                }
                for c in conversations
            ]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/conversations/{conversation_id}")
async def get_conversation_messages(conversation_id: str):
    """Get all messages for a specific conversation."""
    try:
        db = await get_db()
        conversation = await db.conversation.find_unique(
            where={"id": conversation_id},
            include={"messages": True},
        )
        if not conversation:
            raise HTTPException(status_code=404, detail="Conversation not found")
        return {
            "id": conversation.id,
            "title": conversation.title,
            "model": conversation.model,
            "messages": [
                {
                    "id": m.id,
                    "role": m.role,
                    "content": m.content,
                    "tokensPerSec": m.tokensPerSec,
                    "latency": m.latency,
                    "ram": m.ram,
                    "score": m.score,
                    "createdAt": m.createdAt.isoformat(),
                }
                for m in conversation.messages
            ],
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/conversations/{conversation_id}")
async def delete_conversation(conversation_id: str):
    """Delete a conversation and all its messages."""
    try:
        db = await get_db()
        await db.conversation.delete(
            where={"id": conversation_id}
        )
        return {"message": "Conversation deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
