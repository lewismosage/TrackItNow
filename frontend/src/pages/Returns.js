import React, { useState } from 'react';
import { 
    FaBoxOpen, 
    FaSearch, 
    FaFilter, 
    FaPlus,
    FaCheck,
    FaTimes,
    FaExchangeAlt,
    FaMoneyBillWave,
    FaTag,
    FaUser,
    FaCalendarAlt
} from 'react-icons/fa';
import '../styles/Returns.css';

const Returns = () => {
    const [returns, setReturns] = useState([
        {
            id: 'RMA-001',
            orderId: 'ORD-2024-001',
            customer: {
                name: 'John Smith',
                email: 'john@example.com',
                phone: '+1 234-567-8900'
            },
            products: [
                {
                    id: 'PRD-001',
                    name: 'Laptop Dell XPS 13',
                    quantity: 1,
                    reason: 'Defective',
                    condition: 'Damaged',
                    price: 1299.99
                }
            ],
            status: 'pending',
            returnType: 'refund',
            dateRequested: '2024-02-15T10:30:00',
            dateUpdated: '2024-02-15T10:30:00',
            notes: 'Screen flickering issue',
            refundAmount: 1299.99,
            trackingNumber: 'TRK123456789'
        },       
    ]);

    const [filterStatus, setFilterStatus] = useState('all');
    const [filterType, setFilterType] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [showNewReturnModal, setShowNewReturnModal] = useState(false);

    const getStatusBadgeClass = (status) => {
        switch(status) {
            case 'pending': return 'pending';
            case 'approved': return 'approved';
            case 'rejected': return 'rejected';
            case 'processing': return 'processing';
            case 'completed': return 'completed';
            default: return '';
        }
    };

    const handleStatusUpdate = (returnId, newStatus) => {
        setReturns(prev => prev.map(ret => 
            ret.id === returnId ? { ...ret, status: newStatus, dateUpdated: new Date().toISOString() } : ret
        ));
    };

    const handleRefundProcess = (returnId) => {
        // Implement refund processing logic
        console.log('Processing refund for:', returnId);
    };

    const filteredReturns = returns.filter(ret => {
        if (filterStatus !== 'all' && ret.status !== filterStatus) return false;
        if (filterType !== 'all' && ret.returnType !== filterType) return false;
        if (searchQuery) {
            const searchLower = searchQuery.toLowerCase();
            return (
                ret.id.toLowerCase().includes(searchLower) ||
                ret.orderId.toLowerCase().includes(searchLower) ||
                ret.customer.name.toLowerCase().includes(searchLower)
            );
        }
        return true;
    });

    return (
        <div className="returns-container">
            <div className="returns-header">
                <div className="header-title">
                    <h2>Returns Management</h2>
                    <span className="returns-count">
                        {returns.length} Returns
                    </span>
                </div>
                <div className="header-actions">
                    <div className="search-container">
                        <FaSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search by RMA, Order ID, or Customer..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="filter-group">
                        <select 
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="filter-select"
                        >
                            <option value="all">All Statuses</option>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                            <option value="processing">Processing</option>
                            <option value="completed">Completed</option>
                        </select>
                        <select 
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="filter-select"
                        >
                            <option value="all">All Types</option>
                            <option value="refund">Refund</option>
                            <option value="exchange">Exchange</option>
                            <option value="repair">Repair</option>
                        </select>
                    </div>
                    <button 
                        className="new-return-btn"
                        onClick={() => setShowNewReturnModal(true)}
                    >
                        <FaPlus /> New Return
                    </button>
                </div>
            </div>

            <div className="returns-grid">
                {filteredReturns.map(ret => (
                    <div key={ret.id} className="return-card">
                        <div className="return-header">
                            <div className="return-ids">
                                <h3>{ret.id}</h3>
                                <span className="order-id">Order: {ret.orderId}</span>
                            </div>
                            <span className={`status-badge ${getStatusBadgeClass(ret.status)}`}>
                                {ret.status}
                            </span>
                        </div>

                        <div className="customer-info">
                            <div className="info-item">
                                <FaUser className="info-icon" />
                                <span>{ret.customer.name}</span>
                            </div>
                            <div className="info-item">
                                <FaCalendarAlt className="info-icon" />
                                <span>{new Date(ret.dateRequested).toLocaleDateString()}</span>
                            </div>
                            <div className="info-item">
                                <FaTag className="info-icon" />
                                <span>{ret.returnType}</span>
                            </div>
                        </div>

                        <div className="products-section">
                            <h4>Returned Products</h4>
                            {ret.products.map(product => (
                                <div key={product.id} className="product-item">
                                    <div className="product-details">
                                        <span className="product-name">{product.name}</span>
                                        <span className="product-quantity">Qty: {product.quantity}</span>
                                    </div>
                                    <div className="product-meta">
                                        <span className="reason">{product.reason}</span>
                                        <span className="condition">{product.condition}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {ret.notes && (
                            <div className="notes-section">
                                <h4>Notes</h4>
                                <p>{ret.notes}</p>
                            </div>
                        )}

                        <div className="return-actions">
                            {ret.status === 'pending' && (
                                <>
                                    <button 
                                        className="approve-btn"
                                        onClick={() => handleStatusUpdate(ret.id, 'approved')}
                                    >
                                        <FaCheck /> Approve
                                    </button>
                                    <button 
                                        className="reject-btn"
                                        onClick={() => handleStatusUpdate(ret.id, 'rejected')}
                                    >
                                        <FaTimes /> Reject
                                    </button>
                                </>
                            )}
                            {ret.status === 'approved' && ret.returnType === 'refund' && (
                                <button 
                                    className="refund-btn"
                                    onClick={() => handleRefundProcess(ret.id)}
                                >
                                    <FaMoneyBillWave /> Process Refund
                                </button>
                            )}
                            {ret.status === 'approved' && ret.returnType === 'exchange' && (
                                <button className="exchange-btn">
                                    <FaExchangeAlt /> Process Exchange
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* New Return Modal would go here */}
            
        </div>
    );
};

export default Returns; 