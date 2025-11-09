from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from auth.dependencies import get_current_user, get_db
from user.models import User as UserModel
from user.models import ClientProfile
from user.schemas import ClientProfileResponse, ClientProfileUpdate
from datetime import datetime

router = APIRouter(tags=["Client Profile"])

@router.get("/profile", response_model=ClientProfileResponse)
def get_client_profile(
    current_user: UserModel = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    profile = db.query(ClientProfile).filter(ClientProfile.user_id == current_user.id).first()
    if not profile:
        raise HTTPException(
            status_code=404,
            detail="Profile not found. Complete onboarding first."
        )
    return profile

@router.patch("/edit", response_model=ClientProfileResponse)
def update_client_profile(
    update_data: ClientProfileUpdate,
    current_user: UserModel = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    profile = db.query(ClientProfile).filter(ClientProfile.user_id == current_user.id).first()
    if not profile:
        raise HTTPException(
            status_code=404,
            detail="Profile not found. Complete onboarding first."
        )

    # Update only provided fields
    update_dict = update_data.model_dump(exclude_unset=True)
    for key, value in update_dict.items():
        if key == "website_url" and value is not None:
            setattr(profile, key, str(value))  # Convert HttpUrl  to -> str
        else:
            setattr(profile, key, value)

    # Auto-update timestamp
    profile.updated_at = datetime.utcnow()

    db.commit()
    db.refresh(profile)
    return profile
