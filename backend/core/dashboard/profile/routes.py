from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from auth.dependencies import get_current_user, get_db
from user.models import User as UserModel
from user.models import ClientProfile
from user.schemas import ClientProfileResponse

router = APIRouter(tags=["Client Profile"])

@router.get("/", response_model=ClientProfileResponse)
def get_client_profile(
    current_user: UserModel = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    profile = db.query(ClientProfile).filter(ClientProfile.user_id == current_user.id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found. Complete onboarding first.")
    return profile