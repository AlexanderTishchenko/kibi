"""add credit_history table

Revision ID: ae2468b12345
Revises: c4914cbd2b00
Create Date: 2025-04-27 20:17:00.000000
"""

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = 'ae2468b12345'
down_revision = 'c4914cbd2b00'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'credit_history',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('user_id', sa.String(), nullable=False),
        sa.Column('credits', sa.Integer(), nullable=False),
        sa.Column('amount_paid_cents', sa.Integer(), nullable=False),
        sa.Column('promo_code', sa.String(), nullable=True),
        sa.Column('session_id', sa.String(), nullable=False, unique=True),
        sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=False),
    )
    op.create_index(op.f('ix_credit_history_user_id'), 'credit_history', ['user_id'], unique=False)
    op.create_index(op.f('ix_credit_history_session_id'), 'credit_history', ['session_id'], unique=True)


def downgrade():
    op.drop_index(op.f('ix_credit_history_session_id'), table_name='credit_history')
    op.drop_index(op.f('ix_credit_history_user_id'), table_name='credit_history')
    op.drop_table('credit_history')
