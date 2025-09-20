from pydantic import BaseModel
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime, timedelta
from .database import Base

class Token(BaseModel):
    access_token: str
    refresh_token: str  
    token_type: str = "bearer"
    username: str

    class Config:
        from_attributes = True


class TokenData(BaseModel):
    username: str | None = None



class RefreshToken(Base):
    __tablename__ = "refresh_tokens"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    token = Column(String, unique=True, nullable=False, index=True)
    expires_at = Column(DateTime, nullable=False)
    revoked = Column(Boolean, default=False)

    user = relationship("User", back_populates="refresh_tokens")

    def is_expired(self):
        return datetime.utcnow() > self.expires_at
