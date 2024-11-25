from flask import Flask, jsonify
from flask_migrate import Migrate
from flask_cors import CORS
from database import db
from routes.customers import customers_bp
from routes.invoices import invoices_bp
from routes.suppliers import suppliers_bp
from routes.locations import locations_bp
from routes.inventory import inventory_bp
from routes.orders import orders_bp
from routes.warehouses import warehouses_bp

app = Flask(__name__)
CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:3000"],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type"],
        "supports_credentials": True
    }
})

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///inventory.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize extensions
db.init_app(app)
migrate = Migrate(app, db)

# Add after db.init_app(app)
with app.app_context():
    db.create_all()
    print("Database tables created!")

# Register ALL blueprints
app.register_blueprint(customers_bp)
app.register_blueprint(invoices_bp)
app.register_blueprint(suppliers_bp)
app.register_blueprint(locations_bp)
app.register_blueprint(inventory_bp)
app.register_blueprint(orders_bp)
app.register_blueprint(warehouses_bp)

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

if __name__ == '__main__':
    print("Registered Blueprints:")
    for blueprint in app.blueprints:
        print(f"- {blueprint}")
        rules = [rule for rule in app.url_map.iter_rules() if rule.endpoint.startswith(blueprint)]
        for rule in rules:
            print(f"  * {rule}")
    app.run(debug=True) 