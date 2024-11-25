from app import app, db
from models.customer import Customer
from datetime import datetime

def test_create_customer():
    with app.app_context():
        # Create a test customer
        test_customer = Customer(
            name="John Doe",
            email="john@example.com",
            phone="123-456-7890",
            join_date=datetime.utcnow(),
            total_orders=0,
            total_spent=0.0,
            status="active"
        )

        # Add to database
        try:
            db.session.add(test_customer)
            db.session.commit()
            print("Test customer created successfully!")

            # Verify by querying
            customer = Customer.query.filter_by(email="john@example.com").first()
            print("\nRetrieved customer from database:")
            print(f"Name: {customer.name}")
            print(f"Email: {customer.email}")
            print(f"Status: {customer.status}")
            
        except Exception as e:
            print(f"Error: {e}")
            db.session.rollback()

if __name__ == "__main__":
    test_create_customer() 