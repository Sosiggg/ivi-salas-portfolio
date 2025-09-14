"""Set default role to user instead of admin

Revision ID: 0003_default_role_user
Revises: 0002_placeholder
Create Date: 2025-09-15
"""
from alembic import op

revision = '0003_default_role_user'
down_revision = '0002_placeholder'
branch_labels = None
depends_on = None


def upgrade():
    # Adjust server default if a default constraint is used implicitly (SQLite may ignore)
    # For PostgreSQL, we can run an ALTER TABLE to change default.
    op.execute("ALTER TABLE users ALTER COLUMN role SET DEFAULT 'user';")


def downgrade():
    op.execute("ALTER TABLE users ALTER COLUMN role SET DEFAULT 'admin';")
