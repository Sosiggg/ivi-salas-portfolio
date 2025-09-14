import sys
from getpass import getpass
from sqlalchemy.orm import Session

# Local imports
from ..utils.database import SessionLocal  # type: ignore
from ..models.user import User  # type: ignore
from ..utils.security import hash_password  # type: ignore


def main():
    print("== Create / Promote Superuser ==")
    email = input("Email: ").strip().lower()
    if not email:
        print("Email required")
        sys.exit(1)
    full_name = input("Full name (optional): ").strip() or None
    password = getpass("Password (leave blank to abort): ")
    if not password:
        print("Aborted (no password).")
        sys.exit(1)
    if len(password) < 8:
        print("Password too short (min 8).")
        sys.exit(1)

    db: Session = SessionLocal()
    try:
        user = db.query(User).filter(User.email == email).first()
        if user:
            if user.role == "admin":
                print("User already admin.")
            else:
                user.role = "admin"
                if password:
                    user.hashed_password = hash_password(password)
                db.commit()
                print("Existing user promoted to admin.")
        else:
            user = User(email=email, full_name=full_name, hashed_password=hash_password(password), role="admin")
            db.add(user)
            db.commit()
            db.refresh(user)
            print(f"Created admin user with id {user.id}.")
    finally:
        db.close()


if __name__ == "__main__":
    main()
