import os
import markdown
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.units import inch
from app.core.config import settings
from app.core.database import get_db


class ExportService:

    def __init__(self):
        # Create exports directory if it doesn't exist
        os.makedirs(settings.EXPORT_DIR, exist_ok=True)

    async def export_chat(self, chat_id: str, format: str) -> str:
        """
        Export a conversation as PDF or Markdown.
        Fetches messages from NeonDB and converts to requested format.
        Returns the file path of the exported file.
        """
        # Fetch conversation from DB
        db = await get_db()
        conversation = await db.conversation.find_unique(
            where={"id": chat_id},
            include={"messages": True},
        )

        if not conversation:
            raise Exception(f"Conversation {chat_id} not found")

        if format == "md":
            return await self._export_markdown(conversation)
        elif format == "pdf":
            return await self._export_pdf(conversation)
        else:
            raise Exception(f"Unsupported format: {format}")

    async def _export_markdown(self, conversation) -> str:
        """Export conversation as Markdown file."""
        lines = [
            f"# {conversation.title}",
            f"**Model:** {conversation.model}",
            f"**Date:** {conversation.createdAt.strftime('%Y-%m-%d %H:%M')}",
            "",
            "---",
            "",
        ]

        for msg in conversation.messages:
            role = "**You**" if msg.role == "user" else f"**{conversation.model}**"
            lines.append(f"{role}: {msg.content}")
            if msg.role == "assistant" and msg.tokensPerSec:
                lines.append(
                    f"> ⚡ {msg.tokensPerSec} tok/s | ⏱ {msg.latency}ms | 💾 {msg.ram}"
                )
            lines.append("")

        content = "\n".join(lines)
        file_path = os.path.join(settings.EXPORT_DIR, f"{conversation.id}.md")

        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)

        return file_path

    async def _export_pdf(self, conversation) -> str:
        """Export conversation as PDF file."""
        file_path = os.path.join(settings.EXPORT_DIR, f"{conversation.id}.pdf")
        doc = SimpleDocTemplate(file_path, pagesize=letter)
        styles = getSampleStyleSheet()
        story = []

        # Title
        story.append(Paragraph(conversation.title, styles["Title"]))
        story.append(Paragraph(f"Model: {conversation.model}", styles["Normal"]))
        story.append(Spacer(1, 0.2 * inch))

        # Messages
        for msg in conversation.messages:
            role = "You" if msg.role == "user" else conversation.model
            story.append(Paragraph(f"<b>{role}:</b>", styles["Normal"]))
            story.append(Paragraph(msg.content, styles["Normal"]))
            if msg.role == "assistant" and msg.tokensPerSec:
                story.append(
                    Paragraph(
                        f"<i>{msg.tokensPerSec} tok/s | {msg.latency}ms | {msg.ram}</i>",
                        styles["Normal"],
                    )
                )
            story.append(Spacer(1, 0.1 * inch))

        doc.build(story)
        return file_path


# Singleton instance
export_service = ExportService()
