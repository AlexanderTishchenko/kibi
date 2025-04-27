# apps/api/app/api/v1/credits.py
from fastapi import APIRouter, Depends, HTTPException
from app.core.security import get_current_user
from app.db import database
from app.models import db_credits
from app.api.v1.schemas import CreditResponse
import sqlalchemy

router = APIRouter()

@router.get("", response_model=CreditResponse)
async def get_credits(user: dict = Depends(get_current_user)):
    # Query user credits
    query = db_credits.select().where(db_credits.c.user_id == user.get("sub"))
    record = await database.fetch_one(query)
    if not record:
        return CreditResponse(credits=0)
    # Record does not support .get; use direct indexing
    return CreditResponse(credits=record["credits"])
