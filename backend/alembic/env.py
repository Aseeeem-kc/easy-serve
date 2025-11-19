from logging.config import fileConfig
from sqlalchemy import engine_from_config, pool, create_engine
from alembic import context
import os
from dotenv import load_dotenv


load_dotenv()

from auth.database import Base  # SQLAlchemy Base
from user.models import ClientProfile, KnowledgeDocument, User
from tms.models import Ticket, TicketPriority, TicketStatus

DB_USER = os.getenv("DB_USER", "ashim")
DB_PASSWORD = os.getenv("DB_PASSWORD", "2024")
DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = os.getenv("DB_PORT", "5432")
DB_NAME = os.getenv("DB_NAME", "easy-serve-auth")

SQLALCHEMY_DATABASE_URL = f"postgresql+psycopg2://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
# ---------

config = context.config
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# CRITICAL: This tells Alembic what tables exist
target_metadata = Base.metadata

def run_migrations_offline() -> None:
    url = SQLALCHEMY_DATABASE_URL
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )
    with context.begin_transaction():
        context.run_migrations()

def run_migrations_online() -> None:
    connectable = create_engine(SQLALCHEMY_DATABASE_URL, poolclass=pool.NullPool)
    with connectable.connect() as connection:
        context.configure(connection=connection, target_metadata=target_metadata)
        with context.begin_transaction():
            context.run_migrations()

if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()