from fastapi import APIRouter, HTTPException
from app.models.schemas import TemplateCreate, TemplatesListResponse
from app.core.database import get_db

router = APIRouter()


@router.get("", response_model=TemplatesListResponse)
async def list_templates():
    """Get all saved prompt templates from NeonDB."""
    try:
        db = await get_db()
        templates = await db.template.find_many(
            order={"createdAt": "desc"}
        )
        return {
            "templates": [
                {
                    "id": t.id,
                    "title": t.title,
                    "content": t.content,
                    "category": t.category,
                    "tags": t.tags,
                    "createdAt": t.createdAt.isoformat(),
                }
                for t in templates
            ]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("")
async def create_template(template: TemplateCreate):
    """Save a new prompt template to NeonDB."""
    try:
        db = await get_db()
        created = await db.template.create(
            data={
                "title": template.title,
                "content": template.content,
                "category": template.category or "",
                "tags": template.tags or [],
            }
        )
        return {
            "id": created.id,
            "title": created.title,
            "content": created.content,
            "category": created.category,
            "tags": created.tags,
            "createdAt": created.createdAt.isoformat(),
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/{template_id}")
async def delete_template(template_id: str):
    """Delete a prompt template from NeonDB."""
    try:
        db = await get_db()
        await db.template.delete(where={"id": template_id})
        return {"message": f"Template {template_id} deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
