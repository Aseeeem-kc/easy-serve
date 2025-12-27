from sqlalchemy.orm import Session
from auth.database import SessionLocal
from user.models import KnowledgeDocument
from .extractor import extract_text
from .chunker import chunk_text
from .embedder import embed_text
from .vector_store import store_embeddings


def process_document_pipeline(doc_id: int, file_path: str):
    """
    Background task:
    Extract → Chunk → Embed → Store → Update DB
    """

    db: Session = SessionLocal()

    try:
        # Fetch document
        doc = db.query(KnowledgeDocument).filter_by(id=doc_id).first()
        if not doc:
            return

        # -------------------------
        # 1. Extract text
        # -------------------------
        text = extract_text(file_path, doc.file_type)

        # -------------------------
        # 2. Chunk
        # -------------------------
        chunks = chunk_text(text)
        doc.chunk_count = len(chunks)
        db.commit()

        # -------------------------
        # 3. Embeddings
        # -------------------------
        embeddings = embed_text(chunks)

        # -------------------------
        # 4. Store embeddings in ChromaDB
        # -------------------------
        store_embeddings(db, doc_id, chunks, embeddings)

        # -------------------------
        # 5. Mark as processed
        # -------------------------
        doc.processed = True
        db.commit()

    except Exception as e:
        doc.processing_error = str(e)
        doc.processed = False
        db.commit()

    finally:
        db.close()
