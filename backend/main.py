from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware   

from auth.routes import router as auth_router
from user.routes import router as users_router
from core.dashboard.routes import router as dashboard_router
from core.profile.routes import router as profile_router
from tms.routes import router as ticket_router
from agents.routes.ai_test import router as ai_test_router
from fastapi.staticfiles import  StaticFiles

app = FastAPI()

#  Add SessionMiddleware BEFORE routers
app.add_middleware(
    SessionMiddleware,
    secret_key="super-secret-session-key-CHANGE-THIS"  
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://0.0.0.0:8000/",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/api/auth", tags=["auth"])
app.include_router(users_router, prefix="/api/users", tags=["users"])
app.include_router(dashboard_router, prefix="/api/dashbord", tags=["dashboard"])
app.include_router(profile_router, prefix="/api/profile", tags=["profile"])
app.include_router(ticket_router, prefix="/api", tags=["tickets"])
app.mount("/static", StaticFiles(directory="static"), name = "static")
app.include_router(ai_test_router, prefix="/agents", tags=["ai_test"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the Easy Serve API"}

@app.get("/healthz")
async def health_check():
    return {"status": "ok"}
