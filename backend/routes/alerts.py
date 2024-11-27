from flask import Blueprint, request, jsonify

from database import db
from datetime import datetime

alerts_bp = Blueprint('alerts', __name__)

@alerts_bp.route('/api/alerts', methods=['GET'])
def get_alerts():
    print("GET /api/alerts endpoint hit")  # Debug print
    try:
        # Return dummy data for testing
        dummy_data = [
            {
                "id": 1,
                "type": "low_stock",
                "priority": "high",
                "productId": "PROD001",
                "productName": "Test Product",
                "location": "Warehouse A",
                "currentStock": 5,
                "minStock": 10,
                "timestamp": datetime.utcnow().isoformat()
            }
        ]
        return jsonify(dummy_data), 200
    except Exception as e:
        print(f"Error fetching alerts: {str(e)}")
        return jsonify({'error': str(e)}), 500

@alerts_bp.route('/api/alerts/<int:alert_id>/resolve', methods=['PUT'])
def resolve_alert(alert_id):
    print(f"PUT /api/alerts/{alert_id}/resolve endpoint hit")  # Debug print
    try:
        return jsonify({"message": "Alert resolved successfully"}), 200
    except Exception as e:
        print(f"Error resolving alert: {str(e)}")
        return jsonify({'error': str(e)}), 400