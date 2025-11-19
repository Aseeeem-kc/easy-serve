
from sqlalchemy import (
    Column, Integer, String, Text, DateTime, Enum, ForeignKey, Boolean
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from auth.database import Base
import enum


# Priority levels
class TicketPriority(enum.Enum):
    low = "low"
    medium = "medium"
    high = "high"
    urgent = "urgent"


# Status of the ticket
class TicketStatus(enum.Enum):
    open = "open"
    in_progress = "in_progress"
    waiting_on_customer = "waiting_on_customer"
    resolved = "resolved"
    closed = "closed"


class Ticket(Base):
    __tablename__ = "tickets"

    id = Column(Integer, primary_key=True, index=True)
    
    # Foreign key to client (business)
    client_profile_id = Column(Integer, ForeignKey("client_profiles.id"), nullable=False, index=True)
    
    # Optional: link to user if created manually by staff
    created_by_user_id = Column(Integer, ForeignKey("users.id"), nullable=True)

    # Customer info
    customer_name = Column(String(100), nullable=True)
    customer_email = Column(String(255), nullable=False)
    customer_phone = Column(String(50), nullable=True)

    # Ticket content
    subject = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    
    # Category (for routing/filtering)
    category = Column(String(100), default="general")  # e.g., refund, technical, billing

    # Status & Priority
    status = Column(Enum(TicketStatus), default=TicketStatus.open, nullable=False)
    priority = Column(Enum(TicketPriority), default=TicketPriority.medium, nullable=False)

    # AI confidence (when created/escalated by agent)
    ai_confidence = Column(Integer, nullable=True)  # 0–100

    # Assignment
    assigned_to_user_id = Column(Integer, ForeignKey("users.id"), nullable=True)  # staff member

    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    resolved_at = Column(DateTime(timezone=True), nullable=True)

    # Relationships
    client_profile = relationship("ClientProfile", back_populates="tickets")
    created_by = relationship("User", foreign_keys=[created_by_user_id])
    assigned_to = relationship("User", foreign_keys=[assigned_to_user_id])

    # Optional: store conversation thread or agent decision log
    agent_notes = Column(Text, nullable=True)  # e.g., "Escalated due to anger + policy violation"

