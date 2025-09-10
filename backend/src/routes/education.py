from fastapi import APIRouter, Depends, Query, HTTPException, status
from sqlalchemy.orm import Session
from ..utils.database import get_db
from ..models.education import Education
from ..schemas.education import EducationCreate, EducationRead, EducationList
from ..utils.security import get_current_user_id, require_admin

router = APIRouter(prefix="/education", tags=["education"])


@router.get('/', response_model=EducationList)
def list_education(db: Session = Depends(get_db), skip: int = 0, limit: int = Query(50, le=100)):
    q = db.query(Education).order_by(Education.start_date.desc())
    total = q.count()
    items = q.offset(skip).limit(limit).all()
    return {"items": items, "total": total}


@router.post('/', response_model=EducationRead, status_code=status.HTTP_201_CREATED)
def create_education(data: EducationCreate, db: Session = Depends(get_db), admin=Depends(require_admin)):
    edu = Education(**data.model_dump())
    db.add(edu)
    db.commit()
    db.refresh(edu)
    return edu


@router.delete('/{education_id}', status_code=status.HTTP_204_NO_CONTENT)
def delete_education(education_id: int, db: Session = Depends(get_db), admin=Depends(require_admin)):
    edu = db.get(Education, education_id)
    if not edu:
        raise HTTPException(status_code=404, detail="Education not found")
    db.delete(edu)
    db.commit()
    return None

@router.patch('/{education_id}', response_model=EducationRead)
def update_education(education_id: int, data: EducationCreate, db: Session = Depends(get_db), admin=Depends(require_admin)):
    edu = db.get(Education, education_id)
    if not edu:
        raise HTTPException(status_code=404, detail="Education not found")
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(edu, field, value)
    db.commit()
    db.refresh(edu)
    return edu
