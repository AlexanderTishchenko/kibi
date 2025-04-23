from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from app.core.security import get_current_user
from app.core.config import settings

router = APIRouter()

@router.post('/login')
async def login(form: OAuth2PasswordRequestForm = Depends()):
    # Proxy to Supabase Auth
    return {'access_token': 'dummy', 'token_type': 'bearer'}

@router.post('/refresh')
async def refresh(token: str):
    return {'access_token': 'dummy', 'token_type': 'bearer'}
