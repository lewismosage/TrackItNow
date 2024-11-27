import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { addInventoryItem } from '../services/inventoryService';
import '../styles/Modal.css';

const AddItemModal = ({ onClose, locations, editMode, itemToEdit, title = "Add New Item" }) => {
  const [formData, setFormData] = useState({
    name: itemToEdit?.name || '',
    category: itemToEdit?.category || '',
    location: itemToEdit?.location || '',
    quantity: itemToEdit?.quantity || '',
    price: itemToEdit?.price || '',
    description: itemToEdit?.description || '',
    minimumStock: itemToEdit?.minimumStock || '',
    unit: itemToEdit?.unit || ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.location) {
      setError('Please select a location');
      return;
    }
    try {
      setLoading(true);
      await addInventoryItem(formData);
      onClose();
    } catch (err) {
      setError('Failed to add item');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{title}</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Item Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter item name"
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
              <label>Location *</label>
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className={!formData.location ? 'select-required' : ''}
              >
                <option value="">Select Location</option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
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
                min="0"
                placeholder="Enter quantity"
              />
            </div>

            <div className="form-group">
              <label>Unit</label>
              <input
                type="text"
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                placeholder="e.g., pcs, kg, liters"
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
                min="0"
                step="0.01"
                placeholder="Enter price"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Minimum Stock Level</label>
            <input
              type="number"
              name="minimumStock"
              value={formData.minimumStock}
              onChange={handleChange}
              required
              min="0"
              placeholder="Enter minimum stock level"
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              placeholder="Enter item description"
            />
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              {loading ? 'Saving...' : editMode ? 'Update Item' : 'Add Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItemModal; 