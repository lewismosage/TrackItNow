import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { fetchInventoryItems, deleteInventoryItem } from '../services/inventoryService';
import '../styles/InventoryTable.css';

const InventoryTable = ({ searchQuery, selectedLocation, filters, onEdit, onUpdateTotalItems }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await fetchInventoryItems();
                
                // Ensure we're working with an array
                const itemsArray = Array.isArray(response) ? response : [];
                setItems(itemsArray);
                onUpdateTotalItems(itemsArray.length);
            } catch (err) {
                console.error('Error loading items:', err);
                setError(err.message || 'Failed to load inventory items');
                setItems([]); // Set empty array on error
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, [searchQuery, selectedLocation, filters, onUpdateTotalItems]);

    const filteredItems = items.filter(item => {
        // Apply search filter
        if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
            return false;
        }

        // Apply location filter
        if (selectedLocation && item.location !== selectedLocation) {
            return false;
        }

        // Apply category filter
        if (filters.category && item.category !== filters.category) {
            return false;
        }

        // Apply price filters
        if (filters.minPrice && item.price < parseFloat(filters.minPrice)) {
            return false;
        }
        if (filters.maxPrice && item.price > parseFloat(filters.maxPrice)) {
            return false;
        }

        // Apply in-stock filter
        if (filters.inStock && item.quantity <= 0) {
            return false;
        }

        return true;
    });

    const handleDelete = async (itemId) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                await deleteInventoryItem(itemId);
                onUpdateTotalItems(items.length - 1);
            } catch (error) {
                console.error('Failed to delete item:', error);
            }
        }
    };

    if (loading) return <div className="loading">Loading inventory...</div>;
    if (error) return <div className="error">Error: {error}</div>;
    if (!items.length) return <div className="no-items">No items found</div>;

    return (
        <div className="inventory-table-container">
            <table className="inventory-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Location</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredItems.map(item => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.category}</td>
                            <td>{item.location}</td>
                            <td>{item.quantity}</td>
                            <td>${item.price.toFixed(2)}</td>
                            <td>
                                <span className={`status ${item.quantity > item.minimum_stock ? 'in-stock' : 'low-stock'}`}>
                                    {item.quantity > item.minimum_stock ? 'In Stock' : 'Low Stock'}
                                </span>
                            </td>
                            <td>
                                <div className="action-buttons">
                                    <button 
                                        className="edit-btn"
                                        onClick={() => onEdit(item)}
                                    >
                                        <FaEdit />
                                    </button>
                                    <button 
                                        className="delete-btn"
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {filteredItems.length === 0 && (
                <div className="no-items">No items found</div>
            )}
        </div>
    );
};

export default InventoryTable;
