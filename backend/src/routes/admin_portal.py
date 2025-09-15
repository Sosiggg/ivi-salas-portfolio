from fastapi import APIRouter, Depends, Form, HTTPException, status, Response, Request
from fastapi.responses import HTMLResponse, RedirectResponse
from sqlalchemy.orm import Session
from ..utils.database import get_db
from ..models.user import User
from ..utils.security import verify_password, create_access_token, require_admin, get_current_user

router = APIRouter(prefix="/admin", tags=["admin-portal"], include_in_schema=False)

LOGIN_HTML = """<!doctype html><html lang='en'>
<head>
    <meta charset='utf-8' />
    <title>Admin Login</title>
    <meta name='viewport' content='width=device-width,initial-scale=1' />
    <style>
        :root {
            --bg: #f5f7fb;
            --card-bg: #ffffff;
            --card-border: #e5e7eb;
            --accent: #2563eb;
            --accent-hover: #1d4ed8;
            --danger: #dc2626;
            --text: #111827;
            --text-dim: #4b5563;
            --radius: 14px;
            --shadow-sm: 0 2px 4px rgba(0,0,0,0.05);
            --shadow-lg: 0 20px 40px -8px rgba(0,0,0,0.15);
            --focus: 0 0 0 3px rgba(37,99,235,0.35);
            font-family: system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif;
        }
        * { box-sizing: border-box; }
        body { margin:0; min-height:100vh; display:flex; align-items:center; justify-content:center; background:var(--bg); color:var(--text); -webkit-font-smoothing:antialiased; }
        .wrap { width:min(440px,90%); padding:2.75rem 2.5rem 2.5rem; background:var(--card-bg); border:1px solid var(--card-border); border-radius:var(--radius); box-shadow:var(--shadow-sm), var(--shadow-lg); position:relative; overflow:hidden; }
        h1 { margin:0 0 1.2rem; font-size:1.7rem; letter-spacing:-0.5px; font-weight:600; }
        p.sub { margin:-.6rem 0 1.8rem; font-size:.9rem; color:var(--text-dim); }
        label { display:block; font-size:.8rem; font-weight:600; text-transform:uppercase; letter-spacing:.05em; margin:1.15rem 0 .4rem; color:var(--text-dim); }
        input { width:100%; padding:.85rem .9rem; font-size:.95rem; border:1px solid #d1d5db; border-radius:10px; background:#f9fafb; transition:.15s border, .15s background, .15s box-shadow; }
        input:focus { outline:none; border-color:var(--accent); background:#fff; box-shadow:var(--focus); }
        button { margin-top:1.6rem; width:100%; padding:.95rem 1rem; font-size:1rem; font-weight:600; border:none; border-radius:12px; background:linear-gradient(150deg,var(--accent),#1e40af); color:#fff; cursor:pointer; box-shadow:0 6px 18px -6px rgba(37,99,235,.55),0 2px 4px rgba(0,0,0,.05); letter-spacing:.3px; transition:.18s transform, .18s box-shadow, .18s filter; }
        button:hover { filter:brightness(1.05); }
        button:active { transform:translateY(2px); box-shadow:0 3px 10px -4px rgba(37,99,235,.45),0 1px 2px rgba(0,0,0,.08); }
        button:focus-visible { outline:none; box-shadow:var(--focus); }
        .footer { margin-top:2.2rem; font-size:.7rem; text-align:center; color:var(--text-dim); letter-spacing:.05em; }
        p.err { background: var(--danger); color:#fff; padding:.65rem .85rem; border-radius:10px; font-size:.8rem; margin:1rem 0 0; text-align:center; box-shadow:0 4px 14px -6px rgba(220,38,38,.55); animation:fadeIn .35s ease; }
        @media (max-width:520px){ .wrap { padding:2.1rem 1.5rem 2rem; border-radius:20px; } h1 { font-size:1.5rem; } }
        @keyframes fadeIn { from { opacity:0; transform:translateY(-4px); } to { opacity:1; transform:translateY(0); } }
    </style>
</head>
<body>
    <main class='wrap' role='main' aria-labelledby='admin-login-heading'>
        <h1 id='admin-login-heading'>Admin Access</h1>
        <p class='sub'>Sign in with your administrator credentials.</p>
        <form method='post' autocomplete='on'>
            <label for='email'>Email</label>
            <input id='email' name='email' type='email' inputmode='email' required autofocus />
            <label for='password'>Password</label>
            <input id='password' name='password' type='password' required />
            __ERROR_PLACEHOLDER__
            <button type='submit'>Sign In</button>
        </form>
        <div class='footer'>© <span id='y'></span> Admin Portal</div>
    </main>
    <script>document.getElementById('y').textContent = new Date().getFullYear();</script>
</body>
</html>"""

@router.get('/login', response_class=HTMLResponse)
async def login_form(request: Request, db: Session = Depends(get_db)):
    # If already authenticated as admin, redirect to docs
    try:
        # Re-use dependency logic: if token valid and role admin, send them on
        user = get_current_user(db=db)  # will raise if not authenticated
        if user.role == 'admin':
            return RedirectResponse(url='/admin/docs', status_code=302)
    except Exception:
        pass
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
