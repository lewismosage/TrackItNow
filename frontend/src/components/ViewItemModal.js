import React from 'react';
import { FaTimes } from 'react-icons/fa';
import '../styles/Modal.css';

const ViewItemModal = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content view-modal">
        <div className="modal-header">
          <h2>Item Details</h2>
          <button onClick={onClose} className="close-btn">
            <FaTimes />
          </button>
        </div>

        <div className="item-details">
          <div className="detail-group">
            <label>Item Name</label>
            <p>{item.name}</p>
          </div>

          <div className="detail-row">
            <div className="detail-group">
              <label>Category</label>
              <p>{item.category}</p>
            </div>

            <div className="detail-group">
              <label>Location</label>
              <p>{item.location}</p>
            </div>
          </div>

          <div className="detail-row">
            <div className="detail-group">
              <label>Quantity</label>
              <p>{item.quantity} {item.unit}</p>
            </div>

            <div className="detail-group">
              <label>Price per Unit</label>
              <p>${item.price}</p>
            </div>

            <div className="detail-group">
              <label>Total Value</label>
              <p>${item.quantity * item.price}</p>
            </div>
          </div>

          <div className="detail-group">
            <label>Status</label>
            <p className={`status-badge ${item.quantity > 0 ? 'in-stock' : 'out-of-stock'}`}>
              {item.quantity > 0 ? 'In Stock' : 'Out of Stock'}
            </p>
          </div>

          <div className="detail-group">
            <label>Description</label>
            <p>{item.description || 'No description available'}</p>
          </div>

          <div className="detail-group">
            <label>Last Updated</label>
            <p>{new Date(item.updatedAt).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewItemModal; 