import React, { useState, useEffect } from 'react';
import { FaPlus, FaSearch, FaMapMarkerAlt, FaFilter } from 'react-icons/fa';
import InventoryTable from '../components/InventoryTable';
import AddItemModal from '../components/AddItemModal';
import AddLocationModal from '../components/AddLocationModal';
import { fetchLocations } from '../services/locationService';
import '../styles/Inventory.css';

const Inventory = () => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddLocationModal, setShowAddLocationModal] = useState(false);
  const [locations, setLocations] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    inStock: false
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    loadLocations();
  }, []);

  const loadLocations = async () => {
    try {
      const fetchedLocations = await fetchLocations();
      setLocations(fetchedLocations);
    } catch (error) {
      console.error('Failed to load locations:', error);
    }
  };

  const handleLocationChange = (e) => {
    const value = e.target.value;
    if (value === 'add_location') {
      setShowAddLocationModal(true);
      // Reset the select to previous value
      e.target.value = selectedLocation;
    } else {
      setSelectedLocation(value);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowEditModal(true);
  };

  const handleTotalItems = (count) => {
    setTotalItems(count);
  };

  return (
    <div className="inventory-container">
      {/* Header Section */}
      <div className="inventory-header">
        <div className="header-title">
          <h2>Inventory Management</h2>
          <div className="stats-container">
            <span className="item-count">Total Items: {totalItems}</span>
            <button 
              className="add-item-btn"
              onClick={() => setShowAddModal(true)}
            >
              <FaPlus /> Add New Item
            </button>
          </div>
        </div>

        {/* Search and Filters Row */}
        <div className="search-filter-row">
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              className="search-bar"
              placeholder="Search items..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>

          <div className="button-group">
            <select
              value={selectedLocation}
              onChange={handleLocationChange}
              className="location-dropdown"
            >
              <option value="">All Locations</option>
              <option value="nairobi">Nairobi</option>
              <option value="dubai">Dubai</option>
              <option value="miami">Miami</option>
              <option value="china">China</option>
              <option value="russia">Russia</option>
              <option value="london">London</option>
              <option value="paris">Paris</option>
              <option disabled>──────────</option>
              <option value="add_location">+ Add New Location</option>
            </select>
          </div>
        </div>

        {/* Advanced Filters */}
        <div className="advanced-filters">
          <div className="filter-group">
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="filter-select"
            >
              <option value="">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="furniture">Furniture</option>
              <option value="supplies">Supplies</option>
            </select>
          </div>

          <div className="filter-group">
            <input
              type="number"
              placeholder="Min Price"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
              className="price-filter"
            />
            <input
              type="number"
              placeholder="Max Price"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              className="price-filter"
            />
          </div>

          <div className="filter-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={filters.inStock}
                onChange={(e) => handleFilterChange('inStock', e.target.checked)}
              />
              In Stock Only
            </label>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <InventoryTable 
        searchQuery={searchQuery}
        selectedLocation={selectedLocation}
        filters={filters}
        onEdit={handleEdit}
        onUpdateTotalItems={handleTotalItems}
      />

      {/* Add Item Modal */}
      {showAddModal && (
        <AddItemModal
          onClose={() => setShowAddModal(false)}
          locations={locations}
          title="Add New Item"
        />
      )}

      {/* Edit Item Modal */}
      {showEditModal && editingItem && (
        <AddItemModal
          onClose={() => {
            setShowEditModal(false);
            setEditingItem(null);
          }}
          locations={locations}
          editMode={true}
          itemToEdit={editingItem}
          title="Edit Item"
        />
      )}

      {/* Add Location Modal */}
      {showAddLocationModal && (
        <AddLocationModal
          onClose={() => setShowAddLocationModal(false)}
          onLocationAdded={loadLocations}
        />
      )}
    </div>
  );
};

export default Inventory;
