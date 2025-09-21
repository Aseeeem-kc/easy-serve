from pydantic import BaseModel, ConfigDict
from typing import Optional


class UserBase(BaseModel):
    username: str
    company_name: str
    location: Optional[str] = None
    pan_number: str
    email: str
    phone_number: str


class UserCreate(UserBase):
    password: str   


class User(UserBase):
    id: int
    is_active: bool
    hashed_password: str

    model_config = ConfigDict(from_attributes=True)
