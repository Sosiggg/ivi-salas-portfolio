from fastapi import APIRouter, Depends, Query, HTTPException, status
from sqlalchemy.orm import Session
from ..utils.database import get_db
from ..models.experience import Experience
from ..schemas.experience import ExperienceCreate, ExperienceRead, ExperienceList
from ..utils.security import get_current_user_id

router = APIRouter(prefix="/experiences", tags=["experiences"])


@router.get('/', response_model=ExperienceList)
def list_experiences(db: Session = Depends(get_db), skip: int = 0, limit: int = Query(50, le=100)):
    q = db.query(Experience).order_by(Experience.start_date.desc())
    total = q.count()
    items = q.offset(skip).limit(limit).all()
    return {"items": items, "total": total}


@router.post('/', response_model=ExperienceRead, status_code=status.HTTP_201_CREATED)
def create_experience(data: ExperienceCreate, db: Session = Depends(get_db), user_id: str = Depends(get_current_user_id)):
    exp = Experience(**data.model_dump())
    db.add(exp)
    db.commit()
    db.refresh(exp)
    return exp


@router.delete('/{experience_id}', status_code=status.HTTP_204_NO_CONTENT)
def delete_experience(experience_id: int, db: Session = Depends(get_db), user_id: str = Depends(get_current_user_id)):
    exp = db.get(Experience, experience_id)
    if not exp:
        raise HTTPException(status_code=404, detail="Experience not found")
    db.delete(exp)
    db.commit()
    return None
