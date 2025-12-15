# agents/ticket/state.py
from typing import TypedDict, Optional

class TicketAgentState(TypedDict):
    # Input
    client_profile_id: int
    customer_name: Optional[str]
    customer_email: str
    customer_phone: Optional[str]
    customer_message: str

    # Ticket
    ticket_id: Optional[int]

    # AI decisions
    subject: Optional[str]
    category: Optional[str]
    priority: Optional[str]
    ai_confidence: Optional[int]
    needs_escalation: bool
    agent_notes: Optional[str]

    # Output
    response: Optional[str]
