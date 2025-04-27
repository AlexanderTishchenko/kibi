from fastapi import APIRouter, Request, HTTPException
from app.core.config import settings

router = APIRouter()

@router.post("", summary="Handle Make.com webhook")
async def handle_make_webhook(request: Request):
    # Validate Make.com webhook token
    token = request.headers.get("X-Make-Token") or request.headers.get("authorization")
    if token != settings.MAKE_WEBHOOK_TOKEN:
        raise HTTPException(status_code=401, detail="Invalid Make.com webhook token")
    payload = await request.json()
    # TODO: process Make.com payload (e.g., trigger automation run)
    return {"received": True, "payload": payload}
