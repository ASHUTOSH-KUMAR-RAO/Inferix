from pydantic_settings import BaseSettings
from typing import Optional, List


class Settings(BaseSettings):
    # App
    APP_NAME: str = "Inferix"
    APP_VERSION: str = "0.1.0"
    DEBUG: bool = False
    APP_ENV: str = "development"
    APP_PORT: int = 8000

    # Database
    DATABASE_URL: str

    # Ollama
    OLLAMA_BASE_URL: str = "http://localhost:11434"
    OLLAMA_TIMEOUT: int = 120
    OLLAMA_MODEL_1: str = "gemma:2b"
    OLLAMA_MODEL_2: str = "phi3:mini"
    OLLAMA_MODEL_3: str = "llama3.2:3b"
    DEFAULT_MODEL: str = "gemma:2b"

    # CORS
    ALLOWED_ORIGINS: str = "http://localhost:3000,http://127.0.0.1:3000"

    # Auth (Clerk)
    CLERK_SECRET_KEY: Optional[str] = None
    CLERK_PUBLISHABLE_KEY: Optional[str] = None

    # Export
    EXPORT_DIR: str = "./exports"

    @property
    def origins_list(self) -> List[str]:
        return [o.strip() for o in self.ALLOWED_ORIGINS.split(",")]

    @property
    def available_models(self) -> List[str]:
        return [self.OLLAMA_MODEL_1, self.OLLAMA_MODEL_2, self.OLLAMA_MODEL_3]

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        extra = "ignore"  # ← ye sabse important line hai!


settings = Settings()
