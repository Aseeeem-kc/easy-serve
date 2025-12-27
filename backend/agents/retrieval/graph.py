from langgraph.graph import StateGraph, END
from agents.retrieval.state import RetrievalAgentState
from agents.retrieval.nodes.retrieve import retrieve_documents
from agents.retrieval.nodes.generate_answer import generate_answer

def build_retrieval_agent(db):
    graph = StateGraph(RetrievalAgentState)
    
    # Add nodes
    # We pass the db session to the retrieve node using a lambda or partial if needed, 
    # but langgraph nodes usually take state. 
    # The `retrieve_documents` signature I wrote is `(state, db)`. 
    # I should wrap it.
    
    graph.add_node("retrieve", lambda state: retrieve_documents(state, db))
    graph.add_node("generate", generate_answer)
    
    # Add edges
    graph.set_entry_point("retrieve")
    graph.add_edge("retrieve", "generate")
    graph.add_edge("generate", END)
    
    return graph.compile()
