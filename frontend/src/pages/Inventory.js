import React, { useState } from 'react';
import InventoryTable from '../components/InventoryTable';
import '../styles/Inventory.css';

const Inventory = () => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [locationLabel, setLocationLabel] = useState('Locations');
  const [searchQuery, setSearchQuery] = useState('');

  const handleLocationChange = (e) => {
    const selected = e.target.value;
    setSelectedLocation(selected);
    setLocationLabel(selected ? selected.replace(/-/g, ' ').toUpperCase() : 'Locations');
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const scrollToBottom = () => {
    const addItemSection = document.getElementById('add-item-section');
    if (addItemSection) {
      addItemSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="inventory-container">
      <div className="inventory-header">
        <h2>Inventory</h2>
        <input
          type="text"
          className="search-bar"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button className="search-btn">Search</button>

        {/* Location Dropdown */}
        <select
          name="location"
          value={selectedLocation}
          onChange={handleLocationChange}
          className="location-dropdown"
        >
          <option value="">{locationLabel}</option>
          <option value="new-york">New York</option>
          <option value="los-angeles">Los Angeles</option>
          <option value="chicago">Chicago</option>
          <option value="miami">Miami</option>
          <option value="dallas">Dallas</option>
        </select>

        {/* Add New Item Button */}
        <button className="add-item-btn" onClick={scrollToBottom}>
          Add New Item
        </button>
      </div>
      <InventoryTable searchQuery={searchQuery} />
    </div>
  );
};

export default Inventory;
