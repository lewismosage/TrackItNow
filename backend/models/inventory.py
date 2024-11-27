from database import db
from datetime import datetime

class Inventory(db.Model):
    __tablename__ = 'inventory'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    location = db.Column(db.String(50), nullable=False)
    quantity = db.Column(db.Integer, default=0)
    price = db.Column(db.Float, nullable=False)
    minimum_stock = db.Column(db.Integer, default=0)
    description = db.Column(db.Text)
    unit = db.Column(db.String(20))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'category': self.category,
            'location': self.location,
            'quantity': self.quantity,
            'price': self.price,
            'minimum_stock': self.minimum_stock,
            'description': self.description,
            'unit': self.unit,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        } 