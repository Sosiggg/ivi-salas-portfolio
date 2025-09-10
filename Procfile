# Procfile for process-based platforms (e.g., Render, Railway, Heroku-like)
# Web dyno / service: run FastAPI via Gunicorn + Uvicorn worker (production)
web: cd backend && gunicorn -k uvicorn.workers.UvicornWorker src.main:app -b 0.0.0.0:${PORT:-5000} --workers 3 --timeout 60

# (Optional) worker process placeholder for future tasks / schedulers
# worker: python backend/src/worker.py
