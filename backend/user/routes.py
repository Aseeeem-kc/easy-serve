from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.orm import Session
from typing import List
from auth.dependencies import get_db, get_current_user
from auth.schemas import MessageResponse
from user.models import User as UserModel, ClientProfile, KnowledgeDocument
from user.schemas import (
    ClientProfileCreate, OnboardingComplete, KnowledgeDocumentCreate,
    KnowledgeDocumentResponse, ClientProfileResponse, UserProfileResponse
)
from datetime import datetime

router = APIRouter(prefix="/onboarding", tags=["Onboarding"])

# -------------------------
# COMPLETE BUSINESS ONBOARDING
# -------------------------
@router.post("/profile", response_model=ClientProfileResponse)
def complete_onboarding(
    profile_data: ClientProfileCreate,
    current_user: UserModel = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Check if profile already exists
    existing_profile = db.query(ClientProfile).filter(ClientProfile.user_id == current_user.id).first()
    if existing_profile:
        raise HTTPException(status_code=400, detail="Profile already created")
    
    # Create profile
    profile = ClientProfile(
        user_id=current_user.id,
        **profile_data.dict()
    )
    db.add(profile)
    db.commit()
    db.refresh(profile)
    
    return profile

# -------------------------
# MARK ONBOARDING COMPLETE
# -------------------------
@router.patch("/complete", response_model=MessageResponse)
def mark_onboarding_complete(
    data: OnboardingComplete,
    current_user: UserModel = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    profile = db.query(ClientProfile).filter(ClientProfile.user_id == current_user.id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Complete profile first")
    
    profile.is_onboarded = data.is_onboarded
    db.commit()
    return {"message": "Onboarding completed successfully!"}

# -------------------------
# UPLOAD KNOWLEDGE DOCUMENTS (RAG Pipeline)
# -------------------------
@router.post("/documents", response_model=KnowledgeDocumentResponse)
async def upload_knowledge_document(
    file: UploadFile = File(...),
    current_user: UserModel = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Get profile
    profile = db.query(ClientProfile).filter(ClientProfile.user_id == current_user.id).first()
    if not profile:
        raise HTTPException(status_code=400, detail="Complete business profile first")
    
    # Validate file type
    allowed_types = ['application/pdf', 'text/plain', 'application/msword']
    if file.content_type not in allowed_types:
        raise HTTPException(status_code=400, detail="Only PDF, TXT, DOC files allowed")
    
    # Read file content
    content = await file.read()
    
    # Create document record
    doc = KnowledgeDocument(
        client_profile_id=profile.id,
        file_name=file.filename,
        file_type=file.content_type,
        file_size=len(content)
    )
    db.add(doc)
    db.commit()
    db.refresh(doc)
    
    # Update profile counters
    profile.documents_uploaded_count += 1
    profile.kb_processing_status = "processing"
    profile.last_kb_update = datetime.utcnow()
    db.commit()
    
    return doc

# -------------------------
# GET ALL KNOWLEDGE DOCUMENTS
# -------------------------
@router.get("/documents", response_model=List[KnowledgeDocumentResponse])
def get_knowledge_documents(
    current_user: UserModel = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    profile = db.query(ClientProfile).filter(ClientProfile.user_id == current_user.id).first()
    if not profile:
        return []
    
    docs = db.query(KnowledgeDocument).filter(KnowledgeDocument.client_profile_id == profile.id).all()
    return docs

# -------------------------
# GET FULL USER PROFILE
# -------------------------
@router.get("/profile", response_model=UserProfileResponse)
def get_user_profile(
    current_user: UserModel = Depends(get_current_user), 
    db: Session = Depends(get_db)
):
    profile = db.query(ClientProfile).filter(ClientProfile.user_id == current_user.id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    
    return {
        "user": current_user,
        "profile": profile
    }

# -------------------------
# ACTIVATE KNOWLEDGE BASE
# -------------------------
@router.post("/knowledge-base/activate", response_model=MessageResponse)
def activate_knowledge_base(
    current_user: UserModel = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    profile = db.query(ClientProfile).filter(ClientProfile.user_id == current_user.id).first()
    if not profile or profile.documents_uploaded_count == 0:
        raise HTTPException(status_code=400, detail="Upload documents first")
    
    profile.knowledge_base_status = "active"
    profile.kb_processing_status = "idle"
    db.commit()
    
    return {"message": "Knowledge base activated! RAG pipeline ready."}