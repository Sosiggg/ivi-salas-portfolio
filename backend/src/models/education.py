from sqlalchemy import Column, Integer, String, Text, Date, DateTime, func
from .base import Base

class Education(Base):
    __tablename__ = "education"

    id = Column(Integer, primary_key=True)
    institution = Column(String(200), nullable=False)
    degree = Column(String(200), nullable=False)
    field = Column(String(200), nullable=True)
    description = Column(Text, nullable=True)
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
