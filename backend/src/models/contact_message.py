from sqlalchemy import Column, Integer, String, Text, DateTime, func
from .base import Base


class ContactMessage(Base):
    __tablename__ = "contact_messages"

    id = Column(Integer, primary_key=True)
    name = Column(String(150), nullable=False)
    email = Column(String(255), nullable=False, index=True)
    subject = Column(String(200), nullable=True)
    message = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())