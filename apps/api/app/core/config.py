# apps/api/app/core/config.py
from pydantic_settings import BaseSettings
import logging

# Configure logging to output debug information
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

class Settings(BaseSettings):
    DATABASE_URL: str
    SERVICE_ROLE_KEY: str
    SUPABASE_URL: str
    SUPABASE_ANON_KEY: str
    STRIPE_SECRET_KEY: str
    MAKE_WEBHOOK_TOKEN: str
    OPENAI_API_KEY: str
    RESEND_API_KEY: str
    SUPABASE_JWT_SECRET: str

    class Config:
        env_file = ".env"

settings = Settings()
#logger.debug("Settings loaded: %s", settings.model_dump())
