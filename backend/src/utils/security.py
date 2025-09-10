from datetime import datetime, timedelta
from typing import Optional, Dict, Tuple
from jose import jwt, JWTError
from passlib.context import CryptContext
from fastapi import HTTPException, status, Depends, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from .config import settings
from ..models.user import User  # type: ignore
from .database import get_db  # type: ignore
from sqlalchemy.orm import Session  # type: ignore

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

ALGORITHM = "HS256"
reuseable_oauth = HTTPBearer(auto_error=False)

# In-memory brute force tracking: {(identifier): (fail_count, first_fail_timestamp)}
_login_failures: Dict[str, Tuple[int, datetime]] = {}
MAX_FAILS = 5
LOCK_WINDOW_MINUTES = 15


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


def get_current_user(db: Session = Depends(get_db), user_id: str = Depends(get_current_user_id)) -> User:
    user = db.get(User, int(user_id))
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


def require_admin(user: User = Depends(get_current_user)) -> User:
    if user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin privileges required")
    return user


def record_login_failure(identifier: str):
    now = datetime.utcnow()
    data = _login_failures.get(identifier)
    if data:
        count, first_ts = data
        # Reset window if expired
        if (now - first_ts) > timedelta(minutes=LOCK_WINDOW_MINUTES):
            _login_failures[identifier] = (1, now)
        else:
            _login_failures[identifier] = (count + 1, first_ts)
    else:
        _login_failures[identifier] = (1, now)


def check_login_allowed(identifier: str):
    data = _login_failures.get(identifier)
    if not data:
        return
    count, first_ts = data
    if count >= MAX_FAILS and (datetime.utcnow() - first_ts) < timedelta(minutes=LOCK_WINDOW_MINUTES):
        raise HTTPException(status_code=429, detail="Too many failed attempts. Try later.")


def clear_login_failures(identifier: str):
    _login_failures.pop(identifier, None)
