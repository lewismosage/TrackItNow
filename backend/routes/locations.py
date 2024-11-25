from flask import Blueprint, jsonify
from database import db
from models.inventory import Inventory

locations_bp = Blueprint('locations', __name__)

@locations_bp.route('/api/locations', methods=['GET'])
def get_locations():
    try:
        print("Accessing locations GET endpoint")  # Debug log
        locations = db.session.query(Inventory.location).distinct().all()
        print(f"Found {len(locations)} locations")  # Debug log
        return jsonify([location[0] for location in locations]), 200
    except Exception as e:
        print(f"Error fetching locations: {str(e)}")
        return jsonify({'error': str(e)}), 500 