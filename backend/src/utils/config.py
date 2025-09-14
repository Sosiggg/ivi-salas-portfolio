from pydantic import Field, ValidationError
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # Provide a safe sqlite fallback for local/dev if DATABASE_URL not set
    database_url: str = Field("sqlite:///./dev.db", alias="DATABASE_URL")
    jwt_secret: str = Field(..., alias="JWT_SECRET")
    jwt_expires_in: str = Field("1h", alias="JWT_EXPIRES_IN")
    refresh_token_expires_in: str = Field("7d", alias="REFRESH_TOKEN_EXPIRES_IN")
    port: int = Field(5000, alias="PORT")
    node_env: str = Field("development", alias="NODE_ENV")
    cors_origin: str = Field("http://localhost:3000", alias="CORS_ORIGIN")
    diag_enabled: bool = Field(False, alias="DIAG_ENABLED")

    class Config:
        env_file = ".env"
        case_sensitive = True

try:
    settings = Settings()  # type: ignore
except ValidationError as e:  # pragma: no cover - startup failure path
    # Provide a clearer runtime error specifically listing missing required env vars
    missing = []
    for err in e.errors():
        if err.get("type") == "missing":
            # err['loc'] is a tuple like ('JWT_SECRET',)
            loc = err.get("loc")
            if loc:
                missing.append(str(loc[0]))
    if missing:
        detail = ", ".join(sorted(set(missing)))
        raise RuntimeError(
            f"Missing required environment variable(s): {detail}. Set them in your hosting provider's env settings and redeploy."  # noqa: E501
        ) from e
    raise
