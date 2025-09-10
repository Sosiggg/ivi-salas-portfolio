from datetime import datetime, timedelta
from typing import Optional
from jose import jwt, JWTError
from passlib.context import CryptContext
from fastapi import HTTPException, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from .config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

ALGORITHM = "HS256"
reuseable_oauth = HTTPBearer(auto_error=False)


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def create_access_token(subject: str, expires_delta: Optional[timedelta] = None) -> str:
    if expires_delta is None:
        expires_delta = timedelta(minutes=60)
    to_encode = {"sub": subject, "exp": datetime.utcnow() + expires_delta}
    return jwt.encode(to_encode, settings.jwt_secret, algorithm=ALGORITHM)


def create_refresh_token(subject: str) -> str:
    # Simple parse for duration (e.g., '7d')
    raw = settings.refresh_token_expires_in
    amount = 7
    if raw.endswith('d') and raw[:-1].isdigit():
        amount = int(raw[:-1])
        td = timedelta(days=amount)
    else:
        td = timedelta(days=7)
    to_encode = {"sub": subject, "type": "refresh", "exp": datetime.utcnow() + td}
    return jwt.encode(to_encode, settings.jwt_secret, algorithm=ALGORITHM)


def get_current_user_id(credentials: HTTPAuthorizationCredentials = Depends(reuseable_oauth)) -> str:
    if credentials is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated")
    token = credentials.credentials
    try:
        payload = jwt.decode(token, settings.jwt_secret, algorithms=[ALGORITHM])
        subject: str | None = payload.get("sub")
        if subject is None:
            raise HTTPException(status_code=401, detail="Invalid token payload")
        return subject
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
