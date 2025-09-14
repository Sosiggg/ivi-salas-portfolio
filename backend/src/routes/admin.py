from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..utils.database import get_db
from ..utils.security import get_current_user, require_admin

router = APIRouter(prefix="/admin", tags=["admin"])

@router.get('/health')
def admin_health(db: Session = Depends(get_db), user=Depends(get_current_user)):
    # Enforce admin role
    if not require_admin(user):  # require_admin raises if not admin; if it returns False treat as failure
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin privileges required")
    return {"status": "ok", "role": user.role}
