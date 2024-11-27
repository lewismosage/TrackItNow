import React from 'react';
import { FaTimes } from 'react-icons/fa';
import '../styles/Modal.css';

const ViewOrderModal = ({ order, onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Order Details</h2>
                    <button onClick={onClose} className="close-btn">
                        <FaTimes />
                    </button>
                </div>

                <div className="order-details">
                    <div className="detail-group">
                        <label>Order ID</label>
                        <p>{order.id}</p>
                    </div>

                    <div className="detail-group">
                        <label>Date</label>
                        <p>{new Date(order.date).toLocaleDateString()}</p>
                    </div>

                    <div className="detail-group">
                        <label>Customer</label>
                        <p>{order.customer}</p>
                    </div>

                    <div className="detail-group">
                        <label>Items</label>
                        <div className="items-list">
                            {order.items.map((item, index) => (
                                <div key={index} className="item-detail">
                                    <span>{item.quantity}x {item.name}</span>
                                    <span>${item.price.toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="detail-group">
                        <label>Total</label>
                        <p className="total-amount">${order.total.toFixed(2)}</p>
                    </div>

                    <div className="detail-group">
                        <label>Location</label>
                        <p>{order.location}</p>
                    </div>

                    <div className="detail-group">
                        <label>Status</label>
                        <span className={`status-badge ${order.status.toLowerCase()}`}>
                            {order.status}
                        </span>
                    </div>
                </div>

                <div className="modal-actions">
                    <button onClick={onClose} className="cancel-btn">Close</button>
                </div>
            </div>
        </div>
    );
};

export default ViewOrderModal; 