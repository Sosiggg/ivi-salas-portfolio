import os
import secrets
from .create_superuser import get_db  # re-use session pattern if present else implement similar
from ..utils.database import SessionLocal
from ..models.user import User
from ..utils.security import hash_password

def rotate_admin(email: str) -> str:
    session = SessionLocal()
    try:
        user = session.query(User).filter(User.email == email.lower()).first()
        if not user:
            raise SystemExit("Admin user not found")
        new_password = secrets.token_urlsafe(20)
        user.hashed_password = hash_password(new_password)
        session.commit()
        return new_password
    finally:
        session.close()

if __name__ == "__main__":
    target = os.environ.get("ADMIN_EMAIL") or input("Admin email: ")
    pwd = rotate_admin(target)
    print("New password:", pwd)
