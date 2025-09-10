# Procfile for process-based platforms (e.g., Render, Railway, Heroku-like)
# Web dyno / service: run FastAPI via Uvicorn
web: cd backend && uvicorn src.main:app --host 0.0.0.0 --port ${PORT:-5000}

# (Optional) worker process placeholder for future tasks / schedulers
# worker: python backend/src/worker.py
