from typing import TypedDict, Optional, List, Dict

class RetrievalAgentState(TypedDict):
    # Input
    query: str
    client_profile_id: int

    # Internal
    retrieved_docs: Optional[List[Dict]] # [{"chunk_text":..., "similarity":...}]

    # Output
    answer: Optional[str]
