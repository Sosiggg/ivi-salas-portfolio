from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel
from ..utils.database import get_db
from ..models.project import Project
from ..utils.security import get_current_user_id

router = APIRouter(prefix="/projects", tags=["projects"])

class ProjectCreate(BaseModel):
    title: str
    description: str
    tech_stack: str
    repo_url: str | None = None
    demo_url: str | None = None
    image_url: str | None = None

@router.get('/')
def list_projects(db: Session = Depends(get_db)):
    return db.query(Project).order_by(Project.created_at.desc()).all()

@router.post('/', status_code=status.HTTP_201_CREATED)
def create_project(data: ProjectCreate, db: Session = Depends(get_db), user_id: str = Depends(get_current_user_id)):
    project = Project(**data.model_dump())  # optionally associate owner later
    db.add(project)
    db.commit()
    db.refresh(project)
    return project

@router.get('/{project_id}')
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
