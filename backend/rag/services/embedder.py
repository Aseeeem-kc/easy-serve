from google import genai

client = genai.Client(api_key="GOOGLE_API_KEY")

def embed_text(chunks: list[str]):
    """
    Returns: list of embedding vectors using Google Gemini Embedding 001
    """
    # Prepare input for Google embedding
    contents = [{"text": chunk} for chunk in chunks]

    # Call the Gemini embedding model
    response = client.models.batch_embed_contents(
        model="gemini-embedding-001",
        contents=contents
    )

    # Extract embeddings from the response
    return [item.embedding for item in response.embeddings]

# Example usage
texts = ["Hello world", "How are you?"]
embeddings = embed_text(texts)
print(embeddings)
