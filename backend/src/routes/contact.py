from fastapi import APIRouter, Depends
from pydantic import BaseModel, EmailStr, Field
from sqlalchemy.orm import Session
from ..utils.database import get_db
from ..models.contact_message import ContactMessage

router = APIRouter(prefix="/contact", tags=["contact"])


class ContactRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=150)
    email: EmailStr
    subject: str | None = Field(None, max_length=200)
    message: str = Field(..., min_length=10, max_length=4000)


@router.post('/', status_code=201)
def submit_message(data: ContactRequest, db: Session = Depends(get_db)):
    item = ContactMessage(**data.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return {"id": item.id, "created_at": item.created_at}