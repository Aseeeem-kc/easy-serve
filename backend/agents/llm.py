# agents/llm.py
import os
from huggingface_hub import InferenceClient
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

HF_TOKEN = os.getenv("HF_TOKEN")
MODEL_ID = "Qwen/Qwen3-32B"
# MODEL_ID = "mistralai/mistralsmall"
# MODEL_ID = "bastienp/Gemma-2-2B-Instruct-structured-output"
MODEL_ID = "bastienp/Gemma-2-2B-it-JSON-data-extration"


# client = InferenceClient(api_key=HF_TOKEN)
client = Groq(api_key=os.getenv("GROQ_API_KEY"))
# llm = client.chat.completions.create(
#     model="openai/gpt-oss-120b",    
# )

class HuggingFaceChatLLM:
    """
    Unified LLM wrapper for EasyServe agents.
    Provides .invoke(prompt) -> object with .content
    """

    def invoke(self, prompt: str):
        response = client.chat.completions.create(
            model=MODEL_ID,
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are an AI customer support agent for an e-commerce platform. "
                        "You must respond ONLY in valid JSON. "
                        "Do not add explanations, markdown, or extra text."
                    ),
                },
                {
                    "role": "user",
                    "content": prompt,
                },
            ],
            temperature=0.2,
            max_tokens=300,
        )

        return type(
            "LLMResponse",
            (),
            {"content": response.choices[0].message.content},
        )



class GroqChatLLM:
    """
    Unified LLM wrapper for EasyServe agents.
    Compatible with LangGraph.
    """

    def invoke(self, prompt: str):
        response = client.chat.completions.create(
            model="openai/gpt-oss-120b",
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are a backend API service.\n"
                        "You must return ONLY valid JSON.\n"
                        "No explanations.\n"
                        "No reasoning.\n"
                        "No markdown.\n"
                        "If unsure, still output valid JSON."
                    ),
                },
                {
                    "role": "user",
                    "content": prompt,
                },
            ],
            temperature=0.1,
            max_tokens=300,
        )

        return type(
            "LLMResponse",
            (),
            {"content": response.choices[0].message.content},
        )

# single shared instance
# llm = HuggingFaceChatLLM()
llm = GroqChatLLM()