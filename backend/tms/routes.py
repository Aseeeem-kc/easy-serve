from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from sqlalchemy.orm import Session
from typing import List, Optional
from sqlalchemy.sql import func

from auth.dependencies import get_current_user, get_db
from user.models import User as UserModel
from .models import Ticket, TicketPriority, TicketStatus
from .schemas import TicketCreate, TicketResponse, TicketUpdate, TicketListResponse

router = APIRouter(prefix="/tickets", tags=["Tickets"])


# Optional background task example for later on
def some_post_task(ticket_id: int):
    # Example: send email, notifications, etc.
    print(f"Background task executed for ticket {ticket_id}")


# ====================== CREATE TICKET (AI Agent + Staff) ======================
@router.post("/", response_model=TicketResponse, status_code=status.HTTP_201_CREATED)
def create_ticket(
    ticket_in: TicketCreate,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_user)
):
    ticket = Ticket(
        client_profile_id=ticket_in.client_profile_id,
        created_by_user_id=current_user.id if not ticket_in.ai_created else None,
        customer_name=ticket_in.customer_name,
        customer_email=ticket_in.customer_email,
        customer_phone=ticket_in.customer_phone,
        subject=ticket_in.subject,
        description=ticket_in.description,
        category=ticket_in.category,
        priority=ticket_in.priority,
        status=ticket_in.status or TicketStatus.open,
        ai_confidence=ticket_in.ai_confidence,
        agent_notes=ticket_in.agent_notes,
        assigned_to_user_id=ticket_in.assigned_to_user_id
    )
    db.add(ticket)
    db.commit()
    db.refresh(ticket)

    return ticket



# ====================== GET ALL TICKETS (Staff Dashboard) ======================
@router.get("/", response_model=List[TicketListResponse])
def get_tickets(
    status: Optional[TicketStatus] = None,
    priority: Optional[TicketPriority] = None,
    assigned_to_me: bool = False,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_user)
):
    query = db.query(Ticket)

    if status:
        query = query.filter(Ticket.status == status)
    if priority:
        query = query.filter(Ticket.priority == priority)
    if assigned_to_me:
        query = query.filter(Ticket.assigned_to_user_id == current_user.id)

    tickets = query.order_by(Ticket.created_at.desc()).all()
    return tickets


# ====================== GET SINGLE TICKET ======================
@router.get("/{ticket_id}", response_model=TicketResponse)
def get_ticket(
    ticket_id: int,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_user)
):
    ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    return ticket


# ====================== UPDATE TICKET (Staff + AI Tool) ======================
@router.patch("/{ticket_id}", response_model=TicketResponse)
def update_ticket(
    ticket_id: int,
    update_data: TicketUpdate,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_user)
):
    ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")

    update_dict = update_data.dict(exclude_unset=True)
    for key, value in update_dict.items():
        if hasattr(ticket, key):
            setattr(ticket, key, value)

    # Auto-update resolved_at when status → resolved/closed
    if update_data.status in [TicketStatus.resolved, TicketStatus.closed]:
        ticket.resolved_at = func.now()

    db.commit()
    db.refresh(ticket)
    return ticket


# ====================== DELETE TICKET (Admin only later) ======================
@router.delete("/{ticket_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_ticket(
    ticket_id: int,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_user)
):
    ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    db.delete(ticket)
    db.commit()
    return None
