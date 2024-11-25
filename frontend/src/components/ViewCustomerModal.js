import React from 'react';
import { FaTimes } from 'react-icons/fa';
import '../styles/Modal.css';

const ViewCustomerModal = ({ customer, onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Customer Details</h2>
                    <button onClick={onClose} className="close-btn">
                        <FaTimes />
                    </button>
                </div>
                <div className="modal-body">
                    <div className="customer-info-section">
                        <h3>Basic Information</h3>
                        <div className="info-grid">
                            <div className="info-item">
                                <label>Customer ID</label>
                                <p>{customer.id}</p>
                            </div>
                            <div className="info-item">
                                <label>Name</label>
                                <p>{customer.name}</p>
                            </div>
                            <div className="info-item">
                                <label>Email</label>
                                <p>{customer.email}</p>
                            </div>
                            <div className="info-item">
                                <label>Phone</label>
                                <p>{customer.phone}</p>
                            </div>
                        </div>
                    </div>

                    <div className="customer-info-section">
                        <h3>Additional Details</h3>
                        <div className="info-grid">
                            <div className="info-item">
                                <label>Address</label>
                                <p>{customer.address}</p>
                            </div>
                            <div className="info-item">
                                <label>Join Date</label>
                                <p>{new Date(customer.joinDate).toLocaleDateString()}</p>
                            </div>
                            <div className="info-item">
                                <label>Total Orders</label>
                                <p>{customer.totalOrders}</p>
                            </div>
                            <div className="info-item">
                                <label>Total Spent</label>
                                <p>${customer.totalSpent.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>

                    <div className="customer-status-section">
                        <h3>Status</h3>
                        <span className={`status-badge ${customer.status}`}>
                            {customer.status}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewCustomerModal; 