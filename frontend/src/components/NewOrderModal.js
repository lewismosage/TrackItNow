import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import '../styles/Modal.css';

const NewOrderModal = ({ onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        customer: '',
        location: '',
        items: [{ name: '', quantity: 1, price: 0 }],
        status: 'pending'
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

    const addItem = () => {
        setFormData(prev => ({
            ...prev,
            items: [...prev.items, { name: '', quantity: 1, price: 0 }]
        }));
    };

    const removeItem = (index) => {
        setFormData(prev => ({
            ...prev,
            items: prev.items.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const total = formData.items.reduce((sum, item) => 
            sum + (item.quantity * item.price), 0);
        
        const newOrder = {
            ...formData,
            id: `#ORD${Math.floor(Math.random() * 10000)}`,
            date: new Date().toISOString(),
            total
        };

        onSubmit(newOrder);
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>New Order</h2>
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
                            placeholder="Enter customer name"
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
                            <option value="">Select Location</option>
                            <option value="Nairobi">Nairobi</option>
                            <option value="Dubai">Dubai</option>
                            <option value="Miami">Miami</option>
                            <option value="China">China</option>
                            <option value="Russia">Russia</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Items</label>
                        <div className="items-header">
                            <span>Item</span>
                            <span>Quantity</span>
                            <span>Price</span>
                            <span></span>
                        </div>
                        {formData.items.map((item, index) => (
                            <div key={index} className="item-row">
                                <select
                                    value={item.name}
                                    onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                                    required
                                >
                                    <option value="">Select Item</option>
                                    <option value="Laptop">Laptop</option>
                                    <option value="Monitor">Monitor</option>
                                    <option value="Keyboard">Keyboard</option>
                                    <option value="Mouse">Mouse</option>
                                    <option value="Headphones">Headphones</option>
                                </select>
                                <input
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
                                    min="1"
                                    required
                                    placeholder="Qty"
                                />
                                <input
                                    type="number"
                                    value={item.price}
                                    onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value))}
                                    min="0"
                                    step="0.01"
                                    required
                                    placeholder="Price"
                                />
                                {formData.items.length > 1 && (
                                    <button 
                                        type="button" 
                                        onClick={() => removeItem(index)}
                                        className="remove-item-btn"
                                    >
                                        <FaTimes />
                                    </button>
                                )}
                            </div>
                        ))}
                        <button 
                            type="button" 
                            onClick={addItem}
                            className="add-item-btn"
                        >
                            Add Item
                        </button>
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
                        </select>
                    </div>

                    <div className="modal-actions">
                        <button type="button" onClick={onClose} className="cancel-btn">
                            Cancel
                        </button>
                        <button type="submit" className="submit-btn">
                            Create Order
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewOrderModal; 