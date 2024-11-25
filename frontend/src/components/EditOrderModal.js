import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import '../styles/Modal.css';

const EditOrderModal = ({ order, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        customer: order.customer,
        location: order.location,
        items: [...order.items],
        status: order.status
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleItemChange = (index, field, value) => {
        const newItems = [...formData.items];
        newItems[index][field] = value;
        setFormData(prev => ({
            ...prev,
            items: newItems
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const total = formData.items.reduce((sum, item) => 
            sum + (item.quantity * item.price), 0);
        
        onSave({
            ...order,
            ...formData,
            total
        });
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Edit Order {order.id}</h2>
                    <button onClick={onClose} className="close-btn">
                        <FaTimes />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Customer Name</label>
                        <input
                            type="text"
                            name="customer"
                            value={formData.customer}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Location</label>
                        <select
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                        >
                            <option value="Nairobi">Nairobi</option>
                            <option value="Dubai">Dubai</option>
                            <option value="Miami">Miami</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Items</label>
                        {formData.items.map((item, index) => (
                            <div key={index} className="item-row">
                                <input
                                    type="text"
                                    value={item.name}
                                    onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                                    required
                                />
                                <input
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
                                    min="1"
                                    required
                                />
                                <input
                                    type="number"
                                    value={item.price}
                                    onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value))}
                                    min="0"
                                    step="0.01"
                                    required
                                />
                            </div>
                        ))}
                    </div>

                    <div className="form-group">
                        <label>Status</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            required
                        >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>

                    <div className="modal-actions">
                        <button type="button" onClick={onClose} className="cancel-btn">
                            Cancel
                        </button>
                        <button type="submit" className="submit-btn">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditOrderModal; 