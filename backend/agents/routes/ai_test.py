from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from auth.dependencies import get_db
from agents.ticket.graph import build_ticket_agent

router = APIRouter(prefix="/ai/test", tags=["AI Test"])

@router.post("/message")
def test_ticket_agent(payload: dict, db: Session = Depends(get_db)):
    agent = build_ticket_agent(db)

    result = agent.invoke({
        "client_profile_id": payload["client_profile_id"],
        "customer_name": payload.get("customer_name"),
        "customer_email": payload["customer_email"],
        "customer_phone": payload.get("customer_phone"),
        "customer_message": payload["message"],
    })

    return {
        "ticket_id": result["ticket_id"],
        "response": result["response"],
        "priority": result["priority"],
        "escalated": result["needs_escalation"],
        "confidence": result["ai_confidence"],
        "category": result["category"],
    }
