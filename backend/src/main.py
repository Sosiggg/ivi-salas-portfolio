import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .utils.config import settings
from .utils.database import engine
from .models import base  # noqa: F401
from .routes import auth, projects, contact

app = FastAPI(title="Portfolio API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.cors_origin],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api")
app.include_router(projects.router, prefix="/api")
app.include_router(contact.router, prefix="/api")

@app.get('/api/health')
def health():
    return {"status": "ok"}

if __name__ == "__main__":
    uvicorn.run("src.main:app", host="0.0.0.0", port=settings.port, reload=True)
