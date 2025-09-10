from pydantic import BaseModel
from .base import ORMModel


class SkillCreate(BaseModel):
    name: str
    category: str
    level: str | None = None


class SkillRead(ORMModel):
    id: int
    name: str
    category: str
    level: str | None = None


class SkillList(BaseModel):
    items: list[SkillRead]
    total: int
