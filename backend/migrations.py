from flask.cli import FlaskGroup
from app import app, db
from models.user import User
from models.inventory import Inventory
from models.order import Order, OrderItem
from models.customer import Customer
from models.warehouse import Warehouse

cli = FlaskGroup(app)

@cli.command("reset_db")
def reset_db():
    """Drops and recreates all tables"""
    db.drop_all()
    db.create_all()
    print("Database tables reset successfully!")

if __name__ == "__main__":
    cli() 