"""initial schema

Revision ID: 0001_initial
Revises: 
Create Date: 2025-09-11

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '0001_initial'
down_revision = None
branch_labels = None
depends_on = None

def upgrade() -> None:
    op.create_table(
        'users',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('email', sa.String(length=255), nullable=False, unique=True),
        sa.Column('hashed_password', sa.String(length=255), nullable=False),
        sa.Column('full_name', sa.String(length=255), nullable=True),
        sa.Column('role', sa.String(length=50), nullable=False, server_default='admin'),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('CURRENT_TIMESTAMP')),
    )
    op.create_index('ix_users_email', 'users', ['email'], unique=True)

    op.create_table(
        'projects',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('title', sa.String(length=150), nullable=False),
        sa.Column('description', sa.Text, nullable=False),
        sa.Column('tech_stack', sa.String(length=255), nullable=False),
        sa.Column('repo_url', sa.String(length=255), nullable=True),
        sa.Column('demo_url', sa.String(length=255), nullable=True),
        sa.Column('image_url', sa.String(length=255), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('CURRENT_TIMESTAMP')),
    )

    op.create_table(
        'skills',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('name', sa.String(length=100), nullable=False),
        sa.Column('category', sa.String(length=100), nullable=False),
        sa.Column('level', sa.String(length=50), nullable=True),
    )

    op.create_table(
        'certificates',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('title', sa.String(length=200), nullable=False),
        sa.Column('issuer', sa.String(length=200), nullable=False),
        sa.Column('verification_url', sa.String(length=255), nullable=True),
        sa.Column('image_url', sa.String(length=255), nullable=True),
        sa.Column('issued_at', sa.DateTime(timezone=True), server_default=sa.text('CURRENT_TIMESTAMP')),
    )

    op.create_table(
        'experiences',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('company', sa.String(length=200), nullable=False),
        sa.Column('role', sa.String(length=150), nullable=False),
        sa.Column('description', sa.Text, nullable=True),
        sa.Column('start_date', sa.Date, nullable=False),
        sa.Column('end_date', sa.Date, nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('CURRENT_TIMESTAMP')),
    )

    op.create_table(
        'education',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('institution', sa.String(length=200), nullable=False),
        sa.Column('degree', sa.String(length=200), nullable=False),
        sa.Column('field', sa.String(length=200), nullable=True),
        sa.Column('description', sa.Text, nullable=True),
        sa.Column('start_date', sa.Date, nullable=False),
        sa.Column('end_date', sa.Date, nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('CURRENT_TIMESTAMP')),
    )

    op.create_table(
        'contact_messages',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('name', sa.String(length=150), nullable=False),
        sa.Column('email', sa.String(length=255), nullable=False),
        sa.Column('subject', sa.String(length=200), nullable=True),
        sa.Column('message', sa.Text, nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('CURRENT_TIMESTAMP')),
    )
    op.create_index('ix_contact_messages_email', 'contact_messages', ['email'])


def downgrade() -> None:
    op.drop_index('ix_contact_messages_email', table_name='contact_messages')
    op.drop_table('contact_messages')
    op.drop_table('education')
    op.drop_table('experiences')
    op.drop_table('certificates')
    op.drop_table('skills')
    op.drop_table('projects')
    op.drop_index('ix_users_email', table_name='users')
    op.drop_table('users')
