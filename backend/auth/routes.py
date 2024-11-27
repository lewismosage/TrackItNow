from flask import jsonify, request
from flask_jwt_extended import create_access_token, create_refresh_token
from . import auth_bp
from models.user import User
from database import db

@auth_bp.route('/api/auth/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        
        if User.query.filter_by(username=data['username']).first():
            return jsonify({'error': 'Username already exists'}), 400
            
        if User.query.filter_by(email=data['email']).first():
            return jsonify({'error': 'Email already exists'}), 400

        user = User(
            username=data['username'],
            email=data['email'],
            first_name=data.get('first_name'),
            last_name=data.get('last_name'),
            is_active=True,
            is_admin=False
        )
        user.set_password(data['password'])
        
        db.session.add(user)
        db.session.commit()

        access_token = create_access_token(identity=user.id)
        refresh_token = create_refresh_token(identity=user.id)

        return jsonify({
            'user': user.to_dict(),
            'access_token': access_token,
            'refresh_token': refresh_token
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

@auth_bp.route('/api/auth/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        user = User.query.filter_by(username=data['username']).first()
        
        if user and user.check_password(data['password']):
            access_token = create_access_token(identity=user.id)
            refresh_token = create_refresh_token(identity=user.id)
            
            return jsonify({
                'access_token': access_token,
                'refresh_token': refresh_token,
                'user': user.to_dict()
            }), 200
        else:
            return jsonify({'message': 'Invalid credentials'}), 401
            
    except Exception as e:
        return jsonify({'message': str(e)}), 500