import React, { useState } from 'react';
import { 
    FaHistory, 
    FaFilter, 
    FaDownload, 
    FaSearch,
    FaArrowUp,
    FaArrowDown,
    FaBox,
    FaExchangeAlt,
    FaTrash,
    FaEdit,
    FaArrowRight
} from 'react-icons/fa';
import '../styles/InventoryHistory.css';

const InventoryHistory = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [dateRange, setDateRange] = useState('all');
    const [sortField, setSortField] = useState('date');
    const [sortDirection, setSortDirection] = useState('desc');

    // Sample history data
    const [historyData] = useState([
        {
            id: 'TRX-001',
            type: 'stock_in',
            productId: 'PRD-001',
            productName: 'Laptop Dell XPS 13',
            quantity: 10,
            previousStock: 5,
            newStock: 15,
            date: '2024-02-20T10:30:00',
            user: 'John Doe',
            location: 'Warehouse A',
            reference: 'PO-2024-001',
            notes: 'Regular stock replenishment'
        },
        {
            id: 'TRX-002',
            type: 'stock_out',
            productId: 'PRD-002',
            productName: 'Wireless Mouse',
            quantity: 5,
            previousStock: 20,
            newStock: 15,
            date: '2024-02-19T15:45:00',
            user: 'Jane Smith',
            location: 'Store Room B',
            reference: 'ORD-2024-015',
            notes: 'Customer order fulfillment'
        },
        // Add more sample data
    ]);

    const getActivityIcon = (type) => {
        switch(type) {
            case 'stock_in':
                return <FaArrowUp className="activity-icon in" />;
            case 'stock_out':
                return <FaArrowDown className="activity-icon out" />;
            case 'transfer':
                return <FaExchangeAlt className="activity-icon transfer" />;
            case 'adjustment':
                return <FaEdit className="activity-icon adjust" />;
            case 'removal':
                return <FaTrash className="activity-icon remove" />;
            default:
                return <FaBox className="activity-icon" />;
        }
    };

    const formatActivityType = (type) => {
        return type.split('_').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    };

    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const filteredAndSortedHistory = historyData
        .filter(item => {
            if (filterType !== 'all' && item.type !== filterType) return false;
            if (searchQuery) {
                const searchLower = searchQuery.toLowerCase();
                return (
                    item.productName.toLowerCase().includes(searchLower) ||
                    item.reference.toLowerCase().includes(searchLower) ||
                    item.user.toLowerCase().includes(searchLower)
                );
            }
            return true;
        })
        .sort((a, b) => {
            let comparison = 0;
            switch (sortField) {
                case 'date':
                    comparison = new Date(b.date) - new Date(a.date);
                    break;
                case 'product':
                    comparison = a.productName.localeCompare(b.productName);
                    break;
                case 'quantity':
                    comparison = a.quantity - b.quantity;
                    break;
                default:
                    comparison = 0;
            }
            return sortDirection === 'asc' ? comparison : -comparison;
        });

    return (
        <div className="inventory-history-container">
            <div className="history-header">
                <div className="header-title">
                    <h2>Inventory History</h2>
                    <span className="record-count">
                        {filteredAndSortedHistory.length} Records
                    </span>
                </div>
                <div className="header-actions">
                    <div className="search-container">
                        <FaSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search by product, reference, or user..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="filter-group">
                        <select 
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="filter-select"
                        >
                            <option value="all">All Activities</option>
                            <option value="stock_in">Stock In</option>
                            <option value="stock_out">Stock Out</option>
                            <option value="transfer">Transfer</option>
                            <option value="adjustment">Adjustment</option>
                            <option value="removal">Removal</option>
                        </select>
                        <select 
                            value={dateRange}
                            onChange={(e) => setDateRange(e.target.value)}
                            className="filter-select"
                        >
                            <option value="all">All Time</option>
                            <option value="today">Today</option>
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                        </select>
                        <button className="export-btn">
                            <FaDownload /> Export
                        </button>
                    </div>
                </div>
            </div>

            <div className="history-table-container">
                <table className="history-table">
                    <thead>
                        <tr>
                            <th>Activity</th>
                            <th onClick={() => handleSort('date')} className="sortable">
                                Date/Time
                                {sortField === 'date' && (
                                    <span className="sort-indicator">
                                        {sortDirection === 'asc' ? '↑' : '↓'}
                                    </span>
                                )}
                            </th>
                            <th onClick={() => handleSort('product')} className="sortable">
                                Product
                                {sortField === 'product' && (
                                    <span className="sort-indicator">
                                        {sortDirection === 'asc' ? '↑' : '↓'}
                                    </span>
                                )}
                            </th>
                            <th onClick={() => handleSort('quantity')} className="sortable">
                                Quantity
                                {sortField === 'quantity' && (
                                    <span className="sort-indicator">
                                        {sortDirection === 'asc' ? '↑' : '↓'}
                                    </span>
                                )}
                            </th>
                            <th>Stock Level</th>
                            <th>Location</th>
                            <th>User</th>
                            <th>Reference</th>
                            <th>Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAndSortedHistory.map(item => (
                            <tr key={item.id}>
                                <td>
                                    <div className="activity-type">
                                        {getActivityIcon(item.type)}
                                        <span>{formatActivityType(item.type)}</span>
                                    </div>
                                </td>
                                <td>{new Date(item.date).toLocaleString()}</td>
                                <td>{item.productName}</td>
                                <td className="quantity-cell">
                                    <span className={`quantity ${item.type}`}>
                                        {item.type === 'stock_in' ? '+' : '-'}{item.quantity}
                                    </span>
                                </td>
                                <td>
                                    <div className="stock-change">
                                        <span className="previous-stock">{item.previousStock}</span>
                                        <FaArrowRight className="arrow-icon" />
                                        <span className="new-stock">{item.newStock}</span>
                                    </div>
                                </td>
                                <td>{item.location}</td>
                                <td>{item.user}</td>
                                <td>
                                    <span className="reference-number">{item.reference}</span>
                                </td>
                                <td>
                                    <span className="notes-text">{item.notes}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InventoryHistory; 