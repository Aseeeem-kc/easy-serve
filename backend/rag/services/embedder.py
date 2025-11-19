from google import genai
import os
import dotenv
dotenv.load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")


client = genai.Client(api_key=GOOGLE_API_KEY)

def embed_text(chunks: list[str]):
    """
    Returns: list of embedding vectors using Google Gemini Embedding 001
    """
    contents = [{"text": chunk} for chunk in chunks]

    response = client.models.embed_content(
        model="gemini-embedding-001",
        contents=contents
    )

    return [item.embedding for item in response.embeddings]
