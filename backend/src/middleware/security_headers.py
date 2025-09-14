from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response


class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):  # type: ignore
        response: Response = await call_next(request)

        path = request.url.path

        response.headers.setdefault("X-Frame-Options", "DENY")
        response.headers.setdefault("X-Content-Type-Options", "nosniff")
        response.headers.setdefault("Referrer-Policy", "strict-origin-when-cross-origin")
        response.headers.setdefault("Permissions-Policy", "geolocation=(), microphone=(), camera=()")

        # Swagger UI (/docs) and ReDoc (/redoc) need relaxed CSP for their inline scripts and CDN assets
        if path.startswith("/docs") or path.startswith("/redoc") or path.startswith("/openapi.json"):
            # Allow inline scripts & styles and necessary CDN for swagger-ui assets
            csp = (
                "default-src 'self'; "
                "img-src 'self' data: https:; "
                "style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://unpkg.com https://cdn.jsdelivr.net; "
                "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com https://unpkg.com https://cdn.jsdelivr.net; "
                "font-src 'self' data:; "
                "connect-src 'self';"
            )
        else:
            # Stricter default for application routes
            csp = (
                "default-src 'self'; "
                "img-src 'self' data: https:; "
                "style-src 'self' 'unsafe-inline'; "
                "script-src 'self'; "
                "font-src 'self' data:; "
                "connect-src 'self';"
            )

        if 'Content-Security-Policy' not in response.headers:
            response.headers['Content-Security-Policy'] = csp
        return response

__all__ = ["SecurityHeadersMiddleware"]