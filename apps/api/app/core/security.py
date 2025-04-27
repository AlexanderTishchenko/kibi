# apps/api/app/core/security.py
from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt
from app.core.config import settings
import logging

security = HTTPBearer()
logger = logging.getLogger("core.security")

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    #logger.debug("Authenticating token: %s", token[:20] + "...")  # не выводим весь токен, обрезаем
    try:
        payload = jwt.decode(
            token,
            settings.SUPABASE_JWT_SECRET,
            algorithms=["HS256"],
            audience='authenticated')
        logger.debug("JWT payload: %s", payload)
    except jwt.PyJWTError as e:
        logger.warning("JWT decode failed: %s", str(e))
        raise HTTPException(status_code=401, detail="Invalid auth credentials")
    return payload
