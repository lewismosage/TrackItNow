import React, { useState, useEffect } from 'react';
import { updateItem } from '../services/inventoryService';
import '../styles/Modal.css';

const EditItemModal = ({ item, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    location: '',
    quantity: '',
    price: '',
    description: '',
    minimumStock: '',
    unit: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (item) {
      setFormData(item);
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await updateItem(item.id, formData);
      onSave(); 
      onClose();
    } catch (err) {
      setError('Failed to update item');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Item</h2>
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Item Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                <option value="electronics">Electronics</option>
                <option value="furniture">Furniture</option>
                <option value="supplies">Supplies</option>
              </select>
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
                {/* Add locations mapping here */}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Quantity</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Price per Unit</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
            />
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditItemModal; 