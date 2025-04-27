import sqlalchemy
from databases import Database
from app.core.config import settings
from sqlalchemy import create_engine

database = Database(settings.DATABASE_URL)
metadata = sqlalchemy.MetaData()
engine = create_engine(settings.DATABASE_URL)
