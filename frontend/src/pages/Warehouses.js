import React, { useState, useEffect } from 'react';
import { 
    FaWarehouse, 
    FaPlus, 
    FaEdit, 
    FaTrash, 
    FaExchangeAlt,
    FaSearch,
    FaMapMarkerAlt,
    FaBox,
    FaChartBar,
    FaUsers
} from 'react-icons/fa';
import '../styles/Warehouses.css';
import { 
    fetchWarehouses, 
    createWarehouse, 
    updateWarehouse, 
    deleteWarehouse
} from '../services/warehouseService';

const WarehouseModal = ({ show, onClose, onSave, warehouse = null }) => {
    const [formData, setFormData] = useState({
        name: warehouse?.name || '',
        location: warehouse?.location || '',
        capacity: warehouse?.capacity || '',
        manager: warehouse?.manager || '',
        zones: warehouse?.zones?.join(', ') || '',
        status: warehouse?.status || 'active'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const newWarehouse = {
            id: warehouse?.id || `WH-${Math.random().toString(36).substr(2, 9)}`,
            ...formData,
            zones: formData.zones.split(',').map(zone => zone.trim()),
            usedSpace: warehouse?.usedSpace || 0,
            itemCount: warehouse?.itemCount || 0,
            lastUpdated: new Date().toISOString()
        };
        onSave(newWarehouse);
        onClose();
    };

    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{warehouse ? 'Edit Warehouse' : 'Add New Warehouse'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name:</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Location:</label>
                        <input
                            type="text"
                            value={formData.location}
                            onChange={(e) => setFormData({...formData, location: e.target.value})}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Capacity:</label>
                        <input
                            type="number"
                            value={formData.capacity}
                            onChange={(e) => setFormData({...formData, capacity: parseInt(e.target.value)})}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Manager:</label>
                        <input
                            type="text"
                            value={formData.manager}
                            onChange={(e) => setFormData({...formData, manager: e.target.value})}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Zones (comma-separated):</label>
                        <input
                            type="text"
                            value={formData.zones}
                            onChange={(e) => setFormData({...formData, zones: e.target.value})}
                            placeholder="A, B, C, D"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Status:</label>
                        <select
                            value={formData.status}
                            onChange={(e) => setFormData({...formData, status: e.target.value})}
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="maintenance">Maintenance</option>
                        </select>
                    </div>
                    <div className="modal-actions">
                        <button type="button" onClick={onClose}>Cancel</button>
                        <button type="submit">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const Warehouses = () => {
    const [warehouses, setWarehouses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showTransferModal, setShowTransferModal] = useState(false);
    const [showWarehouseModal, setShowWarehouseModal] = useState(false);
    const [selectedWarehouse, setSelectedWarehouse] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    // Sample inventory data for warehouse items
    const [warehouseItems] = useState([
        {
            id: 'ITM-001',
            name: 'Laptop Dell XPS 13',
            sku: 'LAP-DEL-13',
            quantity: 50,
            zone: 'A',
            bin: 'A-123',
            category: 'Electronics',
            lastMovement: '2024-02-19'
        },
    ]);

    useEffect(() => {
        loadWarehouses();
    }, []);

    const loadWarehouses = async () => {
        try {
            setLoading(true);
            const data = await fetchWarehouses();
            setWarehouses(data);
            setError(null);
        } catch (err) {
            setError('Failed to load warehouses');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const calculateUtilization = (used, total) => {
        const percentage = (used / total) * 100;
        return {
            percentage,
            class: percentage > 90 ? 'critical' : percentage > 70 ? 'warning' : 'good'
        };
    };

    const handleTransfer = (sourceWarehouse, targetWarehouse, items) => {
        // Implement transfer logic
        console.log('Transferring items:', { sourceWarehouse, targetWarehouse, items });
    };

    const handleWarehouseAction = async (action, warehouse) => {
        switch(action) {
            case 'edit':
                setSelectedWarehouse(warehouse);
                setShowWarehouseModal(true);
                break;
            case 'delete':
                if (window.confirm('Are you sure you want to delete this warehouse?')) {
                    try {
                        await deleteWarehouse(warehouse.id);
                        setWarehouses(prev => prev.filter(w => w.id !== warehouse.id));
                    } catch (error) {
                        console.error('Failed to delete warehouse:', error);
                        // Handle error
                    }
                }
                break;
            default:
                break;
        }
    };

    const handleSaveWarehouse = async (warehouseData) => {
        try {
            if (selectedWarehouse) {
                const updatedWarehouse = await updateWarehouse(selectedWarehouse.id, warehouseData);
                setWarehouses(prev => 
                    prev.map(w => w.id === selectedWarehouse.id ? updatedWarehouse : w)
                );
            } else {
                const newWarehouse = await createWarehouse(warehouseData);
                setWarehouses(prev => [...prev, newWarehouse]);
            }
            setSelectedWarehouse(null);
            setShowWarehouseModal(false);
        } catch (error) {
            console.error('Failed to save warehouse:', error);
            // Handle error (show notification, etc.)
        }
    };

    return (
        <div className="warehouses-container">
            <div className="warehouses-header">
                <div className="header-title">
                    <h2>Warehouse Management</h2>
                    <span className="warehouse-count">
                        {warehouses.length} Warehouses
                    </span>
                </div>
                <div className="header-actions">
                    <div className="search-container">
                        <FaSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search warehouses..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button 
                        className="add-warehouse-btn"
                        onClick={() => setShowWarehouseModal(true)}
                    >
                        <FaPlus /> Add Warehouse
                    </button>
                </div>
            </div>

            <div className="warehouses-grid">
                {warehouses
                    .filter(warehouse => 
                        warehouse.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        warehouse.location.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map(warehouse => {
                        const utilization = calculateUtilization(warehouse.usedSpace, warehouse.capacity);
                        return (
                            <div key={warehouse.id} className="warehouse-card">
                                <div className="warehouse-header">
                                    <div className="warehouse-icon">
                                        <FaWarehouse />
                                    </div>
                                    <div className="warehouse-info">
                                        <h3>{warehouse.name}</h3>
                                        <span className={`status-badge ${warehouse.status}`}>
                                            {warehouse.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="warehouse-details">
                                    <div className="detail-item">
                                        <FaMapMarkerAlt className="detail-icon" />
                                        <span>{warehouse.location}</span>
                                    </div>
                                    <div className="detail-item">
                                        <FaBox className="detail-icon" />
                                        <span>{warehouse.itemCount} Items</span>
                                    </div>
                                    <div className="detail-item">
                                        <FaUsers className="detail-icon" />
                                        <span>{warehouse.manager}</span>
                                    </div>
                                </div>

                                <div className="capacity-section">
                                    <div className="capacity-header">
                                        <h4>Storage Utilization</h4>
                                        <span>{utilization.percentage.toFixed(1)}%</span>
                                    </div>
                                    <div className="capacity-bar">
                                        <div 
                                            className={`capacity-fill ${utilization.class}`}
                                            style={{ width: `${utilization.percentage}%` }}
                                        ></div>
                                    </div>
                                    <div className="capacity-details">
                                        <span>{warehouse.usedSpace.toLocaleString()} / {warehouse.capacity.toLocaleString()} units</span>
                                    </div>
                                </div>

                                <div className="zones-section">
                                    <h4>Storage Zones</h4>
                                    <div className="zones-grid">
                                        {warehouse.zones.map(zone => (
                                            <div key={zone} className="zone-badge">
                                                Zone {zone}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="warehouse-actions">
                                    <button 
                                        className="view-inventory-btn"
                                        onClick={() => {/* Handle view inventory */}}
                                    >
                                        <FaChartBar /> Inventory
                                    </button>
                                    <button
                                        className="transfer-btn"
                                        onClick={() => setShowTransferModal(true)}
                                    >
                                        <FaExchangeAlt /> Transfer
                                    </button>
                                    <button
                                        className="edit-btn"
                                        onClick={() => handleWarehouseAction('edit', warehouse)}
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        className="delete-btn"
                                        onClick={() => handleWarehouseAction('delete', warehouse)}
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
            </div>

            <WarehouseModal
                show={showWarehouseModal}
                onClose={() => {
                    setShowWarehouseModal(false);
                    setSelectedWarehouse(null);
                }}
                onSave={handleSaveWarehouse}
                warehouse={selectedWarehouse}
            />
        </div>
    );
};

export default Warehouses; 