from app import app
from database import db
from models.inventory import Inventory
from models.order import Order, OrderItem
from models.user import User

def seed_database():
    with app.app_context():
        # Clear existing data
        Inventory.query.delete()
        
        # Create test inventory items
        test_items = [
            Inventory(
                name="Laptop",
                category="Electronics",
                location="Nairobi",
                quantity=10,
                price=999.99,
                minimum_stock=2,
                description="High-performance laptop",
                unit="piece"
            ),
            Inventory(
                name="Office Chair",
                category="Furniture",
                location="Dubai",
                quantity=20,
                price=199.99,
                minimum_stock=5,
                description="Ergonomic office chair",
                unit="piece"
            ),
            Inventory(
                name="Printer Paper",
                category="Supplies",
                location="London",
                quantity=100,
                price=9.99,
                minimum_stock=20,
                description="A4 printer paper",
                unit="ream"
            )
        ]
        
        # Add items to database
        for item in test_items:
            db.session.add(item)
        
        # Commit changes
        db.session.commit()
        print("Test data has been added to the database!")

def seed_orders():
    with app.app_context():
        # Clear existing orders
        Order.query.delete()
        
        # Create test orders
        test_orders = [
            Order(
                id="#ORD12345",
                customer="John Doe",
                location="Nairobi",
                status="pending",
                total=1299.99,
                items=[
                    OrderItem(
                        name="Laptop",
                        quantity=1,
                        price=999.99
                    ),
                    OrderItem(
                        name="Mouse",
                        quantity=2,
                        price=150.00
                    )
                ]
            ),
            Order(
                id="#ORD12346",
                customer="Jane Smith",
                location="Dubai",
                status="completed",
                total=599.99,
                items=[
                    OrderItem(
                        name="Office Chair",
                        quantity=3,
                        price=199.99
                    )
                ]
            )
        ]
        
        # Add orders to database
        for order in test_orders:
            db.session.add(order)
        
        # Commit changes
        db.session.commit()
        print("Test orders have been added to the database!")

def seed_users():
    with app.app_context():
        # Clear existing users
        User.query.delete()
        
        # Create test users
        test_users = [
            User(
                username="admin",
                email="admin@example.com",
                first_name="Admin",
                last_name="User"
            ),
            User(
                username="test",
                email="test@example.com",
                first_name="Test",
                last_name="User"
            )
        ]
        
        # Set passwords
        test_users[0].set_password("admin123")
        test_users[1].set_password("test123")
        
        # Add users to database
        for user in test_users:
            db.session.add(user)
        
        db.session.commit()
        print("Test users have been added to the database!")

if __name__ == "__main__":
    seed_database()
    seed_orders()
    seed_users() 