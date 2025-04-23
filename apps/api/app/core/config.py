from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str
    SERVICE_ROLE_KEY: str
    SUPABASE_URL: str
    SUPABASE_ANON_KEY: str
    STRIPE_SECRET_KEY: str
    MAKE_WEBHOOK_TOKEN: str
    OPENAI_API_KEY: str
    RESEND_API_KEY: str

    class Config:
        env_file = ".env"

settings = Settings()
