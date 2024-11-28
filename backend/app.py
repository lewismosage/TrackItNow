from flask import Flask, jsonify
from flask_migrate import Migrate
from flask_cors import CORS, cross_origin
from database import db
from routes.customers import customers_bp
from routes.invoices import invoices_bp
from routes.suppliers import suppliers_bp
from routes.locations import locations_bp
from routes.inventory import inventory_bp
from routes.orders import orders_bp
from routes.warehouses import warehouses_bp
from flask_jwt_extended import JWTManager
from datetime import timedelta
from auth import auth_bp, jwt
from models.user import User
from models.order import Order, OrderItem
from models.warehouse import Warehouse
import os

app = Flask(__name__)

# More specific CORS configuration
cors = CORS(app, resources={
    r"/api/*": {
        "origins": [
            "http://localhost:3000",  # Local development
            "https://inventory-management-frontend.onrender.com"  # Update this with your actual Render frontend domain
        ],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

# Database configuration
DATABASE_URL = os.environ.get('DATABASE_URL')
if DATABASE_URL and DATABASE_URL.startswith('postgres://'):
    DATABASE_URL = DATABASE_URL.replace('postgres://', 'postgresql://')

app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL or 'sqlite:///inventory.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'your-secret-key'  # Change this to a secure secret
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)
app.config['JWT_REFRESH_TOKEN_EXPIRES'] = timedelta(days=30)

# Initialize extensions
db.init_app(app)
migrate = Migrate(app, db)
jwt.init_app(app)

# Add after db.init_app(app)
# with app.app_context():
#     db.create_all()
#     print("Database tables created!")

# Register ALL blueprints
app.register_blueprint(customers_bp)
app.register_blueprint(invoices_bp)
app.register_blueprint(suppliers_bp)
app.register_blueprint(locations_bp)
app.register_blueprint(inventory_bp)
app.register_blueprint(orders_bp)
app.register_blueprint(warehouses_bp)
app.register_blueprint(auth_bp)

# Import models so they are known to Flask-Migrate
from models.customer import Customer
from models.invoice import Invoice, InvoiceItem
from models.supplier import Supplier
from models.inventory import Inventory
from models.order import Order

@app.route('/api/test')
def test_route():
    return jsonify({"message": "API is working"}), 200

@app.route('/api/debug/db-test')
def test_db():
    try:
        # Test database connection
        item_count = Inventory.query.count()
        return jsonify({
            "status": "success",
            "message": "Database connection successful",
            "item_count": item_count
        })
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

@app.route('/api/debug/orders-test')
def test_orders():
    try:
        # Test database connection and orders table
        order_count = Order.query.count()
        return jsonify({
            "status": "success",
            "message": "Orders database connection successful",
            "order_count": order_count
        })
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

@app.route('/api/orders', methods=['GET'])
def get_orders():
    orders = Order.query.all()
    return jsonify([order.to_dict() for order in orders])

@app.route('/inventory', methods=['GET'])
@cross_origin()
def get_inventory():
    try:
        # Sample data structure
        inventory_items = [
            {
                'id': 'INV-001',
                'name': 'Product 1',
                'quantity': 100,
                'location': 'Warehouse A',
                'category': 'Electronics',
                'status': 'In Stock'
            }
        ]
        return jsonify(inventory_items)
    except Exception as e:
        print(f"Error in get_inventory: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    print("Registered Blueprints:")
    for blueprint in app.blueprints:
        print(f"- {blueprint}")
        rules = [rule for rule in app.url_map.iter_rules() if rule.endpoint.startswith(blueprint)]
        for rule in rules:
            print(f"  * {rule}")
    app.run(debug=True) 