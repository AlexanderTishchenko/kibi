# Developer Context

## Project Overview
Kibi is a full-stack monorepo built with Next.js for the frontend and FastAPI for the backend. It leverages Docker Compose to orchestrate services and integrates Supabase (database, auth & storage), Stripe payments, Redis caching, OpenAI for AI features, and Resend for transactional emails.

## Architecture
- **API**: Python 3+, FastAPI, Pydantic for settings, SQLAlchemy/Alembic migrations.
- **Web**: Next.js (React), TypeScript, TailwindCSS, Supabase client, middleware for auth.
- **Database**: PostgreSQL managed via Docker.
- **Cache**: Redis.
- **Storage**: Supabase Storage for user avatars (not localStorage).
- **Payments**: Stripe API (secret & publishable keys, webhook handling).
- **Emails**: Resend service.
- **AI**: OpenAI API for generative features.

## Directory Structure
```
kibi/
├── apps/
│   ├── api/            # FastAPI backend
│   └── web/            # Next.js frontend
├── docker-compose.yml  # Service orchestration
├── Makefile            # Dev commands (dev, lint, test, db_migrate)
├── README.md           # Quickstart guide
├── requirements.txt    # Python dependencies
├── package.json        # Frontend dependencies
└── pnpm-lock.yaml      # pnpm lockfile
```

## Main Files & Folders

### Root
- **docker-compose.yml**: defines `postgres`, `redis`, `api`, `web` services.
- **Makefile**: shortcuts for `make dev`, `make lint`, `make test`, `make db_migrate`.
- **README.md**: setup & usage instructions.

### apps/api
- **Dockerfile**: container setup for FastAPI app.
- **app/**: source code:
  - **main.py**: FastAPI app entrypoint.
  - **core/config.py**: environment settings via Pydantic.
  - **db.py**: database session & connection.
  - **api/v1/**: versioned route handlers (e.g., payments).
  - **migrations/**: Alembic migration scripts.
- **alembic.ini**: Alembic configuration.
- **requirements.txt**: Python dependencies.

### apps/web
- **Dockerfile**: container setup for Next.js.
- **app/**: Next.js `app` directory (routes, layouts).
- **components/**: reusable UI components.
- **utils/supabase/**: Supabase client & middleware for auth/storage.
- **styles/** & **tailwind.config.ts**: styling configuration.
- **next.config.js**, **tsconfig.json**: Next.js configuration.

## Getting Started
1. Clone the repo and copy `.env.example` to `.env`.
2. Fill in environment variables: `SUPABASE_*`, `STRIPE_*`, `OPENAI_API_KEY`, `RESEND_API_KEY`, `MAKE_WEBHOOK_TOKEN`.
3. Run `make dev` to start all services.
4. After the database is ready, run `make db_migrate` to apply migrations.
5. Access services:
   - Frontend: `http://localhost:3000`
   - API: `http://localhost:8000`

## Contributing & Documentation
**⚠️ Every code change MUST be accompanied by an update to this `developer_context.md` to keep documentation in sync.**
