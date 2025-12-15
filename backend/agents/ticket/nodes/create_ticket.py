# agents/ticket/nodes/create_ticket.py
from tms.models import Ticket, TicketStatus, TicketPriority
from agents.ticket.state import TicketAgentState

def create_ticket(state: TicketAgentState, db):
    ticket = Ticket(
        client_profile_id=state["client_profile_id"],
        created_by_user_id=None,  # AI-created
        customer_name=state["customer_name"],
        customer_email=state["customer_email"],
        customer_phone=state["customer_phone"],
        subject=state["subject"],
        description=state["customer_message"],
        category=state["category"],
        priority=TicketPriority[state["priority"]],
        status=TicketStatus.open,
        ai_confidence=state["ai_confidence"],
        agent_notes=state["agent_notes"],
    )

    db.add(ticket)
    db.commit()
    db.refresh(ticket)

    state["ticket_id"] = ticket.id
    return state
