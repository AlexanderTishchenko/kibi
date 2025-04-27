# apps/api/app/main.py
from fastapi import FastAPI
from prometheus_fastapi_instrumentator import Instrumentator
from app.db import database
from app.api.v1 import auth, automations, credits, payments, webhook_make
import logging
from fastapi.middleware.cors import CORSMiddleware

logging.basicConfig(level=logging.INFO)
app = FastAPI(title="Kibi API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:8000",
        "http://localhost:8001",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

@app.get("/health")
def health():
    return {"status": "ok"}

app.include_router(auth.router, prefix="/v1/auth", tags=["auth"])
app.include_router(credits.router, prefix="/v1/credits", tags=["credits"])
app.include_router(automations.router, prefix="/v1/automations", tags=["automations"])
app.include_router(payments.router, prefix="/v1/payments", tags=["payments"])
app.include_router(webhook_make.router, prefix="/v1/webhook_make", tags=["webhook_make"])

Instrumentator().instrument(app).expose(app)
