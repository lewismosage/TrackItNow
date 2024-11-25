from flask_sqlalchemy import SQLAlchemy
import os

db = SQLAlchemy()

def init_db(app):
    # Get the absolute path to the database file
    basedir = os.path.abspath(os.path.dirname(__file__))
    database_path = os.path.join(basedir, 'inventory.db')
    
    # Print the database path for debugging
    print(f"Database path: {database_path}")
    
    # Configure the database URI
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{database_path}'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    # Initialize the database
    db.init_app(app)
    
    # Create tables
    with app.app_context():
        db.create_all()
        print("Database tables created successfully!") 