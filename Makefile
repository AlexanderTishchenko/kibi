.PHONY: dev lint test db_migrate

dev:
	@docker compose up --build

lint:
	pnpm --filter apps/web lint
	flake8 apps/api

test:
	pnpm --filter apps/web test
	pytest apps/api

# Apply database migrations via Alembic
db_migrate:
	@docker compose run --rm api alembic upgrade head
