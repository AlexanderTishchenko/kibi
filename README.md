# Kibi Monorepo

## Getting Started

Prerequisites:
- Docker & Docker Compose
- Node.js (v20+) & npm

1. Clone the repository:

   ```bash
   git clone <repo-url> kibi
   cd kibi
   ```

2. Copy environment template and set variables:

   ```bash
   cp .env.example .env
   # Fill in SUPABASE_URL, SUPABASE_ANON_KEY, SERVICE_ROLE_KEY, DATABASE_URL, STRIPE_SECRET_KEY, MAKE_WEBHOOK_TOKEN, OPENAI_API_KEY, RESEND_API_KEY
   ```

3. Build and start services:

   ```bash
   make dev
   ```

4. When the database is ready, apply migrations:

   ```bash
   make db_migrate
   ```

5. Open the dashboard:

   - Frontend: http://localhost:3000
   - API:     http://localhost:8000

## Dev Scripts

| Command       | Description                                      |
|---------------|--------------------------------------------------|
| `make dev`    | Start all services via Docker Compose            |
| `make lint`   | Run frontend (ESLint) and backend (flake8) linters |
| `make test`   | Run frontend (Playwright) and backend (pytest) tests |
| `make db_migrate` | Apply SQL migrations                          |
