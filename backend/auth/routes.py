from fastapi import APIRouter, Depends, HTTPException, status, Request
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from auth.dependencies import get_db, authenticate_user, get_user_by_email
from auth.models import TokenData, Token
from auth.schemas import UserCreate, UserResponse, LoginSchema, MessageResponse,  ResetPasswordSchema, ForgotPasswordSchema
from user.models import User as UserModel
from auth.utils import (
    get_password_hash, verify_password,
    create_access_token, create_refresh_token,
    send_verification_email
)
from auth.models import RefreshToken
from datetime import datetime, timedelta    
from auth.utils import decode_token, send_password_reset_email
from fastapi.responses import JSONResponse
from uuid import uuid4
from fastapi.responses import JSONResponse
from user.models import ClientProfile
from fastapi import Request
from fastapi import APIRouter, Depends, Request
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
from uuid import uuid4
from .oauth import google
from user.models import User as UserModel
import os

router = APIRouter(prefix="/api/auth", tags=["Auth"])


router = APIRouter()


# -------------------------
# SIGNUP
# ------------------------- 
@router.post("/signup", response_model=MessageResponse)
def signup(user: UserCreate, request: Request, db: Session = Depends(get_db)):
    # 1. Check if email exists
    if db.query(UserModel).filter(UserModel.email == user.email).first():
        raise HTTPException(400, "Email already registered")

    # 2. Hash password & generate token
    hashed_password = get_password_hash(user.password)
    token = str(uuid4())

    try:
        # 3. Create User
        new_user = UserModel(
            username=user.username,
            company_name=user.company_name,
            location=user.location,
            pan_number=user.pan_number,
            email=user.email,
            phone_number=user.phone_number,
            hashed_password=hashed_password,
            is_active=False,
            email_token=token
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        # 4. Create Empty Profile for the New User
        empty_profile = ClientProfile(
            user_id=new_user.id,
            industry="Unknown",               # Can't leave NULL due to NOT NULL constraint
            company_size=None,
            website_url=None,
            primary_usecase=None,
            business_goals=None,
            timezone="Asia/Kathmandu",
            language="en",
            knowledge_base_status="pending",
            documents_uploaded_count=0,
            kb_processing_status="idle",
            subscription_plan="basic",
            is_onboarded=False
        )
        db.add(empty_profile)
        db.commit()

        # 5. Send verification email
        verify_url = f"{request.base_url}api/auth/verify/{token}"
        send_verification_email(user.email, verify_url)

        return {"message": "Signup successful! Please verify your email."}

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
# -------------------------
# EMAIL VERIFICATION
# -------------------------

@router.get("/verify/{token}")
def verify_email(token: str, db: Session = Depends(get_db)):
    user = db.query(UserModel).filter(UserModel.email_token == token).first()
    if not user:
        raise HTTPException(status_code=400, detail="Invalid or expired token")

    user.is_active = True
    user.email_token = None
    db.commit()
    return {"message": "Email verified successfully! You can now log in."}


# -------------------------
# LOGIN
# -------------------------
@router.post("/token")
def login(credentials: LoginSchema, db: Session = Depends(get_db)):
    user = authenticate_user(db, credentials.email, credentials.password)
    if not user:
        raise HTTPException(status_code=401, detail="Incorrect email or password")

    access_token = create_access_token(data={"sub": user.email})
    refresh_token, _ = create_refresh_token(data={"sub": user.email})

    # Save refresh token in database
    db_token = RefreshToken(
        token=refresh_token,
        user_id=user.id,
        expires_at=datetime.utcnow() + timedelta(days=7)
    )
    db.add(db_token)
    db.commit()

    # Use json response to set http only cookie for refresh token
    response = JSONResponse(content={"access_token": access_token, "username": user.email})

    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=False, #  prod ma true garne
        samesite="lax",
        path="/"
    )

    return response




# -------------------------
# REFRESH TOKEN
# -------------------------
@router.post("/refresh")
def refresh_token(request: Request, db: Session = Depends(get_db)):
    refresh_token = request.cookies.get("refresh_token")
    if not refresh_token:
        raise HTTPException(status_code=401, detail="No refresh token cookie")

    # Decode
    payload = decode_token(refresh_token, refresh=True)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid refresh token")

    username = payload.get("sub")

    # Validate from DB
    db_token = db.query(RefreshToken).filter_by(token=refresh_token, revoked=False).first()
    if not db_token or db_token.expires_at < datetime.utcnow():
        raise HTTPException(status_code=401, detail="Expired or revoked refresh token")

    # Issue new access token
    new_access_token = create_access_token(data={"sub": username})

    return {"access_token": new_access_token}


