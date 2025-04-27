from sqlalchemy import Table, Column, Integer, String, DateTime, Float, func
from app.db import metadata

# User credits table
db_credits = Table(
    "user_credits",
    metadata,
    Column("id", Integer, primary_key=True, index=True),
    Column("user_id", String, nullable=False, unique=True, index=True),
    Column("credits", Integer, nullable=False, default=0),
)

# Automation runs table
db_automation_runs = Table(
    "automation_runs",
    metadata,
    Column("id", Integer, primary_key=True, index=True),
    Column("user_id", String, nullable=False, index=True),
    Column("workflow", String, nullable=False),
    Column("status", String, nullable=False),
    Column("time_saved", Float, nullable=False),
    Column("credits_used", Integer, nullable=False),
    Column("timestamp", DateTime, server_default=func.now()),
)

# --------------------- Credit history table ---------------------
db_credit_history = Table(
    "credit_history",
    metadata,
    Column("id", Integer, primary_key=True, index=True),
    Column("user_id", String, nullable=False, index=True),
    Column("credits", Integer, nullable=False),
    Column("amount_paid_cents", Integer, nullable=False),
    Column("promo_code", String, nullable=True),
    Column("session_id", String, nullable=False, unique=True, index=True),
    Column("created_at", DateTime, server_default=func.now(), nullable=False),
)
