from fastapi import APIRouter, Depends
from ..utils.security import get_current_user
from ..models.user import User
from ..schemas.auth import UserRead

router = APIRouter(prefix="/users", tags=["users"])

@router.get('/me', response_model=UserRead)
def read_me(user: User = Depends(get_current_user)):
    return UserRead(id=user.id, email=user.email, full_name=user.full_name)
