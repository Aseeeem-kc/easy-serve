# agents/ticket/graph.py
from langgraph.graph import StateGraph, END
from agents.ticket.state import TicketAgentState
from agents.ticket.nodes.decision import analyze_customer_message
from agents.ticket.nodes.create_ticket import create_ticket
from agents.ticket.nodes.escalate import escalate_ticket
from agents.ticket.nodes.respond import generate_customer_response

from agents.ticket.state import TicketAgentState

def build_ticket_agent(db):
    graph = StateGraph(TicketAgentState)

    graph.add_node("analyze", analyze_customer_message)
    graph.add_node("create_ticket", lambda s: create_ticket(s, db))
    graph.add_node("escalate", lambda s: escalate_ticket(s, db))
    graph.add_node("respond", generate_customer_response)

    graph.set_entry_point("analyze")
    graph.add_edge("analyze", "create_ticket")

    graph.add_conditional_edges(
        "create_ticket",
        escalation_router,
        {
            "escalate": "escalate",
            "respond": "respond",
        }
    )

    graph.add_edge("escalate", END)
    graph.add_edge("respond", END)

    return graph.compile()


def escalation_router(state: TicketAgentState):
    return "escalate" if state["needs_escalation"] else "respond"
