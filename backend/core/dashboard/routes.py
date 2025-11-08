# backend/dashboard/routes.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from auth.dependencies import get_current_user, get_db
from user.models import User as UserModel
from core.dashboard.schemas import DashboardResponse, RecentTicket, TeamMember

router = APIRouter(tags=["Dashboard"])

# -----------------------------
# STATIC DATA FOR DEMO PURPOSES
# -----------------------------
STATIC_DATA = DashboardResponse(
    active_tickets=247,
    ai_resolution_rate=84.7,
    avg_response_time=2.3,
    customer_satisfaction=4.7,
    sentiment_positive=68,
    sentiment_neutral=22,
    sentiment_negative=10,
    ai_handled=84,
    human_handled=16,
    recent_tickets=[
        RecentTicket(id="TKT-2025-001", title="Payment processing issue", priority="High", time="2 hours ago"),
        RecentTicket(id="TKT-2025-002", title="Account login problems", priority="Medium", time="4 hours ago"),
        RecentTicket(id="TKT-2025-003", title="Feature request inquiry", priority="Low", time="6 hours ago"),
    ],
    team_performance=[
        TeamMember(name="Sarah Johnson", tickets=47, satisfaction=4.2),
        TeamMember(name="Mike Chen", tickets=35, satisfaction=4.5),
        TeamMember(name="Emma Davis", tickets=28, satisfaction=4.8),
    ],
)

@router.get("/data", response_model=DashboardResponse)
def get_dashboard_data(
    current_user: UserModel = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    # auth === already done by get_current_user) 
    # can later add extra checks here, e.g. profile exists
    # from user.models import ClientProfile
    # profile = db.query(ClientProfile).filter(ClientProfile.user_id == current_user.id).first()
    # if not profile:
    #     raise HTTPException(404, "Onboarding not completed")
    return STATIC_DATA