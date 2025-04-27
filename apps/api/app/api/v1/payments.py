# apps/api/app/api/v1/payments.py
from fastapi import APIRouter, Request, HTTPException
from app.core.config import settings
from app.db import database
from app.models import db_credits, db_credit_history
from app.api.v1.schemas import (
    CreateSessionRequest, CreateSessionResponse,
    ValidatePromoRequest, ValidatePromoResponse,
    ConfirmSessionResponse
)
import stripe

router = APIRouter()

# Initialize Stripe client
stripe.api_key = settings.STRIPE_SECRET_KEY
stripe.webhook_secret = settings.STRIPE_WEBHOOK_SECRET

@router.post("/webhook", summary="Handle Stripe webhooks")
async def stripe_webhook(request: Request):
    payload = await request.body()
    sig_header = request.headers.get("stripe-signature", "")
    try:
        # If you have a webhook secret, replace settings.STRIPE_SECRET_KEY with it
        event = stripe.Webhook.construct_event(
            payload, sig_header, settings.STRIPE_WEBHOOK_SECRET #settings.STRIPE_SECRET_KEY
        )
    except (ValueError, stripe.error.SignatureVerificationError):
        raise HTTPException(status_code=400, detail="Invalid Stripe webhook payload")

    if event["type"] == "checkout.session.completed":
        session = event["data"]["object"]
        # Process completed checkout: update user credits and record history
        user_id = session.metadata.get("user_id")
        credits = int(session.metadata.get("credits", 0))
        amount_paid = session.amount_total or 0
        promo_code = session.metadata.get("promo_code")

        # idempotency: skip if session already recorded
        existing = await database.fetch_one(
            db_credit_history.select().where(db_credit_history.c.session_id == session.id)
        )
        if not existing:
            # update user balance
            rec = await database.fetch_one(db_credits.select().where(db_credits.c.user_id == user_id))
            if rec:
                new_balance = rec.credits + credits
                await database.execute(
                    db_credits.update().where(db_credits.c.user_id == user_id).values(credits=new_balance)
                )
            else:
                new_balance = credits
                await database.execute(
                    db_credits.insert().values(user_id=user_id, credits=new_balance)
                )
            # insert history record
            await database.execute(
                db_credit_history.insert().values(
                    user_id=user_id,
                    credits=credits,
                    amount_paid_cents=amount_paid,
                    promo_code=promo_code,
                    session_id=session.id
                )
            )
        return {"received": True}
    return {"received": True}

@router.get("", summary="List payments history")
async def list_payments():
    # TODO: fetch real payment records from DB or Stripe
    return [{"id": "pay_123", "amount": 5000, "currency": "usd", "status": "succeeded"}]

# Pricing rules and endpoints for buying credits
PACKAGE_PRICING = {100: 900, 250: 1900, 500: 3400}  # cents
FLAT_RATE_CENTS = 9  # $0.09 per credit

@router.post("/create-session", response_model=CreateSessionResponse)
async def create_session(req: CreateSessionRequest):
    amount = req.amount
    user_id = req.user_id
    if amount in PACKAGE_PRICING:
        price_cents = PACKAGE_PRICING[amount]
    else:
        price_cents = amount * FLAT_RATE_CENTS
    # apply promo
    if req.promo_code:
        promo_list = stripe.PromotionCode.list(code=req.promo_code, limit=1)
        if not promo_list.data:
            raise HTTPException(status_code=400, detail="Invalid promo code")
        promo = promo_list.data[0]
        coupon = promo.coupon
        if not coupon.valid:
            raise HTTPException(status_code=400, detail="Promo code expired or invalid")
        if coupon.percent_off:
            price_cents = int(price_cents * (100 - coupon.percent_off) / 100)
    session = stripe.checkout.Session.create(
        payment_method_types=["card"],
        mode="payment",
        line_items=[{
            "price_data": {"currency": "usd", "product_data": {"name": "Kibi credits"}, "unit_amount": price_cents},
            "quantity": 1
        }],
        metadata={"user_id": user_id, "credits": str(amount), "promo_code": req.promo_code or ""},
        success_url=f"{settings.FRONTEND_URL}/credits?session_id={{CHECKOUT_SESSION_ID}}",
        cancel_url=f"{settings.FRONTEND_URL}/",
    )
    return CreateSessionResponse(url=session.url)

@router.post("/validate-promo", response_model=ValidatePromoResponse)
async def validate_promo(req: ValidatePromoRequest):
    promo_list = stripe.PromotionCode.list(code=req.code, limit=1)
    if not promo_list.data:
        raise HTTPException(status_code=400, detail="Invalid promo code")
    promo = promo_list.data[0]
    coupon = promo.coupon
    if not coupon.valid:
        raise HTTPException(status_code=400, detail="Promo code expired or invalid")
    return ValidatePromoResponse(discount_percent=coupon.percent_off or 0.0)

@router.get("/confirm-session", response_model=ConfirmSessionResponse)
async def confirm_session(session_id: str):
    try:
        session = stripe.checkout.Session.retrieve(session_id)
    except stripe.error.InvalidRequestError:
        raise HTTPException(status_code=400, detail="Invalid session_id")
    if session.payment_status != "paid":
        raise HTTPException(status_code=400, detail="Payment not completed")
    # idempotency: skip if already processed
    existing = await database.fetch_one(
        db_credit_history.select().where(db_credit_history.c.session_id == session.id)
    )
    if existing:
        rec = await database.fetch_one(db_credits.select().where(db_credits.c.user_id == existing.user_id))
        return ConfirmSessionResponse(purchased=existing.credits, new_balance=rec.credits if rec else 0)
    user_id = session.metadata.get("user_id")
    credits = int(session.metadata.get("credits", 0))
    amount_paid = session.amount_total or 0
    promo_code = session.metadata.get("promo_code")
    # update balance
    rec = await database.fetch_one(db_credits.select().where(db_credits.c.user_id == user_id))
    if rec:
        new_balance = rec.credits + credits
        await database.execute(db_credits.update().where(db_credits.c.user_id == user_id).values(credits=new_balance))
    else:
        new_balance = credits
        await database.execute(db_credits.insert().values(user_id=user_id, credits=new_balance))
    # record history
    await database.execute(
        db_credit_history.insert().values(
            user_id=user_id, credits=credits,
            amount_paid_cents=amount_paid,
            promo_code=promo_code, session_id=session.id
        )
    )
    return ConfirmSessionResponse(purchased=credits, new_balance=new_balance)
