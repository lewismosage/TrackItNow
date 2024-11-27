from flask import Blueprint, request, jsonify
from models.order import Order, OrderItem
from database import db
from datetime import datetime
import random
import string
from urllib.parse import unquote

orders_bp = Blueprint('orders', __name__)

def generate_order_id():
    # Generate a random order ID like #ORD12345
    random_digits = ''.join(random.choices(string.digits, k=5))
    return f"#ORD{random_digits}"

@orders_bp.route('/api/orders', methods=['GET'])
def get_orders():
    try:
        print("Accessing orders GET endpoint")  # Debug log
        orders = Order.query.order_by(Order.date.desc()).all()
        print(f"Found {len(orders)} orders")  # Debug log
        return jsonify([order.to_dict() for order in orders]), 200
    except Exception as e:
        print(f"Error fetching orders: {str(e)}")  # Error log
        return jsonify({'error': str(e)}), 500

@orders_bp.route('/api/orders', methods=['POST'])
def create_order():
    try:
        data = request.json
        new_order = Order(
            id=generate_order_id(),
            customer=data['customer'],
            location=data['location'],
            status=data.get('status', 'pending'),
            total=sum(item['quantity'] * item['price'] for item in data['items'])
        )

        # Add order items
        for item_data in data['items']:
            order_item = OrderItem(
                name=item_data['name'],
                quantity=item_data['quantity'],
                price=item_data['price']
            )
            new_order.items.append(order_item)

        db.session.add(new_order)
        db.session.commit()
        return jsonify(new_order.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        print(f"Error creating order: {str(e)}")
        return jsonify({'error': str(e)}), 400

@orders_bp.route('/api/orders/<string:order_id>', methods=['PUT'])
def update_order(order_id):
    try:
        # Decode the URL-encoded order ID
        decoded_id = unquote(order_id)
        print(f"Updating order: {decoded_id}")  # Debug log
        
        order = Order.query.filter_by(id=decoded_id).first()
        if not order:
            print(f"Order not found: {decoded_id}")  # Debug log
            return jsonify({'error': 'Order not found'}), 404

        data = request.json
        print(f"Update data: {data}")  # Debug log

        # Update order fields
        if 'customer' in data:
            order.customer = data['customer']
        if 'location' in data:
            order.location = data['location']
        if 'status' in data:
            order.status = data['status']

        # Update items if provided
        if 'items' in data:
            # Remove existing items
            OrderItem.query.filter_by(order_id=order.id).delete()

            # Add new items
            for item_data in data['items']:
                order_item = OrderItem(
                    name=item_data['name'],
                    quantity=item_data['quantity'],
                    price=item_data['price']
                )
                order.items.append(order_item)

            # Update total
            order.total = sum(item['quantity'] * item['price'] for item in data['items'])

        db.session.commit()
        print(f"Order updated successfully: {order.id}")  # Debug log
        return jsonify(order.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        print(f"Error updating order: {str(e)}")  # Error log
        return jsonify({'error': str(e)}), 400

@orders_bp.route('/api/orders/<string:order_id>', methods=['DELETE'])
def delete_order(order_id):
    try:
        # Decode the URL-encoded order ID
        decoded_id = unquote(order_id)
        print(f"Deleting order: {decoded_id}")  # Debug log
        
        order = Order.query.filter_by(id=decoded_id).first()
        if not order:
            print(f"Order not found: {decoded_id}")  # Debug log
            return jsonify({'error': 'Order not found'}), 404

        # Delete associated items first
        OrderItem.query.filter_by(order_id=order.id).delete()
        
        # Delete the order
        db.session.delete(order)
        db.session.commit()
        print(f"Order deleted successfully: {decoded_id}")  # Debug log
        return jsonify({'message': 'Order deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        print(f"Error deleting order: {str(e)}")  # Error log
        return jsonify({'error': str(e)}), 400 