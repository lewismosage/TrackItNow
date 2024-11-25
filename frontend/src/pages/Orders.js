// orders.js
import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaPlus, FaFileExport } from 'react-icons/fa';
import '../styles/Orders.css';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import NewOrderModal from '../components/NewOrderModal';
import ViewOrderModal from '../components/ViewOrderModal';
import EditOrderModal from '../components/EditOrderModal';
import { fetchOrders, createOrder, updateOrder, deleteOrder } from '../services/orderService';

const Orders = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [dateRange, setDateRange] = useState('all');
    const [showNewOrderModal, setShowNewOrderModal] = useState(false);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await fetchOrders();
            console.log('Fetched orders:', data);
            setOrders(data);
        } catch (err) {
            console.error('Failed to load orders:', err);
            setError(err.message || 'Failed to load orders');
        } finally {
            setLoading(false);
        }
    };

    const getStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return 'status-pending';
            case 'processing':
                return 'status-processing';
            case 'completed':
                return 'status-completed';
            case 'cancelled':
                return 'status-cancelled';
            default:
                return '';
        }
    };

    const handleExport = () => {
        try {
            // Get the filtered orders that are currently displayed
            const dataToExport = filteredOrders.map(order => ({
                'Order ID': order.id,
                'Date': new Date(order.date).toLocaleDateString(),
                'Customer': order.customer,
                'Items': order.items.map(item => `${item.quantity}x ${item.name}`).join(', '),
                'Total': `$${order.total.toFixed(2)}`,
                'Location': order.location,
                'Status': order.status
            }));

            // Create worksheet
            const ws = XLSX.utils.json_to_sheet(dataToExport);
            
            // Create workbook
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Orders");

            // Generate Excel file
            const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            
            // Save file
            const fileName = `Orders_Export_${new Date().toLocaleDateString()}.xlsx`;
            const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(blob, fileName);

        } catch (error) {
            console.error('Export failed:', error);
            alert('Failed to export orders. Please try again.');
        }
    };

    // Alternative CSV Export
    const handleCSVExport = () => {
        try {
            const csvContent = filteredOrders.map(order => {
                return [
                    order.id,
                    new Date(order.date).toLocaleDateString(),
                    order.customer,
                    order.items.map(item => `${item.quantity}x ${item.name}`).join('; '),
                    order.total.toFixed(2),
                    order.location,
                    order.status
                ].join(',');
            });

            // header row
            const header = ['Order ID', 'Date', 'Customer', 'Items', 'Total', 'Location', 'Status'].join(',');
            const csv = [header, ...csvContent].join('\n');

            // Create and download file
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const fileName = `Orders_Export_${new Date().toLocaleDateString()}.csv`;
            saveAs(blob, fileName);

        } catch (error) {
            console.error('CSV Export failed:', error);
            alert('Failed to export orders. Please try again.');
        }
    };

    // Export Options Dropdown
    const [showExportOptions, setShowExportOptions] = useState(false);

    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            order.customer.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const handleNewOrder = async (newOrder) => {
        try {
            const createdOrder = await createOrder(newOrder);
            setOrders(prevOrders => [createdOrder, ...prevOrders]);
        } catch (error) {
            console.error('Failed to create order:', error);
            // Handle error (show notification, etc.)
        }
    };

    const handleView = (order) => {
        setSelectedOrder(order);
        setShowViewModal(true);
    };

    const handleEdit = (order) => {
        setSelectedOrder(order);
        setShowEditModal(true);
    };

    const handleSaveEdit = async (updatedOrder) => {
        try {
            console.log('Saving edited order:', updatedOrder); // Debug log
            const savedOrder = await updateOrder(updatedOrder.id, updatedOrder);
            setOrders(prevOrders => 
                prevOrders.map(order => 
                    order.id === savedOrder.id ? savedOrder : order
                )
            );
            setShowEditModal(false);
            setSelectedOrder(null);
        } catch (error) {
            console.error('Failed to update order:', error);
            alert(error.message || 'Failed to update order');
        }
    };

    const handleDelete = async (orderId) => {
        if (window.confirm('Are you sure you want to delete this order?')) {
            try {
                console.log('Deleting order:', orderId); // Debug log
                await deleteOrder(orderId);
                setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
            } catch (error) {
                console.error('Failed to delete order:', error);
                alert(error.message || 'Failed to delete order');
            }
        }
    };

    return (
        <div className="orders-main-container">
            {loading && <div className="loading">Loading orders...</div>}
            {error && <div className="error-message">Error: {error}</div>}

            {/* Header Section */}
            <div className="orders-header">
                <div className="header-title">
                    <h2>Orders Management</h2>
                    <span className="order-count">Total Orders: {orders.length}</span>
                </div>
                <button 
                    className="new-order-btn" 
                    onClick={() => setShowNewOrderModal(true)}
                >
                    <FaPlus /> New Order
                </button>
            </div>

            {showNewOrderModal && (
                <NewOrderModal
                    onClose={() => setShowNewOrderModal(false)}
                    onSubmit={handleNewOrder}
                />
            )}

            {/* Filters and Search Section */}
            <div className="orders-controls">
                <div className="search-container">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search orders..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                </div>

                <div className="filters-container">
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="filter-select"
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
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

                    <div className="export-dropdown">
                        <button 
                            className="export-btn" 
                            onClick={() => setShowExportOptions(!showExportOptions)}
                        >
                            <FaFileExport /> Export
                        </button>
                        {showExportOptions && (
                            <div className="export-options">
                                <button onClick={handleExport}>Export as Excel</button>
                                <button onClick={handleCSVExport}>Export as CSV</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Orders Table */}
            <div className="orders-table-container">
                <table className="orders-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Date</th>
                            <th>Customer</th>
                            <th>Items</th>
                            <th>Total</th>
                            <th>Location</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{new Date(order.date).toLocaleDateString()}</td>
                                <td>{order.customer}</td>
                                <td>
                                    {order.items.map((item, index) => (
                                        <div key={index} className="order-item">
                                            {item.quantity}x {item.name}
                                        </div>
                                    ))}
                                </td>
                                <td>${order.total.toFixed(2)}</td>
                                <td>{order.location}</td>
                                <td>
                                    <span className={`status-badge ${getStatusClass(order.status)}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td>
                                    <div className="action-buttons">
                                        <button 
                                            className="view-btn"
                                            onClick={() => handleView(order)}
                                        >
                                            View
                                        </button>
                                        <button 
                                            className="edit-btn"
                                            onClick={() => handleEdit(order)}
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            className="delete-button"
                                            onClick={() => handleDelete(order.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showViewModal && selectedOrder && (
                <ViewOrderModal
                    order={selectedOrder}
                    onClose={() => {
                        setShowViewModal(false);
                        setSelectedOrder(null);
                    }}
                />
            )}

            {showEditModal && selectedOrder && (
                <EditOrderModal
                    order={selectedOrder}
                    onClose={() => {
                        setShowEditModal(false);
                        setSelectedOrder(null);
                    }}
                    onSave={handleSaveEdit}
                />
            )}
        </div>
    );
};

export default Orders;