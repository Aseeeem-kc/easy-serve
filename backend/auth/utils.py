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
SECRET_KEY = os.getenv("SECRET_KEY", "")
REFRESH_SECRET_KEY = os.getenv("REFRESH_SECRET_KEY", "")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 15
REFRESH_TOKEN_EXPIRE_DAYS = 7

pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")


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
    subject = "Verify your EasyServe account"
    
    # HTML body with clickable button matching website theme
    body = f"""
    <html>
      <head>
        <style>
          body {{
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
            background-color: #f9fafb;
          }}
          .container {{
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
          }}
          .header {{
            background: linear-gradient(135deg, #111827 0%, #374151 100%);
            padding: 40px 30px;
            text-align: center;
          }}
          .logo {{
            width: 50px;
            height: 50px;
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
            border-radius: 12px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 15px;
            border: 2px solid rgba(255, 255, 255, 0.3);
          }}
          .logo-text {{
            color: white;
            font-size: 24px;
            font-weight: bold;
            letter-spacing: -0.5px;
          }}
          .brand {{
            color: white;
            font-size: 28px;
            font-weight: bold;
            margin-top: 10px;
          }}
          .content {{
            padding: 40px 30px;
          }}
          .badge {{
            display: inline-block;
            background: linear-gradient(135deg, #111827 0%, #374151 100%);
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            margin-bottom: 20px;
          }}
          .title {{
            font-size: 28px;
            font-weight: bold;
            color: #111827;
            margin: 0 0 15px 0;
          }}
          .text {{
            font-size: 16px;
            line-height: 1.6;
            color: #4b5563;
            margin: 0 0 25px 0;
          }}
          .button {{
            display: inline-block;
            padding: 16px 32px;
            font-size: 16px;
            font-weight: 600;
            color: white !important;
            background: linear-gradient(135deg, #111827 0%, #374151 100%);
            text-decoration: none;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
            transition: all 0.3s ease;
          }}
          .button:hover {{
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
            transform: translateY(-2px);
          }}
          .link {{
            font-size: 13px;
            color: #6b7280;
            word-break: break-all;
            background-color: #f3f4f6;
            padding: 12px;
            border-radius: 8px;
            border: 1px solid #e5e7eb;
          }}
          .footer {{
            background-color: #f9fafb;
            padding: 30px;
            text-align: center;
            border-top: 2px solid #e5e7eb;
          }}
          .footer-text {{
            font-size: 13px;
            color: #6b7280;
            margin: 5px 0;
          }}
          .divider {{
            height: 1px;
            background-color: #e5e7eb;
            margin: 25px 0;
          }}
        </style>
      </head>
      <body>
        <div class="container">
          <!-- Header -->
          <div class="header">
            <div class="logo">
              <span class="logo-text">E</span>
            </div>
            <div class="brand">EasyServe</div>
          </div>
          
          <!-- Content -->
          <div class="content">
            <span class="badge">✨ Account Verification</span>
            <h1 class="title">Welcome to EasyServe!</h1>
            <p class="text">
              Thank you for signing up. We're excited to have you on board! 
              Click the button below to verify your email address and get started.
            </p>
            
            <p style="text-align: center; margin: 30px 0;">
              <a href="{verify_url}" class="button">Verify Email Address</a>
            </p>
            
            <div class="divider"></div>
            
            <p class="text" style="font-size: 14px;">
              If the button doesn't work, copy and paste this link into your browser:
            </p>
            <div class="link">{verify_url}</div>
          </div>
          
          <!-- Footer -->
          <div class="footer">
            <p class="footer-text"><strong>EasyServe</strong> - AI-Powered Customer Support</p>
            <p class="footer-text">This is an automated email. Please do not reply.</p>
            <p class="footer-text" style="margin-top: 15px; color: #9ca3af;">
              © 2024 EasyServe. All rights reserved.
            </p>
          </div>
        </div>
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
    subject = "Reset Your EasyServe Password"

    # HTML body with a reset button matching website theme
    body = f"""
    <html>
      <head>
        <style>
          body {{
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
            background-color: #f9fafb;
          }}
          .container {{
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
          }}
          .header {{
            background: linear-gradient(135deg, #111827 0%, #374151 100%);
            padding: 40px 30px;
            text-align: center;
          }}
          .logo {{
            width: 50px;
            height: 50px;
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
            border-radius: 12px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 15px;
            border: 2px solid rgba(255, 255, 255, 0.3);
          }}
          .logo-text {{
            color: white;
            font-size: 24px;
            font-weight: bold;
            letter-spacing: -0.5px;
          }}
          .brand {{
            color: white;
            font-size: 28px;
            font-weight: bold;
            margin-top: 10px;
          }}
          .content {{
            padding: 40px 30px;
          }}
          .badge {{
            display: inline-block;
            background: linear-gradient(135deg, #111827 0%, #374151 100%);
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            margin-bottom: 20px;
          }}
          .title {{
            font-size: 28px;
            font-weight: bold;
            color: #111827;
            margin: 0 0 15px 0;
          }}
          .text {{
            font-size: 16px;
            line-height: 1.6;
            color: #4b5563;
            margin: 0 0 25px 0;
          }}
          .button {{
            display: inline-block;
            padding: 16px 32px;
            font-size: 16px;
            font-weight: 600;
            color: white !important;
            background: linear-gradient(135deg, #111827 0%, #374151 100%);
            text-decoration: none;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
            transition: all 0.3s ease;
          }}
          .button:hover {{
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
            transform: translateY(-2px);
          }}
          .link {{
            font-size: 13px;
            color: #6b7280;
            word-break: break-all;
            background-color: #f3f4f6;
            padding: 12px;
            border-radius: 8px;
            border: 1px solid #e5e7eb;
          }}
          .alert {{
            background-color: #fef3c7;
            border: 2px solid #fbbf24;
            border-radius: 12px;
            padding: 16px;
            margin: 25px 0;
          }}
          .alert-text {{
            font-size: 14px;
            color: #92400e;
            margin: 0;
            font-weight: 500;
          }}
          .footer {{
            background-color: #f9fafb;
            padding: 30px;
            text-align: center;
            border-top: 2px solid #e5e7eb;
          }}
          .footer-text {{
            font-size: 13px;
            color: #6b7280;
            margin: 5px 0;
          }}
          .divider {{
            height: 1px;
            background-color: #e5e7eb;
            margin: 25px 0;
          }}
        </style>
      </head>
      <body>
        <div class="container">
          <!-- Header -->
          <div class="header">
            <div class="logo">
              <span class="logo-text">E</span>
            </div>
            <div class="brand">EasyServe</div>
          </div>
          
          <!-- Content -->
          <div class="content">
            <span class="badge">🔒 Password Recovery</span>
            <h1 class="title">Reset Your Password</h1>
            <p class="text">
              We received a request to reset your password. Click the button below to create a new password for your EasyServe account.
            </p>
            
            <p style="text-align: center; margin: 30px 0;">
              <a href="{reset_url}" class="button">Reset Password</a>
            </p>
            
            <div class="divider"></div>
            
            <p class="text" style="font-size: 14px;">
              If the button doesn't work, copy and paste this link into your browser:
            </p>
            <div class="link">{reset_url}</div>
            
            <div class="alert">
              <p class="alert-text">
                ⚠️ If you did NOT request a password reset, please ignore this email. Your password will remain unchanged.
              </p>
            </div>
            
            <p class="text" style="font-size: 13px; color: #6b7280; margin-top: 20px;">
              This link will expire in 1 hour for security reasons.
            </p>
          </div>
          
          <!-- Footer -->
          <div class="footer">
            <p class="footer-text"><strong>EasyServe</strong> - AI-Powered Customer Support</p>
            <p class="footer-text">This is an automated email. Please do not reply.</p>
            <p class="footer-text" style="margin-top: 15px; color: #9ca3af;">
              © 2024 EasyServe. All rights reserved.
            </p>
          </div>
        </div>
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
