import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaTruck, FaFileInvoice, FaPhone, FaEnvelope, FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import '../styles/Suppliers.css';
import { fetchSuppliers, createSupplier, updateSupplier, deleteSupplier } from '../services/supplierService';

// Add Supplier Modal Component
const SupplierModal = ({ show, onClose, onSave, supplier = null }) => {
    const [formData, setFormData] = useState({
        name: '',
        contact: '',
        email: '',
        phone: '',
        address: '',
        status: 'active'
    });
    const [errors, setErrors] = useState({});

    // Reset form data when modal opens/closes or supplier changes
    useEffect(() => {
        if (supplier) {
            setFormData({
                name: supplier.name,
                contact: supplier.contact,
                email: supplier.email,
                phone: supplier.phone,
                address: supplier.address,
                status: supplier.status
            });
        } else {
            setFormData({
                name: '',
                contact: '',
                email: '',
                phone: '',
                address: '',
                status: 'active'
            });
        }
    }, [supplier, show]);

    const validateForm = () => {
        const newErrors = {};
        
        // Email validation
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        
        // Other validations as needed...
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSave({
                name: formData.name,
                contact: formData.contact,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                status: formData.status,
                rating: supplier?.rating || 0,
                totalOrders: supplier?.totalOrders || 0
            });
        }
        onClose();
    };

    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>{supplier ? 'Edit Supplier' : 'Add New Supplier'}</h2>
                    <button className="modal-close" onClick={onClose}>×</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Company Name:</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Contact Person:</label>
                        <input
                            type="text"
                            value={formData.contact}
                            onChange={(e) => setFormData({...formData, contact: e.target.value})}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => {
                                setFormData({...formData, email: e.target.value});
                                setErrors({...errors, email: ''});
                            }}
                            className={errors.email ? 'error' : ''}
                            required
                        />
                        {errors.email && <div className="error-message">{errors.email}</div>}
                    </div>
                    <div className="form-group">
                        <label>Phone:</label>
                        <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Address:</label>
                        <input
                            type="text"
                            value={formData.address}
                            onChange={(e) => setFormData({...formData, address: e.target.value})}
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
                            <option value="pending">Pending</option>
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

const Suppliers = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadSuppliers();
    }, []);

    const loadSuppliers = async () => {
        try {
            setLoading(true);
            const data = await fetchSuppliers();
            setSuppliers(data);
            setError(null);
        } catch (err) {
            setError('Failed to load suppliers');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddSupplier = async (newSupplier) => {
        try {
            const createdSupplier = await createSupplier(newSupplier);
            setSuppliers(prev => [...prev, createdSupplier]);
            setShowAddModal(false);
        } catch (error) {
            console.error('Failed to create supplier:', error);
            alert(error.message || 'Failed to create supplier. Please try again.');
        }
    };

    const handleEditSupplier = async (updatedSupplier) => {
        try {
            const result = await updateSupplier(updatedSupplier.id, updatedSupplier);
            setSuppliers(prev => 
                prev.map(sup => sup.id === result.id ? result : sup)
            );
            setSelectedSupplier(null);
        } catch (error) {
            console.error('Failed to update supplier:', error);
            // Handle error
        }
    };

    const handleDeleteSupplier = async (supplierId) => {
        if (window.confirm('Are you sure you want to delete this supplier?')) {
            try {
                await deleteSupplier(supplierId);
                setSuppliers(prev => prev.filter(sup => sup.id !== supplierId));
            } catch (error) {
                console.error('Failed to delete supplier:', error);
                // Handle error
            }
        }
    };

    const handleSupplierClick = (supplier) => {
        setSelectedSupplier(supplier);
    };

    return (
        <div className="suppliers-container">
            <div className="suppliers-header">
                <div className="header-title">
                    <h2>Supplier Management</h2>
                    <span className="supplier-count">
                        Total Suppliers: {suppliers.length}
                    </span>
                </div>
                <div className="header-actions">
                    <div className="search-container">
                        <FaSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search suppliers..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                        />
                    </div>
                    <button 
                        className="add-supplier-btn"
                        onClick={() => setShowAddModal(true)}
                    >
                        <FaPlus /> Add Supplier
                    </button>
                </div>
            </div>

            <div className="suppliers-grid">
                {suppliers
                    .filter(supplier => 
                        supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        supplier.email.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map(supplier => (
                        <div key={supplier.id} className="supplier-card" onClick={() => handleSupplierClick(supplier)}>
                            <div className="supplier-header">
                                <div className="supplier-icon">
                                    <FaTruck />
                                </div>
                                <div className="supplier-info">
                                    <h3>{supplier.name}</h3>
                                    <span className={`status-badge ${supplier.status}`}>
                                        {supplier.status}
                                    </span>
                                </div>
                            </div>
                            <div className="supplier-details">
                                <div className="detail-item">
                                    <FaEnvelope className="detail-icon" />
                                    <span>{supplier.email}</span>
                                </div>
                                <div className="detail-item">
                                    <FaPhone className="detail-icon" />
                                    <span>{supplier.phone}</span>
                                </div>
                                <div className="detail-item">
                                    <FaMapMarkerAlt className="detail-icon" />
                                    <span>{supplier.address}</span>
                                </div>
                                <div className="detail-item">
                                    <FaStar className="detail-icon" />
                                    <span>Rating: {supplier.rating}/5</span>
                                </div>
                            </div>
                            <div className="supplier-footer">
                                <div className="supplier-stats">
                                    <span>Orders: {supplier.totalOrders}</span>
                                    <span>Last Order: {new Date(supplier.lastOrder).toLocaleDateString()}</span>
                                </div>
                                <div className="supplier-actions">
                                    <button 
                                        className="edit-btn"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedSupplier(supplier);
                                            setShowAddModal(true);
                                        }}
                                    >
                                        <FaEdit />
                                    </button>
                                    <button 
                                        className="delete-btn"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteSupplier(supplier.id);
                                        }}
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>

            <SupplierModal
                show={showAddModal}
                onClose={() => {
                    setShowAddModal(false);
                    setSelectedSupplier(null);
                }}
                onSave={selectedSupplier ? handleEditSupplier : handleAddSupplier}
                supplier={selectedSupplier}
            />
        </div>
    );
};

export default Suppliers; 