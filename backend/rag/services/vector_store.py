import os
import chromadb
from sqlalchemy.orm import Session
from user.models import KnowledgeDocument

# Path to store ChromaDB data
CHROMA_DB_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "storage", "chroma_db")

def get_chroma_client():
    # Ensure the directory exists
    os.makedirs(CHROMA_DB_PATH, exist_ok=True)
    return chromadb.PersistentClient(path=CHROMA_DB_PATH)

def get_collection():
    client = get_chroma_client()
    # Using cosine distance (hnsw:space = "cosine")
    return client.get_or_create_collection(name="document_embeddings", metadata={"hnsw:space": "cosine"})

def store_embeddings(db: Session, doc_id: int, chunks: list[str], embeddings: list[list[float]]):
    """
    Stores chunks + embeddings to ChromaDB.
    """
    # Fetch document to get client_profile_id for metadata filtering
    doc = db.query(KnowledgeDocument).filter_by(id=doc_id).first()
    if not doc:
        # If doc not found (unlikely), we can't associate it with a client profile.
        # Proceeding without client_profile_id might break strict filtering, so we log or skip.
        # For now, let's assume it exists or raise error.
        print(f"Error: Document {doc_id} not found when storing embeddings.")
        return

    client_profile_id = doc.client_profile_id
    
    collection = get_collection()
    
    # Generate unique IDs for chunks: {doc_id}_{chunk_index}
    ids = [f"{doc_id}_{i}" for i in range(len(chunks))]
    
    metadatas = [
        {
            "document_id": doc_id, 
            "chunk_index": i, 
            "client_profile_id": client_profile_id
        } 
        for i in range(len(chunks))
    ]
    
    collection.add(
        ids=ids,
        embeddings=embeddings,
        documents=chunks,
        metadatas=metadatas
    )

def search_embeddings(db: Session, query_embedding: list[float], limit: int = 5, client_profile_id: int = None):
    """
    Search for similar chunks using cosine similarity.
    """
    collection = get_collection()
    
    where_filter = {}
    if client_profile_id:
        where_filter["client_profile_id"] = client_profile_id
        
    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=limit,
        where=where_filter if where_filter else None
    )
    
    # Chroma returns a dict with lists of lists (one list per query vector)
    # results['ids'][0], results['documents'][0], results['metadatas'][0], results['distances'][0]
    
    if not results or not results['ids'] or not results['ids'][0]:
        return []
        
    hits = []
    num_hits = len(results['ids'][0])
    
    for i in range(num_hits):
        meta = results['metadatas'][0][i]
        doc_text = results['documents'][0][i]
        distance = results['distances'][0][i]
        
        # Cosine distance is used (0 to 2). Similarity = 1 - distance.
        similarity = 1 - distance
        
        hits.append({
            "document_id": meta["document_id"],
            "chunk_text": doc_text,
            "similarity": similarity
        })
        
    return hits

