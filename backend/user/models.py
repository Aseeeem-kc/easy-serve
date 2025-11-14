from sqlalchemy import Boolean, Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from auth.database import Base
from sqlalchemy.sql import func
from auth.models import RefreshToken
from typing import Optional
from datetime import datetime, timedelta
from sqlalchemy import Column, String, DateTime


class User(Base):
    __tablename__ = "users"
    __allow_unmapped__ = True


    id = Column(Integer, primary_key=True, index=True)

    # REQUIRED
    username = Column(String, unique=True, index=True, nullable=False)
    company_name = Column(String, unique=True, index=True, nullable=False)
    location = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    phone_number = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)

    # OPTIONAL (as all business may not have PAN)
    pan_number = Column(String, index=True, nullable=True)

    # DEFAULTS
    is_active = Column(Boolean, default=False)
    email_token = Column(String, nullable=True)
    reset_token = Column(String, nullable=True)
    reset_token_expires = Column(DateTime, nullable=True)


    # Relationships
    refresh_tokens = relationship(
        "RefreshToken",
        back_populates="user",
        cascade="all, delete-orphan",
        lazy="selectin"
    )

    client_profile = relationship(
        "ClientProfile",
        back_populates="user",
        uselist=False,
        cascade="all, delete-orphan",
        lazy="selectin"
    )
    
class ClientProfile(Base):
    __tablename__ = "client_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    
    # Business onboarding details
    industry = Column(String(100), nullable=False)  
    company_size = Column(String(50), nullable=True) 
    website_url = Column(String(500), nullable=True)
    primary_usecase = Column(String(500), nullable=True)
    business_goals = Column(String(500), nullable=True)
    
    # Basic workflow settings
    timezone = Column(String(50), default="Asia/Kathmandu")
    language = Column(String(10), default="en") 
    
    # RAG knowledge base tracking
    knowledge_base_status = Column(String(20), default="pending")  
    documents_uploaded_count = Column(Integer, default=0)
    last_kb_update = Column(DateTime, nullable=True)
    kb_processing_status = Column(String(20), default="idle") 
    
    # Simple subscription
    subscription_plan = Column(String(50), default="basic") 
    is_onboarded = Column(Boolean, default=False) 
    
    # Timestamps
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())

    # Relationships
    user = relationship("User", back_populates="client_profile")
    
    knowledge_documents = relationship(
        "KnowledgeDocument",
        back_populates="client_profile",
        cascade="all, delete-orphan"
    )

class KnowledgeDocument(Base):
    __tablename__ = "knowledge_documents"
    
    id = Column(Integer, primary_key=True, index=True)
    client_profile_id = Column(Integer, ForeignKey("client_profiles.id", ondelete="CASCADE"), nullable=False)
    
    # File info
    file_name = Column(String(255), nullable=False)
    file_type = Column(String(50), nullable=True)  
    file_size = Column(Integer, nullable=True)
    
    # Processing status
    upload_date = Column(DateTime, default=func.now())
    processed = Column(Boolean, default=False)
    processing_error = Column(String(500), nullable=True)
    
    # RAG embeddings info
    embedding_model = Column(String(100), default="minilm")
    chunk_count = Column(Integer, default=0)  
    
    client_profile = relationship("ClientProfile", back_populates="knowledge_documents")



