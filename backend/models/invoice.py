from database import db
from datetime import datetime
import json

class Invoice(db.Model):
    __tablename__ = 'invoices'

    id = db.Column(db.String(20), primary_key=True, unique=True)
    order_id = db.Column(db.String(20))
    date = db.Column(db.DateTime, default=datetime.utcnow)
    due_date = db.Column(db.DateTime, nullable=False)
    
    # Customer details stored as JSON
    customer = db.Column(db.Text, nullable=False)  # JSON string
    
    subtotal = db.Column(db.Float, nullable=False)
    tax = db.Column(db.Float, nullable=False)
    total = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(20), default='pending')
    payment_method = db.Column(db.String(50))
    notes = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationship with invoice items
    items = db.relationship('InvoiceItem', backref='invoice', lazy=True, cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'orderId': self.order_id,
            'date': self.date.isoformat(),
            'dueDate': self.due_date.isoformat(),
            'customer': json.loads(self.customer),
            'items': [item.to_dict() for item in self.items],
            'subtotal': self.subtotal,
            'tax': self.tax,
            'total': self.total,
            'status': self.status,
            'paymentMethod': self.payment_method,
            'notes': self.notes,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }

class InvoiceItem(db.Model):
    __tablename__ = 'invoice_items'

    id = db.Column(db.Integer, primary_key=True)
    invoice_id = db.Column(db.String(20), db.ForeignKey('invoices.id'), nullable=False)
    description = db.Column(db.String(200), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)
    total = db.Column(db.Float, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'description': self.description,
            'quantity': self.quantity,
            'price': self.price,
            'total': self.total
        } 