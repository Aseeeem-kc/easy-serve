from agents.retrieval.state import RetrievalAgentState
from rag.services.embedder import embed_text
from rag.services.vector_store import search_embeddings
from sqlalchemy.orm import Session

def retrieve_documents(state: RetrievalAgentState, db: Session):
    query = state["query"]
    client_profile_id = state.get("client_profile_id")
    
    # 1. Embed query
    # embed_text expects list
    embeddings = embed_text([query])
    query_embedding = embeddings[0]

    # 2. Search
    results = search_embeddings(db, query_embedding, limit=5, client_profile_id=client_profile_id)
    
    return {"retrieved_docs": results}
