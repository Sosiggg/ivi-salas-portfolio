from slowapi import Limiter
from slowapi.util import get_remote_address

# Default limiter instance; default limit can be overridden per endpoint
limiter = Limiter(key_func=get_remote_address, default_limits=["200/hour"])  # adjust as needed

__all__ = ["limiter"]