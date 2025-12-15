# agents/ticket/nodes/respond.py
from agents.llm import llm
from agents.ticket.state import TicketAgentState

def generate_customer_response(state: TicketAgentState):
    prompt = f"""
You are a polite e-commerce support assistant.

Customer message:
{state["customer_message"]}

Write a short reassuring response confirming ticket creation.
"""

    result = llm.invoke(prompt)
    state["response"] = result.content
    return state
