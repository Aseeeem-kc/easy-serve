from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
import secrets
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv
import os

load_dotenv()

EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PASS = os.getenv("EMAIL_PASS")

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


import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PASS = os.getenv("EMAIL_PASS")
EMAIL_HOST = os.getenv("EMAIL_HOST", "smtp.gmail.com")
EMAIL_PORT = int(os.getenv("EMAIL_PORT", 587))

def send_verification_email(to_email: str, verify_url: str):
    """
    Sends a verification email with a clickable button.
    :param to_email: Recipient email address
    :param verify_url: Full verification link (must include http:// or https://)
    """
    subject = "Verify your account"
    
    # HTML body with clickable button
    body = f"""
    <html>
      <body>
        <h3>Welcome!</h3>
        <p>Click the button below to verify your email address:</p>
        <p>
          <a href="{verify_url}" style="
            display: inline-block;
            padding: 10px 20px;
            font-size: 16px;
            color: white;
            background-color: #4CAF50;
            text-decoration: none;
            border-radius: 5px;
          ">Verify Email</a>
        </p>
        <p>If the button doesn’t work, copy and paste this link into your browser:</p>
        <p>{verify_url}</p>
      </body>
    </html>
    """

    # Create email message
    msg = MIMEMultipart()
    msg["From"] = EMAIL_USER
    msg["To"] = to_email
    msg["Subject"] = subject
    msg.attach(MIMEText(body, "html"))

    # Send email via Gmail SMTP
    try:
        with smtplib.SMTP(EMAIL_HOST, EMAIL_PORT) as server:
            server.starttls()
            server.login(EMAIL_USER, EMAIL_PASS)
            server.send_message(msg)
        print(f"Verification email sent to {to_email}")
    except Exception as e:
        print(f"Failed to send verification email: {e}")


def send_password_reset_email(to_email: str, reset_url: str):
    """
    Sends a password reset email with a clickable button.
    :param to_email: Recipient email address
    :param reset_url: Full reset link (must include http:// or https://)
    """
    subject = "Reset Your Password"

    # HTML body with a reset button
    body = f"""
    <html>
      <body>
        <h3>Password Reset Request</h3>
        <p>You requested to reset your password. Click the button below to continue:</p>
        <p>
          <a href="{reset_url}" style="
            display: inline-block;
            padding: 10px 20px;
            font-size: 16px;
            color: white;
            background-color: #ff6b6b;
            text-decoration: none;
            border-radius: 5px;
          ">Reset Password</a>
        </p>
        <p>If the button doesn’t work, copy and paste this link into your browser:</p>
        <p>{reset_url}</p>

        <br/>
        <p>If you did NOT request a password reset, you can safely ignore this email.</p>
      </body>
    </html>
    """

    # Construct email message
    msg = MIMEMultipart()
    msg["From"] = EMAIL_USER
    msg["To"] = to_email
    msg["Subject"] = subject
    msg.attach(MIMEText(body, "html"))

    # Send the email via SMTP
    try:
        with smtplib.SMTP(EMAIL_HOST, EMAIL_PORT) as server:
            server.starttls()
            server.login(EMAIL_USER, EMAIL_PASS)
            server.send_message(msg)
        print(f"Password reset email sent to {to_email}")
    except Exception as e:
        print(f"Failed to send password reset email: {e}")
