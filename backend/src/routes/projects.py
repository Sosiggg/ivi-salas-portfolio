from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from ..utils.database import get_db
from ..models.project import Project
from ..utils.security import get_current_user_id
from ..schemas.project import ProjectCreate, ProjectRead, ProjectList
from ..utils.limiter import limiter

router = APIRouter(prefix="/projects", tags=["projects"])

@router.get('/', response_model=ProjectList)
@limiter.limit("60/minute")
def list_projects(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = Query(50, le=100),
):
    query = db.query(Project).order_by(Project.created_at.desc())
    total = query.count()
    items = query.offset(skip).limit(limit).all()
    return {"items": items, "total": total}

@router.post('/', status_code=status.HTTP_201_CREATED, response_model=ProjectRead)
def create_project(data: ProjectCreate, db: Session = Depends(get_db), user_id: str = Depends(get_current_user_id)):
    project = Project(**data.model_dump())
    db.add(project)
    db.commit()
    db.refresh(project)
    return project

@router.get('/{project_id}', response_model=ProjectRead)
def get_project(project_id: int, db: Session = Depends(get_db)):
    project = db.get(Project, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@router.delete('/{project_id}', status_code=status.HTTP_204_NO_CONTENT)
def delete_project(project_id: int, db: Session = Depends(get_db), user_id: str = Depends(get_current_user_id)):
    project = db.get(Project, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    db.delete(project)
    db.commit()
    return None
