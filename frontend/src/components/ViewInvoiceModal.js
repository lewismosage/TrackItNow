import React from 'react';
import { FaTimes } from 'react-icons/fa';
import '../styles/ViewInvoiceModal.css';

const ViewInvoiceModal = ({ invoice, onClose }) => {
    return (
        <div className="view-invoice-modal-overlay">
            <div className="view-invoice-modal-content">
                <div className="view-invoice-modal-header">
                    <h2>Invoice Details</h2>
                    <button onClick={onClose} className="close-btn">
                        <FaTimes />
                    </button>
                </div>
                <div className="view-invoice-body">
                    <div className="invoice-header-details">
                        <div className="invoice-id">Invoice #{invoice.id}</div>
                        <div className="invoice-date">Date: {new Date(invoice.date).toLocaleDateString()}</div>
                        <div className="invoice-status">
                            Status: <span className={`status-badge ${invoice.status}`}>{invoice.status}</span>
                        </div>
                    </div>

                    <div className="customer-details">
                        <h3>Customer Information</h3>
                        <p><strong>Name:</strong> {invoice.customer.name}</p>
                        <p><strong>Email:</strong> {invoice.customer.email}</p>
                        <p><strong>Address:</strong> {invoice.customer.address}</p>
                    </div>

                    <div className="items-details">
                        <h3>Items</h3>
                        <table className="items-table">
                            <thead>
                                <tr>
                                    <th>Description</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoice.items.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.description}</td>
                                        <td>{item.quantity}</td>
                                        <td>${item.price.toFixed(2)}</td>
                                        <td>${item.total.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="invoice-summary">
                        <div className="summary-row">
                            <span>Subtotal:</span>
                            <span>${invoice.subtotal.toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Tax (10%):</span>
                            <span>${invoice.tax.toFixed(2)}</span>
                        </div>
                        <div className="summary-row total">
                            <span>Total:</span>
                            <span>${invoice.total.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="additional-details">
                        <p><strong>Payment Method:</strong> {invoice.paymentMethod}</p>
                        <p><strong>Notes:</strong> {invoice.notes}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewInvoiceModal; 