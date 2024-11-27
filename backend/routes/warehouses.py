from flask import Blueprint, request, jsonify
from models.warehouse import Warehouse
from database import db

warehouses_bp = Blueprint('warehouses', __name__)

@warehouses_bp.route('/api/warehouses', methods=['GET', 'POST', 'OPTIONS'])
def warehouses():
    if request.method == 'OPTIONS':
        return '', 200
        
    if request.method == 'GET':
        try:
            warehouses = Warehouse.query.all()
            return jsonify([warehouse.to_dict() for warehouse in warehouses]), 200
        except Exception as e:
            print(f"Error fetching warehouses: {str(e)}")
            return jsonify({'error': str(e)}), 500
            
    if request.method == 'POST':
        try:
            data = request.json
            
            # Generate warehouse ID (WH-XXX format)
            count = Warehouse.query.count()
            warehouse_id = f'WH-{str(count + 1).zfill(3)}'
            
            new_warehouse = Warehouse(
                id=warehouse_id,
                name=data['name'],
                location=data['location'],
                capacity=data['capacity'],
                manager=data['manager'],
                zones=data['zones'],
                status=data.get('status', 'active'),
                used_space=data.get('usedSpace', 0),
                item_count=data.get('itemCount', 0)
            )
            
            db.session.add(new_warehouse)
            db.session.commit()
            
            return jsonify(new_warehouse.to_dict()), 201
        except Exception as e:
            db.session.rollback()
            print(f"Error creating warehouse: {str(e)}")
            return jsonify({'error': str(e)}), 400

@warehouses_bp.route('/api/warehouses/<string:warehouse_id>', methods=['PUT', 'DELETE', 'OPTIONS'])
def warehouse_operations(warehouse_id):
    if request.method == 'OPTIONS':
        return '', 200
        
    if request.method == 'PUT':
        try:
            warehouse = Warehouse.query.get_or_404(warehouse_id)
            data = request.json
            
            warehouse.name = data.get('name', warehouse.name)
            warehouse.location = data.get('location', warehouse.location)
            warehouse.capacity = data.get('capacity', warehouse.capacity)
            warehouse.manager = data.get('manager', warehouse.manager)
            warehouse.zones = data.get('zones', warehouse.zones)
            warehouse.status = data.get('status', warehouse.status)
            warehouse.used_space = data.get('usedSpace', warehouse.used_space)
            warehouse.item_count = data.get('itemCount', warehouse.item_count)
            
            db.session.commit()
            return jsonify(warehouse.to_dict()), 200
        except Exception as e:
            db.session.rollback()
            print(f"Error updating warehouse: {str(e)}")
            return jsonify({'error': str(e)}), 400
            
    if request.method == 'DELETE':
        try:
            warehouse = Warehouse.query.get_or_404(warehouse_id)
            db.session.delete(warehouse)
            db.session.commit()
            return jsonify({'message': 'Warehouse deleted successfully'}), 200
        except Exception as e:
            db.session.rollback()
            print(f"Error deleting warehouse: {str(e)}")
            return jsonify({'error': str(e)}), 400 