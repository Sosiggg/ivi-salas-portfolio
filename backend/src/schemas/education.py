from pydantic import BaseModel
from datetime import date
from .base import ORMModel


class EducationCreate(BaseModel):
    institution: str
    degree: str
    field: str | None = None
    description: str | None = None
    start_date: date
    end_date: date | None = None


class EducationRead(ORMModel):
    id: int
    institution: str
    degree: str
    field: str | None = None
    description: str | None = None
    start_date: date
    end_date: date | None = None


class EducationList(BaseModel):
    items: list[EducationRead]
    total: int
