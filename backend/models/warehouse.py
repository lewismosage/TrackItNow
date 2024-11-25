from database import db
from datetime import datetime

class Warehouse(db.Model):
    __tablename__ = 'warehouses'

    id = db.Column(db.String(20), primary_key=True)  # WH-XXX format
    name = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(200), nullable=False)
    capacity = db.Column(db.Integer, nullable=False)
    used_space = db.Column(db.Integer, default=0)
    manager = db.Column(db.String(100), nullable=False)
    status = db.Column(db.String(20), default='active')
    zones = db.Column(db.JSON, default=list)
    item_count = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'location': self.location,
            'capacity': self.capacity,
            'usedSpace': self.used_space,
            'manager': self.manager,
            'status': self.status,
            'zones': self.zones,
            'itemCount': self.item_count,
            'createdAt': self.created_at.isoformat(),
            'updatedAt': self.updated_at.isoformat()
        } 