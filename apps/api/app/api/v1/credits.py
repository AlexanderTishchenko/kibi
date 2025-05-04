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

from fastapi import Body
from pydantic import BaseModel

class DeductRequest(BaseModel):
    deduct: int

@router.patch("")
async def deduct_credits(
    payload: DeductRequest = Body(...),
    user: dict = Depends(get_current_user),
):
    # Fetch current credits
    query = db_credits.select().where(db_credits.c.user_id == user.get("sub"))
    record = await database.fetch_one(query)
    if not record:
        raise HTTPException(status_code=400, detail="No credits record found.")
    current_credits = record["credits"]
    if payload.deduct <= 0:
        raise HTTPException(status_code=400, detail="Deduct amount must be positive.")
    if current_credits < payload.deduct:
        raise HTTPException(status_code=400, detail="Insufficient credits.")
    # Deduct credits atomically
    update = db_credits.update().where(db_credits.c.user_id == user.get("sub")).values(credits=db_credits.c.credits - payload.deduct)
    await database.execute(update)
    # Fetch new balance
    new_record = await database.fetch_one(query)
    return {"credits": new_record["credits"]}
