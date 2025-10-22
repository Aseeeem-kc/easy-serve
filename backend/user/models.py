from sqlalchemy import Boolean, Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from auth.database import Base
from sqlalchemy.sql import func
from auth.models import RefreshToken

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    company_name = Column(String, unique=True, index=True, nullable=True)
    location = Column(String, nullable=True)
    pan_number = Column(String, unique=True, index=True, nullable=True)
    email = Column(String, unique=True, index=True, nullable=True)
    phone_number = Column(String, unique=True, index=True, nullable=True)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=False)  # inactive until verified
    email_token = Column(String, nullable=True)  # token for email verification

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
    industry = Column(String(100), nullable=False)  # "E-commerce", "Retail"
    company_size = Column(String(50), nullable=True)  # "SMB", "Enterprise"
    website_url = Column(String(500), nullable=True)
    
    # Basic workflow settings
    timezone = Column(String(50), default="Asia/Kathmandu")
    language = Column(String(10), default="en")  # "en", "np"
    
    # RAG knowledge base tracking
    knowledge_base_status = Column(String(20), default="pending")  # "pending", "active", "inactive"
    documents_uploaded_count = Column(Integer, default=0)
    last_kb_update = Column(DateTime, nullable=True)
    kb_processing_status = Column(String(20), default="idle")  # "processing", "idle", "error"
    
    # Simple subscription
    subscription_plan = Column(String(50), default="basic")  # "basic", "pro"
    is_onboarded = Column(Boolean, default=False)  # True after full setup
    
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
    file_type = Column(String(50), nullable=True)  # "pdf", "docx", "txt", "csv"
    file_size = Column(Integer, nullable=True)  # bytes
    
    # Processing status
    upload_date = Column(DateTime, default=func.now())
    processed = Column(Boolean, default=False)
    processing_error = Column(String(500), nullable=True)
    
    # RAG embeddings info
    embedding_model = Column(String(100), default="minilm")
    chunk_count = Column(Integer, default=0)  # Number of text chunks
    
    client_profile = relationship("ClientProfile", back_populates="knowledge_documents")