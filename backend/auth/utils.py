from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
import secrets

# Config
SECRET_KEY = ""
REFRESH_SECRET_KEY = ""
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 15
REFRESH_TOKEN_EXPIRE_DAYS = 7

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# --------------------------
# Password Helpers
# --------------------------
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)


# --------------------------
# Token Helpers
# --------------------------
def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def create_refresh_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS))
    jti = secrets.token_hex(16)  # unique token ID
    to_encode.update({"exp": expire, "jti": jti})
    return jwt.encode(to_encode, REFRESH_SECRET_KEY, algorithm=ALGORITHM), jti

def decode_token(token: str, refresh: bool = False):
    try:
        secret = REFRESH_SECRET_KEY if refresh else SECRET_KEY
        return jwt.decode(token, secret, algorithms=[ALGORITHM])
    except JWTError:
        return None
