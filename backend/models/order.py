from database import db
from datetime import datetime

class OrderItem(db.Model):
    __tablename__ = 'order_items'

    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.String(50), db.ForeignKey('orders.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'quantity': self.quantity,
            'price': self.price
        }

class Order(db.Model):
    __tablename__ = 'orders'

    id = db.Column(db.String(50), primary_key=True)
    customer = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    date = db.Column(db.DateTime, default=datetime.utcnow)
    status = db.Column(db.String(20), default='pending')
    total = db.Column(db.Float, nullable=False)
    items = db.relationship('OrderItem', backref='order', lazy=True, cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'customer': self.customer,
            'location': self.location,
            'date': self.date.isoformat(),
            'status': self.status,
            'total': self.total,
            'items': [item.to_dict() for item in self.items]
        } 