FROM python:3.9-slim

WORKDIR /app

COPY backend/ /app/

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8080

CMD gunicorn app:app --bind 0.0.0.0:8080
