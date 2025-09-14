# Convenience Makefile for backend operational tasks
# Usage (Linux/macOS): make <target>
# On Windows with PowerShell, install `make` or run the commands manually.

.PHONY: help migrate upgrade-head rotate-admin-password run-backend

help:
	@echo "Available targets:"
	@echo "  migrate                - Create a new autogenerate migration (MSG=message)"
	@echo "  upgrade-head           - Apply latest migrations"
	@echo "  rotate-admin-password  - Rotate admin password (requires ADMIN_EMAIL env var)"
	@echo "  run-backend            - Run FastAPI dev server (uvicorn)"

migrate:
	@if [ -z "$$MSG" ]; then echo "Set MSG=your_message"; exit 1; fi
	alembic revision --autogenerate -m "$$MSG"

upgrade-head:
	alembic upgrade head

rotate-admin-password:
	python -m src.cli.rotate_admin_password

run-backend:
	uvicorn src.main:app --reload --port 5000
