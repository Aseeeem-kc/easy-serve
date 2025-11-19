# backend/tickets/schemas.py
from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime
from .models import TicketPriority, TicketStatus  


class TicketCreate(BaseModel):
    client_profile_id: int = Field(..., description="ID of the business (client_profile)")
    customer_name: Optional[str] = None
    customer_email: EmailStr = Field(..., description="Customer email")
    customer_phone: Optional[str] = None
    subject: str = Field(..., max_length=255)
    description: str
    category: str = Field("general", max_length=100)
    priority: TicketPriority = Field(TicketPriority.medium)
    status: Optional[TicketStatus] = None
    ai_confidence: Optional[int] = Field(None, ge=0, le=100, description="AI confidence 0–100")
    agent_notes: Optional[str] = None
    assigned_to_user_id: Optional[int] = None
    ai_created: bool = Field(False, description="True when created by AI agent")


class TicketUpdate(BaseModel):
    status: Optional[TicketStatus] = None
    priority: Optional[TicketPriority] = None
    assigned_to_user_id: Optional[int] = None
    agent_notes: Optional[str] = None


class TicketListResponse(BaseModel):
    id: int
    subject: str
    str
    customer_email: EmailStr
    status: TicketStatus
    priority: TicketPriority
    category: str
    created_at: datetime
    assigned_to_user_id: Optional[int] = None

    class Config:
        from_attributes = True


class TicketResponse(TicketListResponse):
    customer_name: Optional[str] = None
    customer_phone: Optional[str] = None
    description: str
    ai_confidence: Optional[int] = None
    agent_notes: Optional[str] = None
    resolved_at: Optional[datetime] = None

    class Config:
        from_attributes = True