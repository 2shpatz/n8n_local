# Landing Page Dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install dependencies
RUN pip install --no-cache-dir flask gunicorn

# Copy the application code
COPY docker/landing-page/app.py .
COPY landing_page/ ./landing_page/

# Expose port
EXPOSE 8080

# Run with gunicorn for production
CMD ["gunicorn", "--bind", "0.0.0.0:8080", "--workers", "2", "app:app"]
