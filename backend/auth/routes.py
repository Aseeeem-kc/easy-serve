from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from auth.dependencies import get_db, authenticate_user, get_user_by_email
from auth.models import TokenData, Token
from auth.schemas import UserCreate, UserResponse, LoginSchema
from user.models import User as UserModel
from auth.utils import (
    get_password_hash, verify_password,
    create_access_token, create_refresh_token
)
from auth.models import RefreshToken
from datetime import datetime, timedelta    
from auth.utils import decode_token
from fastapi.responses import JSONResponse


router = APIRouter()


# -------------------------
# SIGNUP
# ------------------------- 

router = APIRouter()

@router.post("/signup", response_model=UserResponse)
def signup(user: UserCreate, db: Session = Depends(get_db)):
    # Check if username already exists
    db_user = get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")

    # Hash password
    hashed_password = get_password_hash(user.password)

    # Create new user
    db_user = UserModel(
        username=user.username,
        company_name=user.company_name,
        location=user.location,
        pan_number=user.pan_number,
        email=user.email,
        phone_number=user.phone_number,
        hashed_password=hashed_password,
        is_active=True
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user


# -------------------------
# LOGIN
# -------------------------
@router.post("/token", response_model=Token)
def login(credentials: LoginSchema, db: Session = Depends(get_db)):
    user = authenticate_user(db, credentials.email, credentials.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(data={"sub": user.email})
    refresh_token, _ = create_refresh_token(data={"sub": user.email})

    db_token = RefreshToken(
        token=refresh_token,
        user_id=user.id,
        expires_at=datetime.utcnow() + timedelta(days=7)
    )
    db.add(db_token)
    db.commit()

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "username": user.email
    }




# -------------------------
# REFRESH TOKEN
# -------------------------
@router.post("/refresh", response_model=Token)
def refresh_token(refresh_token: str, db: Session = Depends(get_db)):
    # Decode refresh token
    payload = decode_token(refresh_token, refresh=True)
    if not payload:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid refresh token")

    username = payload.get("sub")

    # Verify token exists in DB and is not revoked/expired
    db_token = db.query(RefreshToken).filter_by(token=refresh_token, revoked=False).first()
    if not db_token or db_token.expires_at < datetime.utcnow():
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Refresh token not valid")

    # Issue new access token
    new_access_token = create_access_token(data={"sub": username})
    return {
        "access_token": new_access_token,
        "refresh_token": refresh_token,  # reuse same refresh token
        "token_type": "bearer",
        "username": username
    }


# -------------------------
# LOGOUT
# -------------------------
@router.post("/logout")
def logout(refresh_token: str, db: Session = Depends(get_db)):
    db_token = db.query(RefreshToken).filter_by(token=refresh_token).first()
    if db_token:
        db_token.revoked = True
        db.commit()
    return {"msg": "Logged out successfully"}
