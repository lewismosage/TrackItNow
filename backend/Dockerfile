FROM python:3.9-slim

WORKDIR /app/backend

COPY . .

RUN pip install --no-cache-dir -r requirements.txt

CMD gunicorn app:app --bind 0.0.0.0:$PORT
