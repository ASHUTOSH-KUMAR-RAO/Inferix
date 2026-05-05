from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    # App
    APP_NAME: str = "Inferix"
    APP_ENV: str = "development"
    APP_PORT: int = 8000
    DEBUG: bool = True

    # Database
    DATABASE_URL: str

    # Ollama
    OLLAMA_BASE_URL: str = "http://localhost:11434"
    OLLAMA_MODEL_1: str = "gemma:2b"
    OLLAMA_MODEL_2: str = "phi3:mini"
    OLLAMA_MODEL_3: str = "llama3.2:3b"

    # Auth - Clerk
    CLERK_SECRET_KEY: str
    CLERK_PUBLISHABLE_KEY: str

    # CORS
    ALLOWED_ORIGINS: str = "http://localhost:3000"

    # Export
    EXPORT_DIR: str = "./exports"

    @property
    def OLLAMA_MODELS(self) -> List[str]:
        return [
            self.OLLAMA_MODEL_1,
            self.OLLAMA_MODEL_2,
            self.OLLAMA_MODEL_3
        ]

    model_config = {"env_file": ".env", "extra": "ignore"}

settings = Settings()
