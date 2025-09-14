#!/bin/sh
set -e

# Ensure we are in the /app directory (WORKDIR is /app in Dockerfile)
cd /app

# If backend directory contains alembic.ini (in this project it is copied at /app/alembic.ini)
# run migrations. Alembic will read DB URL from env via settings module.
echo "[entrypoint] Running database migrations..."
alembic upgrade head || { echo "[entrypoint] Alembic migration failed" >&2; exit 1; }

###############################################################################
# Ensure admin user (idempotent) if BOOTSTRAP_ADMIN=true and creds provided   #
###############################################################################
LOWER_FLAG="$(printf '%s' "${BOOTSTRAP_ADMIN}" | tr 'A-Z' 'a-z')"
if [ "$LOWER_FLAG" = "true" ]; then
  echo "[entrypoint] Ensuring admin user exists..."
  python - <<'PY'
import os
from src.utils.database import SessionLocal
from src.models.user import User
from src.utils.security import hash_password

email = os.getenv('ADMIN_EMAIL')
password = os.getenv('ADMIN_PASSWORD')
full_name = os.getenv('ADMIN_FULL_NAME')

if not email or not password:
	print('[ensure_admin] ADMIN_EMAIL or ADMIN_PASSWORD missing; skipping.')
else:
	session = SessionLocal()
	try:
		u = session.query(User).filter(User.email == email.lower()).first()
		if u:
			changed=False
			hashed = hash_password(password)
			if u.hashed_password != hashed:
				u.hashed_password = hashed; changed=True
			if u.role != 'admin':
				u.role = 'admin'; changed=True
			if full_name and u.full_name != full_name:
				u.full_name = full_name; changed=True
			if changed:
				session.commit()
				print('[ensure_admin] Updated existing admin user')
			else:
				print('[ensure_admin] Existing admin up-to-date')
		else:
			u = User(email=email.lower(), hashed_password=hash_password(password), role='admin', full_name=full_name)
			session.add(u)
			session.commit()
			print('[ensure_admin] Created new admin user')
	except Exception as e:  # noqa: BLE001
		print('[ensure_admin] Error:', e)
	finally:
		session.close()
PY
fi

echo "[entrypoint] Starting Gunicorn..."
exec gunicorn -k uvicorn.workers.UvicornWorker src.main:app --bind 0.0.0.0:${PORT:-5000} --workers 3 --timeout 60
