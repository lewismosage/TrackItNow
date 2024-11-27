from flask import Blueprint, request, jsonify
from models.invoice import Invoice, InvoiceItem
from database import db
from datetime import datetime
from sqlalchemy import func
import json

invoices_bp = Blueprint('invoices', __name__)

@invoices_bp.route('/api/invoices', methods=['GET', 'OPTIONS'])
def get_invoices():
    if request.method == 'OPTIONS':
        return '', 200
        
    try:
        invoices = Invoice.query.order_by(Invoice.date.desc()).all()
        return jsonify([invoice.to_dict() for invoice in invoices]), 200
    except Exception as e:
        print(f"Error fetching invoices: {str(e)}")
        return jsonify({'error': str(e)}), 500

@invoices_bp.route('/api/invoices', methods=['POST', 'OPTIONS'])
def create_invoice():
    if request.method == 'OPTIONS':
        return '', 200
        
    try:
        data = request.json
        
        # Get the current year
        year = datetime.now().year
        
        # Find the maximum invoice number for the current year using SQL
        result = db.session.query(
            func.max(
                func.cast(
                    func.substr(Invoice.id, -3), # Get last 3 characters
                    db.Integer
                )
            )
        ).filter(Invoice.id.like(f'INV-{year}-%')).scalar()

        # If no invoices exist for this year, start with 1, else increment the max
        next_number = (result or 0) + 1
        invoice_id = f'INV-{year}-{str(next_number).zfill(3)}'

        # Create new invoice
        new_invoice = Invoice(
            id=invoice_id,
            order_id=data.get('orderId'),
            date=datetime.now(),
            due_date=datetime.fromisoformat(data['dueDate'].replace('Z', '+00:00')),
            customer=json.dumps(data['customer']),
            subtotal=float(data['subtotal']),
            tax=float(data['tax']),
            total=float(data['total']),
            status=data.get('status', 'pending'),
            payment_method=data.get('paymentMethod'),
            notes=data.get('notes', '')
        )

        # Add items
        for item_data in data['items']:
            item = InvoiceItem(
                description=item_data['description'],
                quantity=int(item_data['quantity']),
                price=float(item_data['price']),
                total=float(item_data['total'])
            )
            new_invoice.items.append(item)

        try:
            db.session.add(new_invoice)
            db.session.commit()
            return jsonify(new_invoice.to_dict()), 201
        except Exception as e:
            db.session.rollback()
            # If commit fails due to race condition, try again with next number
            next_number += 1
            invoice_id = f'INV-{year}-{str(next_number).zfill(3)}'
            new_invoice.id = invoice_id
            db.session.add(new_invoice)
            db.session.commit()
            return jsonify(new_invoice.to_dict()), 201
            
    except Exception as e:
        db.session.rollback()
        print(f"Error creating invoice: {str(e)}")
        return jsonify({'error': str(e)}), 400

@invoices_bp.route('/api/invoices/<string:invoice_id>', methods=['PUT'])
def update_invoice(invoice_id):
    try:
        invoice = Invoice.query.get_or_404(invoice_id)
        data = request.json

        # Update invoice fields
        if 'dueDate' in data:
            invoice.due_date = datetime.fromisoformat(data['dueDate'].replace('Z', '+00:00'))
        if 'customer' in data:
            invoice.customer = json.dumps(data['customer'])
        if 'status' in data:
            invoice.status = data['status']
        if 'paymentMethod' in data:
            invoice.payment_method = data['paymentMethod']
        if 'notes' in data:
            invoice.notes = data['notes']
        
        # Update items if provided
        if 'items' in data:
            # Remove existing items
            for item in invoice.items:
                db.session.delete(item)
            
            # Add new items
            for item_data in data['items']:
                item = InvoiceItem(
                    description=item_data['description'],
                    quantity=item_data['quantity'],
                    price=item_data['price'],
                    total=item_data['total']
                )
                invoice.items.append(item)
            
            # Update totals
            invoice.subtotal = data['subtotal']
            invoice.tax = data['tax']
            invoice.total = data['total']

        db.session.commit()
        return jsonify(invoice.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        print(f"Error updating invoice: {str(e)}")
        return jsonify({'error': str(e)}), 400

@invoices_bp.route('/api/invoices/<string:invoice_id>', methods=['DELETE'])
def delete_invoice(invoice_id):
    try:
        invoice = Invoice.query.get_or_404(invoice_id)
        db.session.delete(invoice)
        db.session.commit()
        return jsonify({'message': 'Invoice deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        print(f"Error deleting invoice: {str(e)}")
        return jsonify({'error': str(e)}), 400 