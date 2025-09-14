#!/bin/sh
set -e

# Ensure we are in the /app directory (WORKDIR is /app in Dockerfile)
cd /app

# If backend directory contains alembic.ini (in this project it is copied at /app/alembic.ini)
# run migrations. Alembic will read DB URL from env via settings module.
echo "[entrypoint] Running database migrations..."
alembic upgrade head || { echo "[entrypoint] Alembic migration failed" >&2; exit 1; }

echo "[entrypoint] Starting Gunicorn..."
exec gunicorn -k uvicorn.workers.UvicornWorker src.main:app --bind 0.0.0.0:${PORT:-5000} --workers 3 --timeout 60
