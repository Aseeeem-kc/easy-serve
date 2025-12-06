# backend/tests/conftest.py
import sys
from pathlib import Path
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Add project root to sys.path
BASE_DIR = Path(__file__).resolve().parent.parent
sys.path.append(str(BASE_DIR))

# Import app and DB
from main import app
from auth.database import Base, get_db, engine as prod_engine
from auth import models  # ensure all models are imported

# Import helpers
# from auth.models import UserModel, ClientProfile
from user.models import User as UserModel, ClientProfile
from auth.utils import get_password_hash, verify_password

# ----------------------------
# TEST DATABASE (SQLite)
# ----------------------------
SQLALCHEMY_TEST_DATABASE_URL = "sqlite:///./test.db"

# SQLite needs connect_args
engine = create_engine(
    SQLALCHEMY_TEST_DATABASE_URL,
    connect_args={"check_same_thread": False},
)

TestingSessionLocal = sessionmaker(
    autocommit=False, autoflush=False, bind=engine
)

# ----------------------------
# DB FIXTURES
# ----------------------------
@pytest.fixture(scope="session")
def db_engine():
    # Drop all tables just in case
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    yield engine
    Base.metadata.drop_all(bind=engine)

@pytest.fixture
def db(db_engine):
    connection = db_engine.connect()
    transaction = connection.begin()
    session = TestingSessionLocal(bind=connection)
    try:
        yield session
    finally:
        session.close()
        transaction.rollback()
        connection.close()

# ----------------------------
# CLIENT FIXTURE
# ----------------------------
@pytest.fixture
def client(db):
    def override_get_db():
        try:
            yield db
        finally:
            pass

    app.dependency_overrides[get_db] = override_get_db

    with TestClient(app) as c:
        yield c

    app.dependency_overrides.clear()

# ----------------------------
# AUTH TOKEN FIXTURE
# ----------------------------
@pytest.fixture
def auth_token(client, db):
    """
    Create a test user directly in DB and login to get access token
    """
    # 1. Insert test user
    test_user_email = "test@easy.com"
    test_password = "test123456"  # must satisfy UserCreate schema (min 8 chars)

    # In your auth_token fixture, after creating the user
    hashed = get_password_hash(test_password)
    print("\n=== DEBUG HASHING ===")
    print("Plain password:", test_password)
    print("Generated hash :", hashed)
    print("Verify back     :", verify_password(test_password, hashed))  
    print("====================\n")
    user = UserModel(
        username="testbiz",
        company_name="Test Biz",
        location="Kathmandu",
        email=test_user_email,
        phone_number="9800000000",
        hashed_password=get_password_hash(test_password),
        is_active=True,  # active so login works
    )
    db.add(user)
    db.commit()

    # 2. Create empty profile for onboarding
    profile = ClientProfile(
        user_id=user.id,
        industry="Unknown",
        company_size=None,
        website_url=None,
        primary_usecase=None,
        business_goals=None,
        timezone="Asia/Kathmandu",
        language="en",
        knowledge_base_status="pending",
        documents_uploaded_count=0,
        kb_processing_status="idle",
        subscription_plan="basic",
        is_onboarded=False
    )
    db.add(profile)
    db.commit()

    # 3. Login to get token
    response = client.post(
        "/api/auth/token",
        json={"email": test_user_email, "password": test_password}
    )
    assert response.status_code == 200, f"Login failed: {response.text}"
    return response.json()["access_token"]
