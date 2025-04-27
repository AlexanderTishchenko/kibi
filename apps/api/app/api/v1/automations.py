# apps/api/app/api/v1/automations.py
from fastapi import APIRouter, Depends
from app.core.security import get_current_user
from app.db import database
from app.models import db_automation_runs
from app.api.v1.schemas import AutomationRun
from typing import List

router = APIRouter()

@router.get("/runs", response_model=List[AutomationRun])
async def list_runs(user: dict = Depends(get_current_user)):
    # Query automation runs for authenticated user
    query = db_automation_runs.select().where(db_automation_runs.c.user_id == user.get("sub"))
    records = await database.fetch_all(query)
    return [AutomationRun(**dict(record)) for record in records]
