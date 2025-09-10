from pydantic import BaseModel
from .base import ORMModel


class ProjectCreate(BaseModel):
    title: str
    description: str
    tech_stack: str
    repo_url: str | None = None
    demo_url: str | None = None
    image_url: str | None = None


class ProjectRead(ORMModel):
    id: int
    title: str
    description: str
    tech_stack: str
    repo_url: str | None = None
    demo_url: str | None = None
    image_url: str | None = None


class ProjectList(BaseModel):
    items: list[ProjectRead]
    total: int
