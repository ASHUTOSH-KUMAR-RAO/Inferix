import asyncio
from prisma import Prisma
from typing import Optional

# Global Prisma client instance
_client: Optional[Prisma] = None


async def _warmup():
    """
    Background pre-warm task.

    NeonDB (free tier) uses 'Scale to Zero' — it suspends compute after
    5 minutes of inactivity to save costs. When a new connection comes in,
    it takes 3-10 seconds to wake up (cold start latency).

    Strategy used here:
    1. Lazy Connection — DB does not connect at server startup.
       This prevents server crash if NeonDB is still waking up.
    2. Background Pre-warm — After server starts, we send a lightweight
       SELECT 1 query in the background to trigger NeonDB wake-up.
       By the time the first real user request arrives, DB is already warm.
    3. Retry Logic — If connection fails, we retry 5 times with 5s delay
       to handle slow cold starts gracefully.
    """
    await asyncio.sleep(2)  # Wait for server to fully start
    try:
        await get_db()
        print("🔥 Database pre-warmed successfully!")
    except Exception as e:
        print(f"⚠️ Pre-warm failed (will retry on first request): {e}")


async def get_db() -> Prisma:
    """
    Get the Prisma database client.
    Uses lazy connection — connects only when first called,
    not at server startup.
    """
    global _client
    if _client is None or not _client.is_connected():
        _client = Prisma()
        for attempt in range(5):
            try:
                await _client.connect()
                # SELECT 1 wakes up NeonDB compute if suspended
                await _client.execute_raw("SELECT 1")
                print("✅ Database connected and warmed up!")
                break
            except Exception:
                if attempt < 4:
                    print(f"⚠️ DB attempt {attempt + 1} failed, retrying in 5s...")
                    await asyncio.sleep(5)
                else:
                    raise
    return _client


async def connect_db():
    """
    Called at server startup (lifespan).
    Does NOT block — launches pre-warm as a background task.
    Server starts instantly regardless of DB state.
    """
    print("✅ Inferix started! Pre-warming database in background...")
    asyncio.create_task(_warmup())


async def disconnect_db():
    """Disconnect from the database on shutdown."""
    global _client
    if _client is not None and _client.is_connected():
        await _client.disconnect()
        _client = None
        print("🔌 Database disconnected")
