from fastapi import APIRouter, Depends, HTTPException, status, Request
from pydantic import EmailStr
from sqlalchemy.orm import Session
from ..utils.database import get_db
import re
from ..models.user import User
from ..utils.security import (
    verify_password,
    hash_password,
    create_access_token,
    create_refresh_token,
    record_login_failure,
    check_login_allowed,
    clear_login_failures,
)
from ..schemas.auth import RegisterRequest, LoginRequest, RefreshRequest, TokenResponse, UserRead
from ..utils.limiter import limiter

router = APIRouter(prefix="/auth", tags=["auth"])


PASSWORD_POLICY = {
    "min_length": 12,
    "require_upper": True,
    "require_lower": True,
    "require_digit": True,
    "require_symbol": True,
}

def _validate_password_strength(pwd: str):
    if len(pwd) < PASSWORD_POLICY["min_length"]:
        return False
    if PASSWORD_POLICY["require_upper"] and not re.search(r"[A-Z]", pwd):
        return False
    if PASSWORD_POLICY["require_lower"] and not re.search(r"[a-z]", pwd):
        return False
    if PASSWORD_POLICY["require_digit"] and not re.search(r"\d", pwd):
        return False
    if PASSWORD_POLICY["require_symbol"] and not re.search(r"[^A-Za-z0-9]", pwd):
        return False
    return True

@router.post('/register', response_model=UserRead, status_code=201)
@limiter.limit("5/minute")
def register(request: Request, data: RegisterRequest, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == data.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    if not _validate_password_strength(data.password):
        raise HTTPException(
            status_code=400,
            detail=(
                "Password must be >=12 chars and include upper, lower, digit, and symbol"
            ),
        )
    user = User(email=data.email, hashed_password=hash_password(data.password), full_name=data.full_name)
    db.add(user)
    db.commit()
    db.refresh(user)
    return UserRead(id=user.id, email=user.email, full_name=user.full_name)

@router.post('/login', response_model=TokenResponse)
@limiter.limit("10/minute")
def login(request: Request, data: LoginRequest, db: Session = Depends(get_db)):
    identifier = data.email.lower()
    check_login_allowed(identifier)
    user = db.query(User).filter(User.email == identifier).first()
    if not user or not verify_password(data.password, user.hashed_password):
        record_login_failure(identifier)
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    clear_login_failures(identifier)
    access = create_access_token(str(user.id))
    refresh = create_refresh_token(str(user.id))
    return TokenResponse(access_token=access, refresh_token=refresh)


@router.post('/refresh', response_model=TokenResponse)
@limiter.limit("20/minute")
def refresh_token(request: Request, data: RefreshRequest):
    from jose import jwt, JWTError
    from ..utils.config import settings
    try:
        payload = jwt.decode(data.refresh_token, settings.jwt_secret, algorithms=["HS256"])
        if payload.get("type") != "refresh":
            raise HTTPException(status_code=400, detail="Invalid token type")
        new_access = create_access_token(payload["sub"])
        new_refresh = create_refresh_token(payload["sub"])  # rotate
        return TokenResponse(access_token=new_access, refresh_token=new_refresh)
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired refresh token")
