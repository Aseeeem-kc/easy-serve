from fastapi import APIRouter, UploadFile, File, BackgroundTasks, Depends, HTTPException
from sqlalchemy.orm import Session
from auth.dependencies import get_db, get_current_user
from user.models import User, KnowledgeDocument
from rag.services.document_pipeline import process_document_pipeline
import shutil
import os
import uuid

router = APIRouter(tags=["rag"])

UPLOAD_DIR = "storage/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload")
def upload_knowledge_file(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if not current_user.client_profile:
        raise HTTPException(status_code=400, detail="User has no profile")

    # Generate unique filename
    file_ext = os.path.splitext(file.filename)[1]
    unique_name = f"{uuid.uuid4()}{file_ext}"
    file_path = os.path.join(UPLOAD_DIR, unique_name)

    # Save file
    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        file_size = os.path.getsize(file_path)

        # Create DB entry
        kb_doc = KnowledgeDocument(
            client_profile_id=current_user.client_profile.id,
            file_name=file.filename,
            file_type=file.content_type,
            file_size=file_size,
        )
        db.add(kb_doc)
        db.commit()
        db.refresh(kb_doc)

        # Trigger background task
        background_tasks.add_task(process_document_pipeline, kb_doc.id, file_path)

        return {"message": "File uploaded successfully", "document_id": kb_doc.id}

    except Exception as e:
        if os.path.exists(file_path):
            os.remove(file_path)
        raise HTTPException(status_code=500, detail=str(e))


from agents.retrieval.graph import build_retrieval_agent

@router.post("/query")
def query_knowledge_base(
    payload: dict,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if not current_user.client_profile:
        raise HTTPException(status_code=400, detail="User has no profile")
        
    client_profile_id = current_user.client_profile.id

    agent = build_retrieval_agent(db)
    result = agent.invoke({
        "query": payload["query"],
        "client_profile_id": client_profile_id
    })
    
    return {
        "answer": result["answer"],
        "retrieved_docs": result.get("retrieved_docs", [])
    }
