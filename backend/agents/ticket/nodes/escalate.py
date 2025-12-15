# agents/ticket/nodes/escalate.py
from tms.models import Ticket, TicketStatus
from agents.ticket.state import TicketAgentState

def escalate_ticket(state: TicketAgentState, db):
    ticket = db.query(Ticket).get(state["ticket_id"])
    ticket.status = TicketStatus.in_progress
    ticket.agent_notes = state["agent_notes"]
    db.commit()

    state["response"] = (
        "Thanks for reaching out. Your request has been escalated "
        "to our support team, and they’ll get back to you shortly."
    )
    return state
