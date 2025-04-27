from datetime import datetime
from pydantic import BaseModel
from typing import Optional

class CreditResponse(BaseModel):
    credits: int

class AutomationRun(BaseModel):
    id: int
    workflow: str
    status: str
    time_saved: float
    credits_used: int
    timestamp: datetime

class CreateSessionRequest(BaseModel):
    amount: int
    promo_code: Optional[str] = None
    user_id: str  # include the test user ID when bypassing auth in dev

class CreateSessionResponse(BaseModel):
    url: str

class ValidatePromoRequest(BaseModel):
    code: str

class ValidatePromoResponse(BaseModel):
    discount_percent: float

class ConfirmSessionResponse(BaseModel):
    purchased: int
    new_balance: int
