from sqlalchemy import text

def store_embeddings(db, doc_id: int, chunks: list[str], embeddings: list[list[float]]):
    """
    Stores chunks + embeddings to a PGVector table.
    """

    for idx, (chunk, emb) in enumerate(zip(chunks, embeddings)):
        db.execute(
            text("""
                INSERT INTO document_embeddings
                (document_id, chunk_index, chunk_text, embedding)
                VALUES (:doc_id, :idx, :text, :emb)
            """),
            {
                "doc_id": doc_id,
                "idx": idx,
                "text": chunk,
                "emb": emb
            }
        )
    db.commit()

# CREATE EXTENSION IF NOT EXISTS vector;

# CREATE TABLE document_embeddings (
#     id SERIAL PRIMARY KEY,
#     document_id INT REFERENCES knowledge_documents(id) ON DELETE CASCADE,
#     chunk_index INT,
#     chunk_text TEXT,
#     embedding vector(1536)
# );