# -------------------------
# LOGOUT
# -------------------------
@router.post("/logout")
def logout(request: Request, db: Session = Depends(get_db)):
    refresh_token = request.cookies.get("refresh_token")
    if refresh_token:
        db_token = db.query(RefreshToken).filter_by(token=refresh_token).first()
        if db_token:
            db_token.revoked = True
            db.commit()

    response = JSONResponse({"message": "Logged out successfully"})

    # Remove cookie
    response.delete_cookie("refresh_token", path="/api/auth/refresh")

    return response


# -------------------------
# FORGOT PASSWORD
# -------------------------
from auth.schemas import ForgotPasswordSchema
from fastapi import Body

@router.post("/forgot-password", response_model=MessageResponse)
def forgot_password(
    request: Request,
    payload: ForgotPasswordSchema = Body(...),
    db: Session = Depends(get_db)
):
    email = payload.email

    user = db.query(UserModel).filter(UserModel.email == email).first()

    # Do NOT reveal if user exists
    if not user:
        return {"message": "If this email exists, a reset link has been sent."}

    reset_token = str(uuid4())
    user.reset_token = reset_token
    user.reset_token_expires = datetime.utcnow() + timedelta(minutes=30)
    db.commit()

    reset_url = f"http://localhost:5173/reset-password/{reset_token}"
    send_password_reset_email(email, reset_url)

    return {"message": "If this email exists, a reset link has been sent."}

# -------------------------
# RESET PASSWORD
# -------------------------
@router.post("/reset-password/{token}", response_model=MessageResponse)
def reset_password(token: str, data: ResetPasswordSchema, db: Session = Depends(get_db)):
    user = db.query(UserModel).filter(UserModel.reset_token == token).first()

    if not user:
        raise HTTPException(status_code=400, detail="Invalid token")

    # Check expiry
    if not user.reset_token_expires or user.reset_token_expires < datetime.utcnow():
        raise HTTPException(status_code=400, detail="Token has expired")

    # Update password
    user.hashed_password = get_password_hash(data.password)

    # Clear token
    user.reset_token = None
    user.reset_token_expires = None

    db.commit()

    return {"message": "Password reset successful. You can now log in."}


# -------------------------
# GOOGLE OAUTH LOGIN
# -------------------------
@router.get("/google")
async def google_login(request: Request):
    redirect_uri = request.url_for("google_callback")
    return await google.authorize_redirect(request, redirect_uri)


# -------------------------
# GOOGLE OAUTH CALLBACK
# -------------------------
@router.get("/google/callback")
async def google_callback(request: Request, db: Session = Depends(get_db)):
    token = await google.authorize_access_token(request)
    user_info = token.get("userinfo") or token.get("id_token_claims")
    
    if not user_info:
        return {"error": "Failed to retrieve user info from Google."}

    email = user_info.get("email")
    name = user_info.get("name")
    
    # Check or create user
    user = db.query(UserModel).filter_by(email=email).first()
    if not user:
        user = UserModel(
            email=email,
            username=name.replace(" ", "_"),
            company_name="N/A",
            location="N/A",
            phone_number="0000000000",
            hashed_password="oauth_user",
            oauth_provider="google"
        )
        db.add(user)
        db.commit()
        db.refresh(user)

    # Create access + refresh tokens
    access_token = create_access_token({"sub": user.email})
    refresh_token, _ = create_refresh_token({"sub": user.email})

    # Save refresh token in database
    db_token = RefreshToken(
        token=refresh_token,
        user_id=user.id,
        expires_at=datetime.utcnow() + timedelta(days=7)
    )
    db.add(db_token)
    db.commit()

    # Redirect response with cookie
    frontend_redirect = f"{os.getenv('FRONTEND_REDIRECT_URI')}?token={access_token}"
    response = RedirectResponse(frontend_redirect)
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=False,  # True in prod
        samesite="lax",
        path="/"
    )

    return response