import uvicorn
from fastapi import FastAPI, Depends, HTTPException, Request
from fastapi.responses import RedirectResponse, JSONResponse, HTMLResponse
from fastapi.openapi.utils import get_openapi
from fastapi.exception_handlers import http_exception_handler
import traceback
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware
from slowapi import _rate_limit_exceeded_handler
from fastapi.middleware.cors import CORSMiddleware
from .utils.config import settings
from .utils.limiter import limiter
from .middleware.security_headers import SecurityHeadersMiddleware
from .utils.database import engine
from .models import base  # noqa: F401
from .routes import auth, projects, contact, skills, certificates, experiences, education, users, admin, admin_portal
from .utils.security import require_admin
from .utils.config import settings as app_settings

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
app.include_router(admin_portal.router)

@app.get('/api/health')
def health():
    return {"status": "ok"}

@app.get('/')
def root():
    return {"message": "Portfolio API. Admin docs at /admin/docs (auth required)."}

@app.get('/_diag', include_in_schema=False)
def diagnostic_probe():
    if not app_settings.diag_enabled:
        # Mimic not found to avoid hinting existence in production
        raise HTTPException(status_code=404, detail="Not found")
    # Return minimal safe diagnostics (never secrets)
    db_url = app_settings.database_url
    redacted_db = None
    if db_url:
        # Strip credentials if present
        # e.g. postgresql+psycopg://user:pass@host:5432/db -> postgresql+psycopg://***@host:5432/db
        try:
            prefix, rest = db_url.split('://', 1)
            if '@' in rest and ':' in rest.split('@',1)[0]:
                creds, hostpart = rest.split('@',1)
                redacted_db = f"{prefix}://***@{hostpart}"
            else:
                redacted_db = db_url
        except ValueError:
            redacted_db = db_url
    return {
        "ok": True,
        "has_jwt_secret": bool(app_settings.jwt_secret),
        "db_url": redacted_db,
        "cors_origin": app_settings.cors_origin,
        "node_env": app_settings.node_env,
        "diag_enabled": app_settings.diag_enabled,
    }

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

@app.exception_handler(HTTPException)
async def custom_http_exception_handler(request: Request, exc: HTTPException):
    # Provide a friendlier UX for unauthenticated access to the guarded docs
    if request.url.path == '/admin/docs' and exc.status_code == 401:
        return RedirectResponse(url='/admin/login', status_code=302)
    return await http_exception_handler(request, exc)

@app.middleware('http')
async def diag_error_wrapper(request: Request, call_next):
    if not app_settings.diag_enabled:
        return await call_next(request)
    try:
        return await call_next(request)
    except Exception as e:  # pragma: no cover
        tb = traceback.format_exc()
        # Return structured JSON with traceback for debugging (never include secrets)
        return JSONResponse(
            status_code=500,
            content={
                "error": str(e.__class__.__name__),
                "detail": str(e),
                "traceback": tb.splitlines()[-25:],  # tail to keep response smaller
            },
        )

if __name__ == "__main__":
    uvicorn.run("src.main:app", host="0.0.0.0", port=settings.port, reload=True)
