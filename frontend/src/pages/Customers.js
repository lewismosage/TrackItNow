// customers.js
import React, { useState, useEffect } from 'react';
import { FaSearch, FaPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import '../styles/Customers.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import ViewCustomerModal from '../components/ViewCustomerModal';
import EditCustomerModal from '../components/EditCustomerModal';
import AddCustomerModal from '../components/AddCustomerModal';
import { fetchCustomers, createCustomer, updateCustomer, deleteCustomer } from '../services/customerService';

const Customers = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadCustomers();
    }, []);

    const loadCustomers = async () => {
        try {
            setLoading(true);
            const data = await fetchCustomers();
            setCustomers(data);
            setError(null);
        } catch (err) {
            setError('Failed to load customers');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleView = (customer) => {
        setSelectedCustomer(customer);
        setShowViewModal(true);
    };

    const handleEdit = (customer) => {
        setSelectedCustomer(customer);
        setShowEditModal(true);
    };

    const handleDelete = (customer) => {
        confirmAlert({
            title: 'Confirm Deletion',
            message: `Are you sure you want to delete customer ${customer.name}?`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        try {
                            await deleteCustomer(customer.id);
                            setCustomers(prevCustomers => 
                                prevCustomers.filter(cust => cust.id !== customer.id)
                            );
                        } catch (error) {
                            console.error('Failed to delete customer:', error);
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

    const handleNewCustomer = async (customerData) => {
        try {
            const createdCustomer = await createCustomer(customerData);
            setCustomers(prevCustomers => [createdCustomer, ...prevCustomers]);
            setShowAddModal(false);
        } catch (error) {
            console.error('Failed to create customer:', error);
            // Handle error (show notification, etc.)
        }
    };

    const filteredCustomers = customers.filter(customer => {
        const searchLower = searchQuery.toLowerCase();
        return (
            customer.name.toLowerCase().includes(searchLower) ||
            customer.email.toLowerCase().includes(searchLower) ||
            customer.phone.includes(searchQuery)
        );
    });

    return (
        <div className="customers-main-container">
            <div className="customers-header">
                <div className="header-title">
                    <h2>Customer Management</h2>
                    <div className="stats-container">
                        <span className="customer-count">Total Customers: {customers.length}</span>
                    </div>
                </div>

                <div className="search-filter-row">
                    <div className="search-container">
                        <FaSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search customers..."
                            className="search-bar"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button 
                        className="add-customer-btn"
                        onClick={() => setShowAddModal(true)}
                    >
                        <FaPlus /> Add New Customer
                    </button>
                </div>
            </div>

            {/* Customers Table */}
            <div className="customers-table-container">
                <table className="customers-table">
                    <thead>
                        <tr>
                            <th>Customer ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Join Date</th>
                            <th>Total Orders</th>
                            <th>Total Spent</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCustomers.map((customer) => (
                            <tr key={customer.id}>
                                <td>{customer.id}</td>
                                <td>{customer.name}</td>
                                <td>{customer.email}</td>
                                <td>{customer.phone}</td>
                                <td>{new Date(customer.joinDate).toLocaleDateString()}</td>
                                <td>{customer.totalOrders}</td>
                                <td>${customer.totalSpent.toFixed(2)}</td>
                                <td>
                                    <span className={`status-badge ${customer.status}`}>
                                        {customer.status}
                                    </span>
                                </td>
                                <td>
                                    <div className="action-buttons">
                                        <button 
                                            className="view-btn"
                                            onClick={() => handleView(customer)}
                                            title="View Customer"
                                        >
                                            <FaEye />
                                        </button>
                                        <button 
                                            className="edit-btn"
                                            onClick={() => handleEdit(customer)}
                                            title="Edit Customer"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button 
                                            className="delete-button"
                                            onClick={() => handleDelete(customer)}
                                            title="Delete Customer"
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

            {/* modals here */}
            {showViewModal && selectedCustomer && (
                <ViewCustomerModal
                    customer={selectedCustomer}
                    onClose={() => {
                        setShowViewModal(false);
                        setSelectedCustomer(null);
                    }}
                />
            )}

            {showEditModal && selectedCustomer && (
                <EditCustomerModal
                    customer={selectedCustomer}
                    onClose={() => {
                        setShowEditModal(false);
                        setSelectedCustomer(null);
                    }}
                    onSubmit={(updatedCustomer) => {
                        setCustomers(prevCustomers =>
                            prevCustomers.map(cust =>
                                cust.id === updatedCustomer.id ? updatedCustomer : cust
                            )
                        );
                        setShowEditModal(false);
                        setSelectedCustomer(null);
                    }}
                    isEditing={true}
                />
            )}

            {showAddModal && (
                <AddCustomerModal
                    onClose={() => setShowAddModal(false)}
                    onSubmit={handleNewCustomer}
                />
            )}
        </div>
    );
};

export default Customers;
