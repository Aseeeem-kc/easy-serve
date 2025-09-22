from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from auth.routes import router as auth_router
from user.routes import router as users_router
# from notes.routes import router as notes_router
# from template_prompts.routes import router as template_prompts_router

app = FastAPI()

# Configure CORS
origins = [
    "http://localhost:5173",  # React frontend
    "http://127.0.0.1:5173", 
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],        # Allows all methods
    allow_headers=["*"],        # Allows all headers
)

app.include_router(auth_router, prefix="/api/auth", tags=["auth"])
app.include_router(users_router, prefix="/api/users", tags=["users"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the Easy Serve API"}


@app.get("/healthz")
async def health_check():
    return {"status": "ok"}