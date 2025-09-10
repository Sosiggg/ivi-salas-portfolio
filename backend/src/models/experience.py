from sqlalchemy import Column, Integer, String, Text, Date, DateTime, func
from .base import Base

class Experience(Base):
    __tablename__ = "experiences"

    id = Column(Integer, primary_key=True)
    company = Column(String(200), nullable=False)
    role = Column(String(150), nullable=False)
    description = Column(Text, nullable=True)
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=True)  # null => present
    created_at = Column(DateTime(timezone=True), server_default=func.now())
