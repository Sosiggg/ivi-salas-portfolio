from pydantic import BaseModel
from .base import ORMModel


class CertificateCreate(BaseModel):
    title: str
    issuer: str
    verification_url: str | None = None
    image_url: str | None = None


class CertificateRead(ORMModel):
    id: int
    title: str
    issuer: str
    verification_url: str | None = None
    image_url: str | None = None


class CertificateList(BaseModel):
    items: list[CertificateRead]
    total: int
