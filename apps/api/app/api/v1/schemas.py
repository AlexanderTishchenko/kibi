from datetime import datetime
from pydantic import BaseModel

class CreditResponse(BaseModel):
    credits: int

class AutomationRun(BaseModel):
    id: int
    workflow: str
    status: str
    time_saved: float
    credits_used: int
    timestamp: datetime
