# Backend Dockerfile for FastAPI Portfolio
# Multi-stage build for smaller final image

FROM python:3.12-slim AS base
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=off \
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    PIP_DEFAULT_TIMEOUT=100

# System dependencies (build + runtime libs for psycopg2 etc.)
RUN apt-get update \
    && apt-get install -y --no-install-recommends build-essential libpq-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy requirements first (better layer caching)
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY src ./src
COPY alembic.ini ./
COPY migrations ./migrations

# Expose the application port (default in settings is likely 5000)
EXPOSE 5000

# Environment defaults (can be overridden at runtime)
ENV PORT=5000 \
    PYTHONPATH=/app

# Simple health check (optional) - FastAPI /api/health endpoint
HEALTHCHECK --interval=30s --timeout=5s --retries=3 CMD python -c "import urllib.request,sys;\n\n\n\n\nimport os;\nurl=f'http://127.0.0.1:{os.environ.get(\"PORT\",5000)}/api/health';\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\ntry: urllib.request.urlopen(url);\nexcept Exception as e: sys.exit(1)" || exit 1

# Start the server (production style via Gunicorn + Uvicorn worker)
# Copy and use entrypoint script so migrations run before server starts
COPY entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]
