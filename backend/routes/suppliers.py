from flask import Blueprint, request, jsonify
from models.supplier import Supplier
from database import db
from datetime import datetime

suppliers_bp = Blueprint('suppliers', __name__)

@suppliers_bp.route('/api/suppliers', methods=['GET', 'POST', 'OPTIONS'])
def suppliers():
    if request.method == 'OPTIONS':
        return '', 200
        
    if request.method == 'GET':
        try:
            suppliers = Supplier.query.all()
            return jsonify([supplier.to_dict() for supplier in suppliers]), 200
        except Exception as e:
            print(f"Error fetching suppliers: {str(e)}")
            return jsonify({'error': str(e)}), 500
            
    if request.method == 'POST':
        try:
            data = request.json
            
            # Check if email already exists
            existing_supplier = Supplier.query.filter_by(email=data['email']).first()
            if existing_supplier:
                return jsonify({
                    'error': 'A supplier with this email already exists',
                    'field': 'email'
                }), 400
            
            # Generate supplier ID (SUP-XXX format)
            count = Supplier.query.count()
            supplier_id = f'SUP-{str(count + 1).zfill(3)}'
            
            new_supplier = Supplier(
                id=supplier_id,
                name=data['name'],
                contact=data['contact'],
                email=data['email'],
                phone=data['phone'],
                address=data['address'],
                status=data.get('status', 'active'),
                rating=data.get('rating', 0.0),
                total_orders=data.get('totalOrders', 0),
                last_order=datetime.utcnow()
            )
            
            db.session.add(new_supplier)
            db.session.commit()
            
            return jsonify(new_supplier.to_dict()), 201
        except Exception as e:
            db.session.rollback()
            if 'UNIQUE constraint' in str(e) and 'email' in str(e):
                return jsonify({
                    'error': 'A supplier with this email already exists',
                    'field': 'email'
                }), 400
            print(f"Error creating supplier: {str(e)}")
            return jsonify({'error': str(e)}), 400

@suppliers_bp.route('/api/suppliers/<string:supplier_id>', methods=['PUT', 'DELETE', 'OPTIONS'])
def supplier_operations(supplier_id):
    if request.method == 'OPTIONS':
        return '', 200
        
    if request.method == 'PUT':
        try:
            supplier = Supplier.query.get_or_404(supplier_id)
            data = request.json
            
            supplier.name = data.get('name', supplier.name)
            supplier.contact = data.get('contact', supplier.contact)
            supplier.email = data.get('email', supplier.email)
            supplier.phone = data.get('phone', supplier.phone)
            supplier.address = data.get('address', supplier.address)
            supplier.status = data.get('status', supplier.status)
            supplier.rating = data.get('rating', supplier.rating)
            supplier.total_orders = data.get('totalOrders', supplier.total_orders)
            
            db.session.commit()
            return jsonify(supplier.to_dict()), 200
        except Exception as e:
            db.session.rollback()
            print(f"Error updating supplier: {str(e)}")
            return jsonify({'error': str(e)}), 400
            
    if request.method == 'DELETE':
        try:
            supplier = Supplier.query.get_or_404(supplier_id)
            db.session.delete(supplier)
            db.session.commit()
            return jsonify({'message': 'Supplier deleted successfully'}), 200
        except Exception as e:
            db.session.rollback()
            print(f"Error deleting supplier: {str(e)}")
            return jsonify({'error': str(e)}), 400 