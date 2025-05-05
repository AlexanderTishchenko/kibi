# Kibi Monorepo

## Overview
Kibi is your personal automation hub for browsing, configuring, and executing pre-built workflows using in-app credits. It showcases a full-stack credit-driven platform, featuring secure user management, real-time UI updates, and seamless payment integration.

## Main Features
- **Workflow Library**: Browse curated automations by category, popularity, and time saved.
- **Install & Configure**: Install workflows to your dashboard and customize parameters through a form.
- **Credit-Based Execution**: Deduct credits atomically on each run with backend validation.
- **Credit Management**:
  - **View Balance**: Real-time display of your current credits.
  - **Purchase Credits**: Stripe-powered checkout to top up credits.
  - **History & Validation**: Prevent overspend and log each deduction.
- **Authentication & Profiles**: Email/password signup and login using Supabase; manage user profiles via API routes.
- **Notifications & UX**: Toast notifications for feedback, responsive UI with Shadcn/UI and Lucide icons.

## Tech Stack
- **Frontend**:
  - Next.js 14 (App Router, Server Actions)
  - React 18 + TypeScript
  - TanStack React Query for data fetching and cache invalidation
  - React Hook Form for form management and validation
  - Tailwind CSS, Shadcn/UI components, Lucide icons
- **Backend**:
  - Supabase Auth (GoTrue) for authentication and session management
  - FastAPI (Python 3.10) microservices
  - SQLAlchemy + PostgreSQL for user credits, automation runs, and history
  - Stripe integration for payments
- **Dev & Deployment**:
  - Docker Compose for local development
  - Makefile scripts for common tasks (dev, migrations, lint, test)
  - Environment variables for configuring Supabase, Stripe, OpenAI, and Resend API

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
   # Fill in SUPABASE_URL, SUPABASE_ANON_KEY, SERVICE_ROLE_KEY, DATABASE_URL, STRIPE_SECRET_KEY, STRIPE_PUBLISHABLE_KEY, MAKE_WEBHOOK_TOKEN, OPENAI_API_KEY, RESEND_API_KEY
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
