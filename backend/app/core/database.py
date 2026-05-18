from prisma import Prisma
from typing import Optional

# Global Prisma client instance
_client: Optional[Prisma] = None


async def get_db() -> Prisma:
    """Get the Prisma database client."""
    global _client
    if _client is None or not _client.is_connected():
        _client = Prisma()
        await _client.connect()
    return _client


async def connect_db():
    """Connect to the database on startup."""
    global _client
    _client = Prisma()
    await _client.connect()
    print("✅ Database connected")


async def disconnect_db():
    """Disconnect from the database on shutdown."""
    global _client
    if _client is not None and _client.is_connected():
        await _client.disconnect()
        _client = None
        print("🔌 Database disconnected")
