#!/usr/bin/env bash
cd backend
python -m pip install -r requirements.txt
python manage.py create_db 