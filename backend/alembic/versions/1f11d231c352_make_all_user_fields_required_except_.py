"""make all user fields required except pan_number

Revision ID: 1f11d231c352
Revises: 56a8abd9e960
Create Date: 2025-11-03 11:22:37.691647

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '1f11d231c352'
down_revision: Union[str, Sequence[str], None] = '56a8abd9e960'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Make all user fields NOT NULL except pan_number"""
    op.alter_column(
        'users', 'company_name',
        existing_type=sa.String(),
        nullable=False,
        existing_nullable=True
    )
    op.alter_column(
        'users', 'location',
        existing_type=sa.String(),
        nullable=False,
        existing_nullable=True
    )
    op.alter_column(
        'users', 'email',
        existing_type=sa.String(),
        nullable=False,
        existing_nullable=True
    )
    op.alter_column(
        'users', 'phone_number',
        existing_type=sa.String(),
        nullable=False,
        existing_nullable=True
    )
    # pan_number remains nullable — no change needed


def downgrade() -> None:
    """Revert: allow NULLs again"""
    op.alter_column('users', 'company_name',  nullable=True)
    op.alter_column('users', 'location',     nullable=True)
    op.alter_column('users', 'email',        nullable=True)
    op.alter_column('users', 'phone_number', nullable=True)