from pydantic import BaseModel, ConfigDict, HttpUrl, Field
from typing import Optional
from datetime import datetime
from enum import Enum

# === EXISTING SCHEMAS ===
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

# === NEW PHASE 1 ONBOARDING SCHEMAS ===
class CompanySize(str, Enum):
    SMB = "SMB"
    ENTERPRISE = "Enterprise"
    STARTUP = "Startup"

class KnowledgeBaseStatus(str, Enum):
    PENDING = "pending"
    ACTIVE = "active"
    INACTIVE = "inactive"

class KBProcessingStatus(str, Enum):
    IDLE = "idle"
    PROCESSING = "processing"
    ERROR = "error"

class SubscriptionPlan(str, Enum):
    BASIC = "basic"
    PRO = "pro"

# SCHEMA 
class OnboardingProfileCreate(BaseModel):
    industry: str = Field(..., min_length=1, max_length=100)
    company_size: Optional[str] = Field(None, max_length=50)  # "SMB", "Enterprise"
    website_url: Optional[HttpUrl] = None
    timezone: str = Field(default="Asia/Kathmandu", max_length=50)
    language: str = Field(default="en", max_length=10)  # "en", "np"

# Knowledge Document Upload
class KnowledgeDocumentCreate(BaseModel):
    file_name: str = Field(..., max_length=255)
    file_type: str = Field(..., max_length=50)
    file_size: Optional[int] = None

class KnowledgeDocumentResponse(BaseModel):
    id: int
    file_name: str
    file_type: str
    file_size: Optional[int]
    processed: bool
    processing_error: Optional[str]
    upload_date: datetime
    chunk_count: int
    
    model_config = ConfigDict(from_attributes=True)

# Profile Response
class ClientProfileResponse(BaseModel):
    id: int
    industry: str
    company_size: Optional[str]
    website_url: Optional[str]
    timezone: str
    language: str
    knowledge_base_status: KnowledgeBaseStatus
    documents_uploaded_count: int
    kb_processing_status: KBProcessingStatus
    subscription_plan: SubscriptionPlan
    is_onboarded: bool
    created_at: datetime
    updated_at: datetime
    
    model_config = ConfigDict(from_attributes=True)

# Full User + Profile Response
class UserProfileResponse(BaseModel):
    user: User
    profile: ClientProfileResponse