from database import db
from datetime import datetime

class Supplier(db.Model):
    __tablename__ = 'suppliers'

    id = db.Column(db.String(20), primary_key=True)  # SUP-XXX format
    name = db.Column(db.String(100), nullable=False)
    contact = db.Column(db.String(100))
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(20))
    address = db.Column(db.String(200))
    status = db.Column(db.String(20), default='active')
    rating = db.Column(db.Float, default=0.0)
    total_orders = db.Column(db.Integer, default=0)
    last_order = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'contact': self.contact,
            'email': self.email,
            'phone': self.phone,
            'address': self.address,
            'status': self.status,
            'rating': self.rating,
            'totalOrders': self.total_orders,
            'lastOrder': self.last_order.isoformat() if self.last_order else None,
            'createdAt': self.created_at.isoformat(),
            'updatedAt': self.updated_at.isoformat()
        } 