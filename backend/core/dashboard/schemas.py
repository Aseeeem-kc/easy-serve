
from pydantic import BaseModel
from typing import List

class RecentTicket(BaseModel):
    id: str
    title: str
    priority: str
    time: str

class TeamMember(BaseModel):
    name: str
    tickets: int
    satisfaction: float

class DashboardResponse(BaseModel):
    active_tickets: int
    ai_resolution_rate: float
    avg_response_time: float
    customer_satisfaction: float
    sentiment_positive: int
    sentiment_neutral: int
    sentiment_negative: int
    ai_handled: int
    human_handled: int
    recent_tickets: List[RecentTicket]
    team_performance: List[TeamMember]