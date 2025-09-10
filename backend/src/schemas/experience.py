from pydantic import BaseModel
from datetime import date
from .base import ORMModel


class ExperienceCreate(BaseModel):
    company: str
    role: str
    description: str | None = None
    start_date: date
    end_date: date | None = None


class ExperienceRead(ORMModel):
    id: int
    company: str
    role: str
    description: str | None = None
    start_date: date
    end_date: date | None = None


class ExperienceList(BaseModel):
    items: list[ExperienceRead]
    total: int
