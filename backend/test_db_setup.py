from app import app
from models.inventory import Inventory
from models.order import Order
from models.user import User

def test_setup():
    with app.app_context():
        print("\nChecking database tables:")
        print(f"Inventory items: {Inventory.query.count()}")
        print(f"Orders: {Order.query.count()}")
        print(f"Users: {User.query.count()}")

if __name__ == "__main__":
    test_setup() 