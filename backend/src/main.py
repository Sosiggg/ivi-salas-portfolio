import uvicorn
from fastapi import FastAPI, Depends
from fastapi.responses import RedirectResponse, JSONResponse
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware
from slowapi import _rate_limit_exceeded_handler
from fastapi.middleware.cors import CORSMiddleware
from .utils.config import settings
from .utils.limiter import limiter
from .middleware.security_headers import SecurityHeadersMiddleware
from .utils.database import engine
from .models import base  # noqa: F401
from .routes import auth, projects, contact, skills, certificates, experiences, education, users

app = FastAPI(title="Portfolio API", version="0.1.0")

# (Admin bootstrap removed: handled exclusively in container entrypoint to avoid import errors
# and to keep runtime app code free of seeding side-effects.)

# Rate limiting integration
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
app.add_middleware(SlowAPIMiddleware)
app.add_middleware(SecurityHeadersMiddleware)

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
app.include_router(skills.router, prefix="/api")
app.include_router(certificates.router, prefix="/api")
app.include_router(experiences.router, prefix="/api")
app.include_router(education.router, prefix="/api")
app.include_router(users.router, prefix="/api")

@app.get('/api/health')
def health():
    return {"status": "ok"}

@app.get('/')
def root():
    return {"message": "Portfolio API. See /docs for Swagger UI, /api/health for status."}

@app.get('/api/docs', include_in_schema=False)
def api_docs_redirect():
    return RedirectResponse(url='/docs')

if __name__ == "__main__":
    uvicorn.run("src.main:app", host="0.0.0.0", port=settings.port, reload=True)
