from fastapi import APIRouter, Depends, Form, HTTPException, status, Response, Request
from fastapi.responses import HTMLResponse, RedirectResponse
from sqlalchemy.orm import Session
from ..utils.database import get_db
from ..models.user import User
from ..utils.security import verify_password, create_access_token, require_admin

router = APIRouter(prefix="/admin", tags=["admin-portal"], include_in_schema=False)

LOGIN_HTML = """<!doctype html><html><head><title>Admin Login</title>
<meta name='viewport' content='width=device-width,initial-scale=1'>
<style>body{font-family:system-ui;background:#121212;color:#f5f5f5;display:flex;align-items:center;justify-content:center;height:100vh;margin:0}form{background:#1e1e1e;padding:2rem;border-radius:12px;min-width:300px;box-shadow:0 4px 18px -2px #000}h1{margin-top:0;font-size:1.25rem}label{display:block;margin:.75rem 0 .25rem;font-weight:600}input{width:100%;padding:.6rem;border-radius:6px;border:1px solid #333;background:#222;color:#fff}button{margin-top:1rem;width:100%;padding:.75rem;border:none;border-radius:8px;background:#6366f1;color:#fff;font-weight:600;cursor:pointer}button:hover{background:#4f46e5}p.err{color:#f87171;font-size:.85rem;margin:.5rem 0 0;text-align:center}</style>
</head><body><form method='post'>
<h1>Admin Login</h1>
<label>Email</label><input name='email' type='email' required />
<label>Password</label><input name='password' type='password' required />
<button type='submit'>Sign In</button>
__ERROR_PLACEHOLDER__
</form></body></html>"""

@router.get('/login', response_class=HTMLResponse)
async def login_form(request: Request):
    return HTMLResponse(LOGIN_HTML.replace('__ERROR_PLACEHOLDER__', ''))

@router.post('/login', response_class=HTMLResponse)
async def login_submit(response: Response, email: str = Form(...), password: str = Form(...), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == email.lower()).first()
    if not user or not verify_password(password, user.hashed_password) or user.role != 'admin':
        error_html = "<p class='err'>Invalid credentials</p>"
        return HTMLResponse(LOGIN_HTML.replace('__ERROR_PLACEHOLDER__', error_html), status_code=400)
    token = create_access_token(str(user.id))
    # Set secure cookie (HttpOnly). On local HTTP fallback, secure may block; keep True for production.
    response = RedirectResponse(url="/admin/docs", status_code=302)
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        secure=True,  # ensure HTTPS in production
        samesite="Lax",
        max_age=3600,
        path="/"
    )
    return response

@router.post('/logout', include_in_schema=False)
async def logout():
    resp = RedirectResponse(url="/admin/login", status_code=302)
    resp.delete_cookie("access_token")
    return resp

@router.get('/session/check', include_in_schema=False)
async def session_check(user=Depends(require_admin)):
    return {"status": "ok", "user": user.email, "role": user.role}
