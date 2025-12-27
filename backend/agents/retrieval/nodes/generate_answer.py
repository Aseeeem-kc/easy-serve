from agents.retrieval.state import RetrievalAgentState
from agents.llm import llm

def generate_answer(state: RetrievalAgentState):
    query = state["query"]
    docs = state.get("retrieved_docs", [])
    
    if not docs:
        return {"answer": "I could not find any relevant information in the knowledge base."}
        
    context_text = "\n\n".join([f"- {d['chunk_text']}" for d in docs])
    
    prompt = f"""
    Context information is below.
    ---------------------
    {context_text}
    ---------------------
    Given the context information and not prior knowledge, answer the query.
    Query: {query}
    """
    
    system_prompt = "You are a helpful assistant. Use the provided context to answer the user's question accurately."
    
    response = llm.invoke(prompt, system_prompt=system_prompt)
    
    return {"answer": response.content}
