from sqlalchemy import Column, Integer, String, Text, DateTime, func
from .base import Base

class Certificate(Base):
    __tablename__ = "certificates"

    id = Column(Integer, primary_key=True)
    title = Column(String(200), nullable=False)
    issuer = Column(String(200), nullable=False)
    verification_url = Column(String(255), nullable=True)
    image_url = Column(String(255), nullable=True)
    issued_at = Column(DateTime(timezone=True), server_default=func.now())
