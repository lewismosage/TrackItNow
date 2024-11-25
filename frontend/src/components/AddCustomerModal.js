/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import '../styles/Modal.css';
import { createCustomer } from '../services/customerService';
/* eslint-enable no-unused-vars */

const AddCustomerModal = ({ onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        status: 'active',
        totalOrders: 0,
        totalSpent: 0
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Submitting form data:', formData); 
            await onSubmit(formData);
            onClose();
        } catch (error) {
            console.error('Error in modal:', error);
            // Add error handling UI here
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Add New Customer</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name:</label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({
                                ...formData,
                                name: e.target.value
                            })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({
                                ...formData,
                                email: e.target.value
                            })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Phone:</label>
                        <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({
                                ...formData,
                                phone: e.target.value
                            })}
                        />
                    </div>
                    <div className="modal-actions">
                        <button type="submit">Add Customer</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCustomerModal; 