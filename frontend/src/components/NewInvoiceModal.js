import React, { useState, useEffect } from 'react';
import { FaTimes, FaPlus, FaTrash } from 'react-icons/fa';
import '../styles/NewInvoiceModal.css';

const NewInvoiceModal = ({ onClose, onSubmit, invoice, isEditing }) => {
    const [formData, setFormData] = useState({
        orderId: '',
        customer: {
            name: '',
            email: '',
            address: ''
        },
        items: [
            { description: '', quantity: 1, price: 0, total: 0 }
        ],
        dueDate: new Date().toISOString().split('T')[0],
        status: 'pending',
        paymentMethod: 'bank_transfer',
        notes: '',
        subtotal: 0,
        tax: 0,
        total: 0
    });

    useEffect(() => {
        if (isEditing && invoice) {
            setFormData({
                ...invoice,
                items: invoice.items.map(item => ({
                    ...item,
                    total: item.quantity * item.price
                }))
            });
        }
    }, [isEditing, invoice]);

    const calculateItemTotal = (item) => {
        return item.quantity * item.price;
    };

    const calculateSubtotal = () => {
        return formData.items.reduce((sum, item) => sum + calculateItemTotal(item), 0);
    };

    const calculateTax = (subtotal) => {
        return subtotal * 0.10; 
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleItemChange = (index, field, value) => {
        const newItems = [...formData.items];
        newItems[index][field] = value;
        newItems[index].total = calculateItemTotal(newItems[index]);
        
        const subtotal = newItems.reduce((sum, item) => sum + calculateItemTotal(item), 0);
        const tax = subtotal * 0.10;
        const total = subtotal + tax;

        setFormData(prev => ({
            ...prev,
            items: newItems,
            subtotal: subtotal,
            tax: tax,
            total: total
        }));
    };

    const addItem = () => {
        setFormData(prev => ({
            ...prev,
            items: [...prev.items, { description: '', quantity: 1, price: 0, total: 0 }]
        }));
    };

    const removeItem = (index) => {
        if (formData.items.length > 1) {
            setFormData(prev => ({
                ...prev,
                items: prev.items.filter((_, i) => i !== index)
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.customer.name || !formData.customer.email) {
            alert('Customer name and email are required');
            return;
        }

        if (!formData.dueDate) {
            alert('Due date is required');
            return;
        }

        if (formData.items.some(item => !item.description || item.quantity <= 0 || item.price <= 0)) {
            alert('All items must have a description, quantity, and price');
            return;
        }

        const subtotal = calculateSubtotal();
        const tax = calculateTax(subtotal);
        const total = subtotal + tax;

        // Check if the due date is past and status is still pending
        const isPastDue = new Date(formData.dueDate) < new Date() && formData.status === 'pending';

        const formattedData = {
            ...formData,
            dueDate: new Date(formData.dueDate).toISOString(),
            status: isPastDue ? 'overdue' : formData.status,  // Automatically set to overdue if past due
            subtotal,
            tax,
            total,
            customer: {
                name: formData.customer.name,
                email: formData.customer.email,
                address: formData.customer.address
            },
            items: formData.items.map(item => ({
                description: item.description,
                quantity: parseInt(item.quantity),
                price: parseFloat(item.price),
                total: parseFloat(calculateItemTotal(item))
            }))
        };

        onSubmit(formattedData);
    };

    return (
        <div className="invoice-modal-overlay">
            <div className="invoice-modal-content">
                <div className="invoice-modal-header">
                    <h2>{isEditing ? 'Edit Invoice' : 'Create New Invoice'}</h2>
                    <button onClick={onClose} className="close-btn">
                        <FaTimes />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="invoice-form-section">
                        <div className="invoice-form-group">
                            <label>Order ID</label>
                            <input 
                                type="text" 
                                name="orderId" 
                                value={formData.orderId} 
                                onChange={handleChange}
                                disabled={isEditing}
                            />
                        </div>
                        <div className="invoice-form-group">
                            <label>Customer Name</label>
                            <input type="text" name="customer.name" value={formData.customer.name} onChange={handleChange} />
                        </div>
                        <div className="invoice-form-group">
                            <label>Customer Email</label>
                            <input type="email" name="customer.email" value={formData.customer.email} onChange={handleChange} />
                        </div>
                        <div className="invoice-form-group">
                            <label>Customer Address</label>
                            <input type="text" name="customer.address" value={formData.customer.address} onChange={handleChange} />
                        </div>
                        <div className="invoice-form-group">
                            <label>Due Date</label>
                            <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} />
                        </div>
                        <div className="invoice-form-group">
                            <label>Status</label>
                            <select name="status" value={formData.status} onChange={handleChange}>
                                <option value="pending">Pending</option>
                                <option value="paid">Paid</option>
                                <option value="overdue">Overdue</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                        <div className="invoice-form-group">
                            <label>Payment Method</label>
                            <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
                                <option value="bank_transfer">Bank Transfer</option>
                                <option value="credit_card">Credit Card</option>
                                <option value="paypal">PayPal</option>
                            </select>
                        </div>
                        <div className="invoice-form-group">
                            <label>Notes</label>
                            <textarea name="notes" value={formData.notes} onChange={handleChange} />
                        </div>
                        <div className="invoice-items-container">
                            <label className="items-label">Items</label>
                            {formData.items.map((item, index) => (
                                <div key={index} className="invoice-item-row">
                                    <input 
                                        type="text" 
                                        placeholder="Description"
                                        value={item.description} 
                                        onChange={(e) => handleItemChange(index, 'description', e.target.value)} 
                                    />
                                    <input 
                                        type="number" 
                                        placeholder="Qty"
                                        min="1"
                                        value={item.quantity} 
                                        onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value) || 0)} 
                                    />
                                    <input 
                                        type="number" 
                                        placeholder="Price"
                                        min="0"
                                        step="0.01"
                                        value={item.price} 
                                        onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value) || 0)} 
                                    />
                                    <div className="item-total">
                                        ${(item.quantity * item.price).toFixed(2)}
                                    </div>
                                    {formData.items.length > 1 && (
                                        <button 
                                            type="button" 
                                            onClick={(e) => {
                                                e.preventDefault();
                                                removeItem(index);
                                            }} 
                                            className="remove-invoice-item-btn"
                                        >
                                            <FaTrash />
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button 
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    addItem();
                                }} 
                                className="add-invoice-item-btn"
                            >
                                <FaPlus /> Add Item
                            </button>
                        </div>
                        <div className="invoice-summary">
                            <div className="summary-row">
                                <span>Subtotal:</span>
                                <span>${formData.subtotal.toFixed(2)}</span>
                            </div>
                            <div className="summary-row">
                                <span>Tax (10%):</span>
                                <span>${formData.tax.toFixed(2)}</span>
                            </div>
                            <div className="summary-row total">
                                <span>Total:</span>
                                <span>${formData.total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="invoice-modal-actions">
                        <button type="button" onClick={onClose} className="invoice-cancel-btn">
                            Cancel
                        </button>
                        <button type="submit" className="invoice-submit-btn">
                            {isEditing ? 'Update Invoice' : 'Create Invoice'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewInvoiceModal; 