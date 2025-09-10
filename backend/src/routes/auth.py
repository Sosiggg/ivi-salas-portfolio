from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import EmailStr
from sqlalchemy.orm import Session
from ..utils.database import get_db
from ..models.user import User
from ..utils.security import verify_password, hash_password, create_access_token, create_refresh_token
from ..schemas.auth import RegisterRequest, LoginRequest, RefreshRequest, TokenResponse, UserRead
from ..utils.limiter import limiter

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post('/register', response_model=UserRead, status_code=201)
@limiter.limit("5/minute")
def register(data: RegisterRequest, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == data.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    user = User(email=data.email, hashed_password=hash_password(data.password), full_name=data.full_name)
    db.add(user)
    db.commit()
    db.refresh(user)
    return UserRead(id=user.id, email=user.email, full_name=user.full_name)

@router.post('/login', response_model=TokenResponse)
@limiter.limit("10/minute")
def login(data: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user or not verify_password(data.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    access = create_access_token(str(user.id))
    refresh = create_refresh_token(str(user.id))
    return TokenResponse(access_token=access, refresh_token=refresh)


@router.post('/refresh', response_model=TokenResponse)
@limiter.limit("20/minute")
def refresh_token(data: RefreshRequest):
    from jose import jwt, JWTError
    from ..utils.config import settings
    try:
        payload = jwt.decode(data.refresh_token, settings.jwt_secret, algorithms=["HS256"])
        if payload.get("type") != "refresh":
            raise HTTPException(status_code=400, detail="Invalid token type")
        new_access = create_access_token(payload["sub"])
    return TokenResponse(access_token=new_access)
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired refresh token")
