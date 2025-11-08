# from sqlalchemy import Column, Integer, String, DateTime, func, ForeignKey
# from auth.database import Base 
# from user.models import ClientProfile

# class DashboardMetric(Base):
#     __tablename__ = "dashboard_metrics"

#     id = Column(Integer, primary_key=True, index=True)
#     client_profile_id = Column(Integer, ForeignKey(ClientProfile.id, ondelete="CASCADE"), unique=True, nullable=False)
#     active_tickets = Column(Integer, default=0)
#     ai_resolution_rate = Column(String(10), default="0%")
#     avg_response_time = Column(String(10), default="0m")
#     customer_satisfaction = Column(String(10), default="0")
#     created_at = Column(DateTime, default=func.now())