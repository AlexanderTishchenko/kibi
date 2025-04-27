from fastapi import APIRouter, Request, HTTPException
from app.core.config import settings
import stripe

router = APIRouter()

# Initialize Stripe client
stripe.api_key = settings.STRIPE_SECRET_KEY

@router.post("/webhook", summary="Handle Stripe webhooks")
async def stripe_webhook(request: Request):
    payload = await request.body()
    sig_header = request.headers.get("stripe-signature", "")
    try:
        # If you have a webhook secret, replace settings.STRIPE_SECRET_KEY with it
        event = stripe.Webhook.construct_event(
            payload, sig_header, settings.STRIPE_SECRET_KEY
        )
    except (ValueError, stripe.error.SignatureVerificationError):
        raise HTTPException(status_code=400, detail="Invalid Stripe webhook payload")
    # TODO: process event.type and update your records
    return {"received": True}

@router.get("", summary="List payments history")
async def list_payments():
    # TODO: fetch real payment records from DB or Stripe
    return [{"id": "pay_123", "amount": 5000, "currency": "usd", "status": "succeeded"}]
