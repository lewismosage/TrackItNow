import React, { useState } from 'react';
import { 
    FaExclamationTriangle, 
    FaBoxOpen, 
    FaClock, 
    FaDollarSign,
    FaEye,
    FaShoppingCart
} from 'react-icons/fa';
import '../styles/StockAlerts.css';

const StockAlerts = () => {
    const [alerts, setAlerts] = useState([
        {
            id: 'ALT-001',
            type: 'low_stock',
            productId: 'PRD-001',
            productName: 'Laptop Dell XPS 13',
            currentStock: 5,
            minStock: 10,
            priority: 'high',
            timestamp: '2024-02-20T10:30:00',
            location: 'Warehouse A'
        },
        {
            id: 'ALT-002',
            type: 'expiring_soon',
            productId: 'PRD-002',
            productName: 'Organic Milk',
            expiryDate: '2024-03-01',
            quantity: 50,
            priority: 'medium',
            timestamp: '2024-02-20T09:15:00',
            location: 'Store Room B'
        },
        {
            id: 'ALT-003',
            type: 'price_change',
            productId: 'PRD-003',
            productName: 'Wireless Mouse',
            oldPrice: 29.99,
            newPrice: 34.99,
            priority: 'low',
            timestamp: '2024-02-20T08:45:00',
            location: 'Main Store'
        }
    ]);

    React.useEffect(() => {
        localStorage.setItem('stockAlerts', JSON.stringify(alerts));
    }, [alerts]);

    const [filterPriority, setFilterPriority] = useState('all');
    const [filterType, setFilterType] = useState('all');

    const [selectedAlert, setSelectedAlert] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showOrderModal, setShowOrderModal] = useState(false);
    const [orderQuantity, setOrderQuantity] = useState(0);

    const getAlertIcon = (type) => {
        switch(type) {
            case 'low_stock':
                return <FaBoxOpen />;
            case 'expiring_soon':
                return <FaClock />;
            case 'price_change':
                return <FaDollarSign />;
            default:
                return <FaExclamationTriangle />;
        }
    };

    const handleResolveAlert = (alertId) => {
        setAlerts(prev => prev.filter(alert => alert.id !== alertId));
    };

    const handleViewDetails = (alert) => {
        setSelectedAlert(alert);
        setShowDetailsModal(true);
    };

    const handleCreateOrder = (alert) => {
        setSelectedAlert(alert);
        setOrderQuantity(alert.minStock - alert.currentStock); // Suggested quantity
        setShowOrderModal(true);
    };

    const handleSubmitOrder = () => {
        // Here you would make an API call to create the order
        console.log('Submitting order:', {
            productId: selectedAlert.productId,
            quantity: orderQuantity,
            location: selectedAlert.location
        });
        setShowOrderModal(false);
        handleResolveAlert(selectedAlert.id);
    };

    const filteredAlerts = alerts.filter(alert => {
        if (filterPriority !== 'all' && alert.priority !== filterPriority) return false;
        if (filterType !== 'all' && alert.type !== filterType) return false;
        return true;
    });

    return (
        <div className="stock-alerts-container">
            <div className="alerts-header">
                <div className="header-title">
                    <h2>Stock Alerts</h2>
                    <span className="alert-count">
                        Active Alerts: {alerts.length}
                    </span>
                </div>
                <div className="filter-controls">
                    <select 
                        value={filterPriority} 
                        onChange={(e) => setFilterPriority(e.target.value)}
                        className="filter-select"
                    >
                        <option value="all">All Priorities</option>
                        <option value="high">High Priority</option>
                        <option value="medium">Medium Priority</option>
                        <option value="low">Low Priority</option>
                    </select>
                    <select 
                        value={filterType} 
                        onChange={(e) => setFilterType(e.target.value)}
                        className="filter-select"
                    >
                        <option value="all">All Types</option>
                        <option value="low_stock">Low Stock</option>
                        <option value="expiring_soon">Expiring Soon</option>
                        <option value="price_change">Price Changes</option>
                    </select>
                </div>
            </div>

            <div className="alerts-grid">
                {filteredAlerts.map(alert => (
                    <div key={alert.id} className={`alert-card ${alert.priority}`}>
                        <div className="alert-icon">
                            {getAlertIcon(alert.type)}
                        </div>
                        <div className="alert-content">
                            <div className="alert-header">
                                <h3>{alert.productName}</h3>
                                <span className={`priority-badge ${alert.priority}`}>
                                    {alert.priority}
                                </span>
                            </div>
                            
                            <div className="alert-details">
                                {alert.type === 'low_stock' && (
                                    <>
                                        <p>Current Stock: {alert.currentStock}</p>
                                        <p>Minimum Required: {alert.minStock}</p>
                                    </>
                                )}
                                {alert.type === 'expiring_soon' && (
                                    <>
                                        <p>Expiry Date: {new Date(alert.expiryDate).toLocaleDateString()}</p>
                                        <p>Quantity: {alert.quantity}</p>
                                    </>
                                )}
                                {alert.type === 'price_change' && (
                                    <>
                                        <p>Old Price: ${alert.oldPrice}</p>
                                        <p>New Price: ${alert.newPrice}</p>
                                    </>
                                )}
                                <p>Location: {alert.location}</p>
                                <p className="timestamp">
                                    {new Date(alert.timestamp).toLocaleString()}
                                </p>
                            </div>

                            <div className="alert-actions">
                                <button 
                                    className="view-btn"
                                    onClick={() => handleViewDetails(alert)}
                                >
                                    <FaEye /> View Details
                                </button>
                                {alert.type === 'low_stock' && (
                                    <button 
                                        className="order-btn"
                                        onClick={() => handleCreateOrder(alert)}
                                    >
                                        <FaShoppingCart /> Create Order
                                    </button>
                                )}
                                <button 
                                    className="resolve-btn"
                                    onClick={() => handleResolveAlert(alert.id)}
                                >
                                    Resolve
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {showDetailsModal && selectedAlert && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Alert Details</h2>
                        <p>Product ID: {selectedAlert.productId}</p>
                        <p>Product Name: {selectedAlert.productName}</p>
                        <p>Location: {selectedAlert.location}</p>
                        <p>Priority: {selectedAlert.priority}</p>
                        <button onClick={() => setShowDetailsModal(false)}>Close</button>
                    </div>
                </div>
            )}

            {showOrderModal && selectedAlert && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Create Order</h2>
                        <p>Product: {selectedAlert.productName}</p>
                        <p>Location: {selectedAlert.location}</p>
                        <div className="form-group">
                            <label>Order Quantity:</label>
                            <input
                                type="number"
                                value={orderQuantity}
                                onChange={(e) => setOrderQuantity(parseInt(e.target.value))}
                                min="1"
                            />
                        </div>
                        <div className="modal-actions">
                            <button onClick={handleSubmitOrder}>Submit Order</button>
                            <button onClick={() => setShowOrderModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StockAlerts; 