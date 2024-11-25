// invoices.js
import React, { useState, useEffect } from 'react';
import { FaSearch, FaPlus, FaFileExport, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import '../styles/Invoices.css';
import NewInvoiceModal from '../components/NewInvoiceModal';
import ViewInvoiceModal from '../components/ViewInvoiceModal';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { fetchInvoices, createInvoice, updateInvoice, deleteInvoice } from '../services/invoiceService';

const Invoices = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [dateRange, setDateRange] = useState('all');
    const [showNewInvoiceModal, setShowNewInvoiceModal] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadInvoices();
    }, []);

    const loadInvoices = async () => {
        try {
            setLoading(true);
            const data = await fetchInvoices();
            setInvoices(data);
            setError(null);
        } catch (err) {
            setError('Failed to load invoices');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const getStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case 'paid':
                return 'status-paid';
            case 'pending':
                return 'status-pending';
            case 'overdue':
                return 'status-overdue';
            case 'cancelled':
                return 'status-cancelled';
            default:
                return '';
        }
    };

    const handleExportPDF = (invoice) => {
        // PDF export logic here
        console.log('Exporting invoice as PDF:', invoice.id);
    };

    const handleSendEmail = (invoice) => {
        // Email sending logic here
        console.log('Sending invoice email to:', invoice.customer.email);
    };

    const filteredInvoices = invoices.filter(invoice => {
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch = 
            (invoice.id?.toLowerCase() || '').includes(searchLower) ||
            (invoice.customer?.name?.toLowerCase() || '').includes(searchLower) ||
            (invoice.orderId?.toLowerCase() || '').includes(searchLower);
        
        const matchesStatus = filterStatus === 'all' || invoice.status === filterStatus;
        
        return matchesSearch && matchesStatus;
    });

    const calculateTotalsByStatus = () => {
        const totals = {
            paid: 0,
            pending: 0,
            cancelled: 0,
            overdue: 0,
            total: 0
        };

        filteredInvoices.forEach(invoice => {
            const amount = invoice.total || 0;
            totals[invoice.status.toLowerCase()] += amount;
            totals.total += amount;
        });

        return totals;
    };

    const handleNewInvoice = async (newInvoice) => {
        try {
            const createdInvoice = await createInvoice(newInvoice);
            await loadInvoices();
            setShowNewInvoiceModal(false);
        } catch (error) {
            console.error('Failed to create invoice:', error);
            // show an error notification
        }
    };

    const handleView = (invoice) => {
        setSelectedInvoice(invoice);
        setShowViewModal(true);
    };

    const handleEdit = (invoice) => {
        setSelectedInvoice(invoice);
        setShowEditModal(true);
    };

    const handleDelete = async (invoice) => {
        confirmAlert({
            title: 'Confirm Deletion',
            message: `Are you sure you want to delete invoice ${invoice.id}?`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        try {
                            await deleteInvoice(invoice.id);
                            setInvoices(prevInvoices => 
                                prevInvoices.filter(inv => inv.id !== invoice.id)
                            );
                        } catch (error) {
                            console.error('Failed to delete invoice:', error);
                            // Handle error
                        }
                    }
                },
                {
                    label: 'No',
                    onClick: () => {}
                }
            ]
        });
    };

    const handleEditSubmit = async (updatedInvoice) => {
        try {
            await updateInvoice(updatedInvoice.id, updatedInvoice);
            await loadInvoices();
            setShowEditModal(false);
            setSelectedInvoice(null);
        } catch (error) {
            console.error('Failed to update invoice:', error);
            // show an error notification
        }
    };

    return (
        <div className="invoices-main-container">
            {/* Header Section */}
            <div className="invoices-header">
                <div className="header-title">
                    <h2>Invoices Management</h2>
                    <div className="invoice-stats">
                        <div className="stats-row">
                            <span>Total Invoices: {filteredInvoices.length}</span>
                            <span className="status-total paid">
                                Paid: ${calculateTotalsByStatus().paid.toFixed(2)}
                            </span>
                            <span className="status-total pending">
                                Pending: ${calculateTotalsByStatus().pending.toFixed(2)}
                            </span>
                            <span className="status-total cancelled">
                                Cancelled: ${calculateTotalsByStatus().cancelled.toFixed(2)}
                            </span>
                            <span className="status-total overdue">
                                Overdue: ${calculateTotalsByStatus().overdue.toFixed(2)}
                            </span>
                            <span className="total-revenue">
                                Total Revenue: ${calculateTotalsByStatus().total.toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>
                <button 
                    className="new-invoice-btn"
                    onClick={() => setShowNewInvoiceModal(true)}
                >
                    <FaPlus /> Create Invoice
                </button>
            </div>

            {/* Filters and Search Section */}
            <div className="invoices-controls">
                <div className="search-container">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search invoices..."
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
                        <option value="paid">Paid</option>
                        <option value="pending">Pending</option>
                        <option value="overdue">Overdue</option>
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
                        <option value="year">This Year</option>
                    </select>
                </div>
            </div>

            {/* Invoices Table */}
            <div className="invoices-table-container">
                <table className="invoices-table">
                    <thead>
                        <tr>
                            <th>Invoice ID</th>
                            <th>Order ID</th>
                            <th>Date</th>
                            <th>Due Date</th>
                            <th>Customer</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredInvoices.map((invoice) => (
                            <tr key={invoice.id}>
                                <td>{invoice.id}</td>
                                <td>{invoice.orderId}</td>
                                <td>{new Date(invoice.date).toLocaleDateString()}</td>
                                <td>{new Date(invoice.dueDate).toLocaleDateString()}</td>
                                <td>
                                    <div className="customer-info">
                                        <span className="customer-name">{invoice.customer.name}</span>
                                        <span className="customer-email">{invoice.customer.email}</span>
                                    </div>
                                </td>
                                <td>${invoice.total.toFixed(2)}</td>
                                <td>
                                    <span className={`status-badge ${getStatusClass(invoice.status)}`}>
                                        {invoice.status}
                                    </span>
                                </td>
                                <td>
                                    <div className="action-buttons">
                                        <button 
                                            className="view-btn"
                                            onClick={() => handleView(invoice)}
                                            title="View Invoice"
                                        >
                                            <FaEye />
                                        </button>
                                        <button 
                                            className="edit-btn"
                                            onClick={() => handleEdit(invoice)}
                                            title="Edit Invoice"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button 
                                            className="delete-button"
                                            onClick={() => handleDelete(invoice)}
                                            title="Delete Invoice"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showNewInvoiceModal && (
                <NewInvoiceModal
                    onClose={() => setShowNewInvoiceModal(false)}
                    onSubmit={handleNewInvoice}
                />
            )}

            {showViewModal && selectedInvoice && (
                <ViewInvoiceModal
                    invoice={selectedInvoice}
                    onClose={() => {
                        setShowViewModal(false);
                        setSelectedInvoice(null);
                    }}
                />
            )}

            {showEditModal && selectedInvoice && (
                <NewInvoiceModal
                    invoice={selectedInvoice}
                    onClose={() => {
                        setShowEditModal(false);
                        setSelectedInvoice(null);
                    }}
                    onSubmit={handleEditSubmit}
                    isEditing={true}
                />
            )}
        </div>
    );
};

export default Invoices;
