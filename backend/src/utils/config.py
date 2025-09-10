from pydantic import Field
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    database_url: str = Field(..., alias="DATABASE_URL")
    jwt_secret: str = Field(..., alias="JWT_SECRET")
    jwt_expires_in: str = Field("1h", alias="JWT_EXPIRES_IN")
    refresh_token_expires_in: str = Field("7d", alias="REFRESH_TOKEN_EXPIRES_IN")
    port: int = Field(5000, alias="PORT")
    node_env: str = Field("development", alias="NODE_ENV")
    cors_origin: str = Field("http://localhost:3000", alias="CORS_ORIGIN")

    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()  # type: ignore
