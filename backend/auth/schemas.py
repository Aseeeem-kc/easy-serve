from pydantic import BaseModel, ConfigDict, EmailStr, Field
from typing import Optional

# Shared base schema
class UserBase(BaseModel):
    username: str = Field(..., description="Unique username for login")
    company_name: str = Field(..., description="Company name")
    location: Optional[str] = Field(None, description="Location (optional)")
    pan_number: str = Field(..., description="PAN number of the company")
    email: EmailStr = Field(..., description="Valid email address")
    phone_number: str = Field(..., description="Phone number")


# Used for signup (includes password)
class UserCreate(UserBase):
    password: str = Field(..., min_length=8, description="Password (min 8 characters)")


# Used for responses (hides password hash)
class UserResponse(UserBase):
    id: int
    is_active: bool

    model_config = ConfigDict(from_attributes=True)

class LoginSchema(BaseModel):
    email: EmailStr
    password: str

# Message response schema

class MessageResponse(BaseModel):
    message: str