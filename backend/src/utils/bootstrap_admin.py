"""One-off admin bootstrap utility.

# NOTE: This legacy bootstrap helper is no longer imported in app startup.
# Admin provisioning now occurs exclusively in `entrypoint.sh` before Gunicorn starts.
# This module is retained temporarily for reference / potential removal later.
If the environment variable BOOTSTRAP_ADMIN is set to 'true' (case-insensitive),
and ADMIN_EMAIL & ADMIN_PASSWORD are provided, this will create (or promote)
that user to role 'admin' at startup. After successful creation/promotion it
prints a message. Intended for first deploy convenience; remove the env vars
after initial bootstrap.
"""

from __future__ import annotations

import os
from sqlalchemy.orm import Session
from .database import SessionLocal  # type: ignore
from ..models.user import User  # type: ignore
from .security import hash_password  # type: ignore


def bootstrap_admin():  # pragma: no cover - startup side-effect
    flag = os.getenv("BOOTSTRAP_ADMIN", "").lower() == "true"
    if not flag:
        return
    email = os.getenv("ADMIN_EMAIL")
    password = os.getenv("ADMIN_PASSWORD")
    full_name = os.getenv("ADMIN_FULL_NAME")
    if not email or not password:
        print("[bootstrap_admin] ADMIN_EMAIL or ADMIN_PASSWORD missing; skipping.")
        return
    if len(password) < 8:
        print("[bootstrap_admin] ADMIN_PASSWORD too short (<8); skipping.")
        return
    db: Session = SessionLocal()
    try:
        user = db.query(User).filter(User.email == email.lower()).first()
        if user:
            changed = False
            if user.role != "admin":
                user.role = "admin"; changed = True
            # Optionally update password if provided
            user.hashed_password = hash_password(password); changed = True
            if full_name and user.full_name != full_name:
                user.full_name = full_name; changed = True
            if changed:
                db.commit()
                print("[bootstrap_admin] Existing user promoted/updated as admin.")
            else:
                print("[bootstrap_admin] Existing admin unchanged.")
        else:
            new_user = User(email=email.lower(), full_name=full_name, hashed_password=hash_password(password), role="admin")
            db.add(new_user)
            db.commit()
            print("[bootstrap_admin] Created new admin user.")
    except Exception as e:  # noqa: BLE001
        print(f"[bootstrap_admin] Error: {e}")
    finally:
        db.close()
