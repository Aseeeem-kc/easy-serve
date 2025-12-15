# agents/ticket/nodes/decision.py
from agents.llm import llm
from agents.ticket.state import TicketAgentState
from agents.utils.json_parser import extract_json


def analyze_customer_message(state: TicketAgentState):
    prompt = f"""
Analyze the customer message and return ONLY valid JSON.

Required fields:
- subject
- category (refund, billing, technical, delivery, general)
- priority (low, medium, high, urgent)
- needs_escalation (true or false)
- ai_confidence (0-100)
- agent_notes

Customer message:
{state["customer_message"]}
"""

    result = llm.invoke(prompt)

    try:
        data = extract_json(result.content)
    except Exception as e:
        # Safe fallback → escalate to human
        data = {
            "subject": "Customer Support Request",
            "category": "general",
            "priority": "high",
            "needs_escalation": True,
            "ai_confidence": 30,
            "agent_notes": f"LLM JSON parsing failed: {str(e)}",
        }

    state.update(data)
    return state
