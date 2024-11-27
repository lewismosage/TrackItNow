from flask import Blueprint, request, jsonify
from models.inventory import Inventory
from database import db

inventory_bp = Blueprint('inventory', __name__)

@inventory_bp.route('/api/inventory', methods=['GET'])
def get_inventory():
    try:
        print("Accessing inventory GET endpoint")
        inventory_items = Inventory.query.all()
        print(f"Found {len(inventory_items)} items")
        return jsonify([item.to_dict() for item in inventory_items]), 200
    except Exception as e:
        print(f"Error fetching inventory: {str(e)}")
        return jsonify({'error': str(e)}), 500

@inventory_bp.route('/api/inventory', methods=['POST'])
def add_inventory_item():
    try:
        data = request.json
        new_item = Inventory(
            name=data['name'],
            category=data['category'],
            location=data['location'],
            quantity=int(data['quantity']),
            price=float(data['price']),
            minimum_stock=int(data['minimumStock']),
            description=data.get('description', ''),
            unit=data['unit']
        )
        
        db.session.add(new_item)
        db.session.commit()
        
        return jsonify(new_item.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        print(f"Error adding inventory item: {str(e)}")
        return jsonify({'error': str(e)}), 400

@inventory_bp.route('/api/inventory/<int:item_id>', methods=['PUT'])
def update_inventory_item(item_id):
    try:
        item = Inventory.query.get_or_404(item_id)
        data = request.json
        
        item.name = data.get('name', item.name)
        item.category = data.get('category', item.category)
        item.location = data.get('location', item.location)
        item.quantity = int(data.get('quantity', item.quantity))
        item.price = float(data.get('price', item.price))
        item.minimum_stock = int(data.get('minimumStock', item.minimum_stock))
        item.description = data.get('description', item.description)
        item.unit = data.get('unit', item.unit)
        
        db.session.commit()
        return jsonify(item.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        print(f"Error updating inventory item: {str(e)}")
        return jsonify({'error': str(e)}), 400

@inventory_bp.route('/api/inventory/<int:item_id>', methods=['DELETE'])
def delete_inventory_item(item_id):
    try:
        item = Inventory.query.get_or_404(item_id)
        db.session.delete(item)
        db.session.commit()
        return jsonify({'message': 'Item deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        print(f"Error deleting inventory item: {str(e)}")
        return jsonify({'error': str(e)}), 400

@inventory_bp.route('/api/inventory/categories', methods=['GET'])
def get_categories():
    try:
        categories = db.session.query(Inventory.category).distinct().all()
        return jsonify([category[0] for category in categories]), 200
    except Exception as e:
        print(f"Error fetching categories: {str(e)}")
        return jsonify({'error': str(e)}), 500 