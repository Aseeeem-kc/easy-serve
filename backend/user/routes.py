from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.orm import Session
from typing import List
from auth.dependencies import get_db, get_current_user
from auth.schemas import MessageResponse
from user.models import User as UserModel, ClientProfile, KnowledgeDocument
from user.schemas import (
    OnboardingProfileCreate, KnowledgeDocumentCreate,
    KnowledgeDocumentResponse, ClientProfileResponse, UserProfileResponse
)
from datetime import datetime
import os
from rag.services.document_pipeline import process_document_pipeline
from fastapi import BackgroundTasks

router = APIRouter(prefix="/onboarding", tags=["Onboarding"])

STORAGE_DIR = "storage/documents"
os.makedirs(STORAGE_DIR, exist_ok=True)

# -------------------------
# COMPLETE BUSINESS ONBOARDING
# -------------------------
@router.post("/profile", response_model=MessageResponse)
def create_business_profile(
    data: OnboardingProfileCreate,
    current_user: UserModel = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    existing = db.query(ClientProfile).filter(ClientProfile.user_id == current_user.id).first()
    if existing:
        raise HTTPException(400, "Profile already exists")

    profile = ClientProfile(
        user_id=current_user.id,
        industry=data.industry,
        company_size=data.company_size,
        website_url=str(data.website_url) if data.website_url else None,  # -> str()
        timezone=data.timezone,
        language=data.language,
        primary_usecase=data.primary_usecase,
        Business_goals=data.business_goals
    )
    db.add(profile)
    db.commit()
    db.refresh(profile)

    return {"message": "Business profile created successfully!"}

# -------------------------
# UPLOAD KNOWLEDGE DOCUMENTS (RAG Pipeline)
# -------------------------
# @router.post("/documents", response_model=KnowledgeDocumentResponse)
# async def upload_knowledge_document(
#     file: UploadFile = File(...),
#     current_user: UserModel = Depends(get_current_user),
#     db: Session = Depends(get_db)
# ):
#     # Get profile
#     profile = db.query(ClientProfile).filter(ClientProfile.user_id == current_user.id).first()
#     if not profile:
#         raise HTTPException(status_code=400, detail="Complete business profile first")
    
#     # Validate file type
#     allowed_types = ['application/pdf', 'text/plain', 'application/msword']
#     if file.content_type not in allowed_types:
#         raise HTTPException(status_code=400, detail="Only PDF, TXT, DOC files allowed")
    
#     # Read file content
#     content = await file.read()
    
#     # Create document record
#     doc = KnowledgeDocument(
#         client_profile_id=profile.id,
#         file_name=file.filename,
#         file_type=file.content_type,
#         file_size=len(content)
#     )
#     db.add(doc)
#     db.commit()
#     db.refresh(doc)
    
#     # Update profile counters
#     profile.documents_uploaded_count += 1
#     profile.kb_processing_status = "processing"
#     profile.last_kb_update = datetime.utcnow()
#     db.commit()
    
#     return doc

# -------------------------
# GET ALL KNOWLEDGE DOCUMENTS
# -------------------------
# @router.post("/documents", response_model=KnowledgeDocumentResponse)
# async def upload_knowledge_document(
#     file: UploadFile = File(...),
#     background_tasks: BackgroundTasks = Depends(),
#     current_user = Depends(get_current_user),
#     db: Session = Depends(get_db)
# ):
#     """
#     Upload a knowledge document (PDF, TXT, DOC) → 
#     Save to disk → 
#     Create DB record → 
#     Trigger background processing pipeline
#     """

#     # -------------------------
#     # 1. Check user profile
#     # -------------------------
#     profile = (
#         db.query(ClientProfile)
#         .filter(ClientProfile.user_id == current_user.id)
#         .first()
#     )
#     if not profile:
#         raise HTTPException(status_code=400, detail="Complete business profile first")

#     # -------------------------
#     # 2. Validate file type
#     # -------------------------
#     allowed_types = [
#         "application/pdf",
#         "text/plain",
#         "application/msword",
#         "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
#     ]

#     if file.content_type not in allowed_types:
#         raise HTTPException(status_code=400, detail="Only PDF, TXT, DOC files allowed")

#     # Read bytes
#     content = await file.read()
#     file_size = len(content)

#     # -------------------------
#     # 3. Create DB record
#     # -------------------------
#     doc = KnowledgeDocument(
#         client_profile_id=profile.id,
#         file_name=file.filename,
#         file_type=file.content_type,
#         file_size=file_size,
#         processed=False
#     )
#     db.add(doc)
#     db.commit()
#     db.refresh(doc)

#     # -------------------------
#     # 4. Save file to disk
#     # -------------------------
#     file_path = f"{STORAGE_DIR}/{doc.id}_{file.filename}"
#     try:
#         with open(file_path, "wb") as f:
#             f.write(content)
#     except Exception:
#         db.delete(doc)
#         db.commit()
#         raise HTTPException(status_code=500, detail="Failed to save file")

#     # -------------------------
#     # 5. Update profile metadata
#     # -------------------------
#     profile.documents_uploaded_count += 1
#     profile.kb_processing_status = "processing"
#     profile.last_kb_update = datetime.utcnow()
#     db.commit()

#     # -------------------------
#     # 6. Trigger background processing
#     # -------------------------
#     background_tasks.add_task(
#         process_document_pipeline,
#         doc_id=doc.id,
#         file_path=file_path
#     )

#     # -------------------------
#     # 7. Return DB record
#     # -------------------------
#     return doc

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