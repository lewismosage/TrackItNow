import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import '../styles/Modal.css';

const EditCustomerModal = ({ customer, onClose, onSubmit, isEditing }) => {
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        email: '',
        phone: '',
        address: '',
        status: 'active',
        joinDate: '',
        totalOrders: 0,
        totalSpent: 0
    });

    useEffect(() => {
        if (isEditing && customer) {
            setFormData({
                ...customer
            });
        }
    }, [isEditing, customer]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>{isEditing ? 'Edit Customer' : 'Add New Customer'}</h2>
                    <button onClick={onClose} className="close-btn">
                        <FaTimes />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="customer-form">
                    <div className="form-grid">
                        {/* Basic Information */}
                        <div className="form-section">
                            <h3>Basic Information</h3>
                            <div className="form-group">
                                <label htmlFor="name">Full Name *</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter customer name"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email Address *</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter email address"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone">Phone Number *</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter phone number"
                                />
                            </div>
                        </div>

                        {/* Additional Information */}
                        <div className="form-section">
                            <h3>Additional Information</h3>
                            <div className="form-group">
                                <label htmlFor="address">Address</label>
                                <textarea
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="Enter customer address"
                                    rows="3"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="status">Status</label>
                                <select
                                    id="status"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                    <option value="pending">Pending</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button 
                            type="button" 
                            onClick={onClose}
                            className="cancel-btn"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            className="submit-btn"
                        >
                            {isEditing ? 'Update Customer' : 'Add Customer'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditCustomerModal; 