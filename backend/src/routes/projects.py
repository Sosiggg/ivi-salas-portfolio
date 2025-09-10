from fastapi import APIRouter, Depends, HTTPException, status, Query, Request
from sqlalchemy.orm import Session
from ..utils.database import get_db
from ..models.project import Project
from ..utils.security import get_current_user_id, require_admin
from ..schemas.project import ProjectCreate, ProjectRead, ProjectList
from ..utils.limiter import limiter

router = APIRouter(prefix="/projects", tags=["projects"])

@router.get('/', response_model=ProjectList)
@limiter.limit("60/minute")
def list_projects(
    request: Request,
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = Query(50, le=100),
):
    query = db.query(Project).order_by(Project.created_at.desc())
    total = query.count()
    items = query.offset(skip).limit(limit).all()
    return {"items": items, "total": total}

@router.post('/', status_code=status.HTTP_201_CREATED, response_model=ProjectRead)
def create_project(data: ProjectCreate, db: Session = Depends(get_db), admin=Depends(require_admin)):
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
def delete_project(project_id: int, db: Session = Depends(get_db), admin=Depends(require_admin)):
    project = db.get(Project, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    db.delete(project)
    db.commit()
    return None

@router.patch('/{project_id}', response_model=ProjectRead)
def update_project(project_id: int, data: ProjectCreate, db: Session = Depends(get_db), admin=Depends(require_admin)):
    project = db.get(Project, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(project, field, value)
    db.commit()
    db.refresh(project)
    return project
