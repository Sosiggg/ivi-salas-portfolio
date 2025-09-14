import uvicorn
from fastapi import FastAPI, Depends, HTTPException
from fastapi.responses import RedirectResponse, JSONResponse, HTMLResponse
from fastapi.openapi.utils import get_openapi
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware
from slowapi import _rate_limit_exceeded_handler
from fastapi.middleware.cors import CORSMiddleware
from .utils.config import settings
from .utils.limiter import limiter
from .middleware.security_headers import SecurityHeadersMiddleware
from .utils.database import engine
from .models import base  # noqa: F401
from .routes import auth, projects, contact, skills, certificates, experiences, education, users, admin
from .utils.security import require_admin

app = FastAPI(
    title="Portfolio API",
    version="0.1.0",
    docs_url=None,
    redoc_url=None,
    openapi_url=None,
)

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
app.include_router(admin.router, prefix="/api")

@app.get('/api/health')
def health():
    return {"status": "ok"}

@app.get('/')
def root():
    return {"message": "Portfolio API. Admin docs at /admin/docs (auth required)."}

SWAGGER_HTML = """<!DOCTYPE html>
<html>
<head>
    <title>Admin API Docs</title>
    <link rel=\"stylesheet\" href=\"https://unpkg.com/swagger-ui-dist/swagger-ui.css\" />
    <style>body { margin:0; background:#121212; } .swagger-ui .topbar { background:#222; }</style>
</head>
<body>
<div id=\"swagger-ui\"></div>
<script src=\"https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js\"></script>
<script>
window.addEventListener('load', () => {
    const ui = SwaggerUIBundle({
        url: '/internal/openapi.json',
        dom_id: '#swagger-ui',
        presets: [SwaggerUIBundle.presets.apis],
        layout: 'BaseLayout'
    });
});
</script>
</body>
</html>"""

@app.get('/internal/openapi.json', include_in_schema=False)
def internal_openapi(user=Depends(require_admin)):
        return get_openapi(title=app.title, version=app.version, routes=app.routes, description=app.description)

@app.get('/admin/docs', include_in_schema=False)
def admin_docs(user=Depends(require_admin)):
        return HTMLResponse(content=SWAGGER_HTML, status_code=200)

if __name__ == "__main__":
    uvicorn.run("src.main:app", host="0.0.0.0", port=settings.port, reload=True)
