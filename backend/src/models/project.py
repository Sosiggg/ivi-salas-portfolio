from sqlalchemy import Column, Integer, String, Text, DateTime, func
from .base import Base

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True)
    title = Column(String(150), nullable=False)
    description = Column(Text, nullable=False)
    tech_stack = Column(String(255), nullable=False)
    repo_url = Column(String(255), nullable=True)
    demo_url = Column(String(255), nullable=True)
    image_url = Column(String(255), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
