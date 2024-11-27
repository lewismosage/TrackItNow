from flask import Blueprint, request, jsonify
from models.customer import Customer
from database import db
from datetime import datetime

customers_bp = Blueprint('customers', __name__)

@customers_bp.route('/api/customers', methods=['GET'])
def get_customers():
    try:
        customers = Customer.query.all()
        return jsonify([customer.to_dict() for customer in customers]), 200
    except Exception as e:
        print(f"Error fetching customers: {str(e)}")
        return jsonify({'error': str(e)}), 500

@customers_bp.route('/api/customers', methods=['POST'])
def create_customer():
    try:
        data = request.json
        print("Received data:", data)  # Debug log
        
        # Validate required fields
        required_fields = ['name', 'email', 'phone']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400

        new_customer = Customer(
            name=data['name'],
            email=data['email'],
            phone=data['phone'],
            status=data.get('status', 'active'),
            join_date=datetime.utcnow(),
            total_orders=0,
            total_spent=0.0
        )
        
        db.session.add(new_customer)
        db.session.commit()
        
        result = new_customer.to_dict()
        print("Created customer:", result)  # Debug log
        return jsonify(result), 201

    except Exception as e:
        db.session.rollback()
        print(f"Error in create_customer: {str(e)}")  # Debug log
        return jsonify({'error': str(e)}), 400

@customers_bp.route('/api/customers/<int:customer_id>', methods=['PUT'])
def update_customer(customer_id):
    try:
        customer = Customer.query.get_or_404(customer_id)
        data = request.json
        
        customer.name = data.get('name', customer.name)
        customer.email = data.get('email', customer.email)
        customer.phone = data.get('phone', customer.phone)
        customer.status = data.get('status', customer.status)
        
        db.session.commit()
        return jsonify(customer.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        print(f"Error updating customer: {str(e)}")
        return jsonify({'error': str(e)}), 400

@customers_bp.route('/api/customers/<int:customer_id>', methods=['DELETE'])
def delete_customer(customer_id):
    try:
        customer = Customer.query.get_or_404(customer_id)
        db.session.delete(customer)
        db.session.commit()
        return jsonify({'message': 'Customer deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        print(f"Error deleting customer: {str(e)}")
        return jsonify({'error': str(e)}), 400