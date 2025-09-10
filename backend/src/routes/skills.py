from fastapi import APIRouter, Depends, Query, HTTPException, status
from sqlalchemy.orm import Session
from ..utils.database import get_db
from ..models.skill import Skill
from ..schemas.skill import SkillCreate, SkillRead, SkillList
from ..utils.security import get_current_user_id

router = APIRouter(prefix="/skills", tags=["skills"])


@router.get('/', response_model=SkillList)
def list_skills(db: Session = Depends(get_db), skip: int = 0, limit: int = Query(50, le=100)):
    q = db.query(Skill)
    total = q.count()
    items = q.offset(skip).limit(limit).all()
    return {"items": items, "total": total}


@router.post('/', response_model=SkillRead, status_code=status.HTTP_201_CREATED)
def create_skill(data: SkillCreate, db: Session = Depends(get_db), user_id: str = Depends(get_current_user_id)):
    skill = Skill(**data.model_dump())
    db.add(skill)
    db.commit()
    db.refresh(skill)
    return skill


@router.delete('/{skill_id}', status_code=status.HTTP_204_NO_CONTENT)
def delete_skill(skill_id: int, db: Session = Depends(get_db), user_id: str = Depends(get_current_user_id)):
    skill = db.get(Skill, skill_id)
    if not skill:
        raise HTTPException(status_code=404, detail="Skill not found")
    db.delete(skill)
    db.commit()
    return None
