// settings.js
import React, { useState, useEffect } from 'react';
import { FaUser, FaBell, FaGlobe, FaWarehouse, FaSignOutAlt } from 'react-icons/fa';
import '../styles/Settings.css';

const Settings = () => {
  const [currentUser, setCurrentUser] = useState('');
  
  useEffect(() => {
    // Get username from localStorage
    const username = localStorage.getItem('username');
    setCurrentUser(username || '');
  }, []);

  const [settings, setSettings] = useState({
    // Inventory Settings
    defaultLocation: 'nairobi',
    lowStockThreshold: 10,
    enableStockAlerts: true,
    
    // Notification Preferences
    emailNotifications: true,
    stockAlerts: true,
    orderUpdates: true,
    
    // Regional Settings
    currency: 'USD',
    dateFormat: 'MM/DD/YYYY',
    timezone: 'UTC',
    
    // System Settings
    autoRefreshInterval: '5',
    dataExportFormat: 'csv'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('username');
    window.location.href = '/signin';
  };

  const saveSettings = () => {
    // Here you would save to backend
    localStorage.setItem('userSettings', JSON.stringify(settings));
    alert('Settings saved successfully!');
  };

  return (
    <div className="settings-main-container">
      {/* Account Overview */}
      <div className="settings-header">
        <div className="settings-title">
          <h2>Settings</h2>
          <p className="current-user">
            <FaUser className="user-icon" />
            {currentUser}
          </p>
        </div>
        <button className="signout-button" onClick={handleSignOut}>
          <FaSignOutAlt /> Sign Out
        </button>
      </div>

      <div className="settings-grid">
        {/* Inventory Settings */}
        <div className="settings-card">
          <div className="card-header">
            <FaWarehouse className="card-icon" />
            <h3>Inventory Settings</h3>
          </div>
          <div className="card-content">
            <div className="setting-item">
              <label>Default Location</label>
              <select 
                name="defaultLocation" 
                value={settings.defaultLocation}
                onChange={handleChange}
                className="setting-input"
              >
                <option value="nairobi">Nairobi</option>
                <option value="dubai">Dubai</option>
                <option value="miami">Miami</option>
                <option value="china">China</option>
                <option value="russia">Russia</option>
              </select>
            </div>
            <div className="setting-item">
              <label>Low Stock Alert Threshold</label>
              <input
                type="number"
                name="lowStockThreshold"
                value={settings.lowStockThreshold}
                onChange={handleChange}
                className="setting-input"
                min="0"
              />
            </div>
            <div className="setting-item">
              <label>Enable Stock Alerts</label>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  name="enableStockAlerts"
                  checked={settings.enableStockAlerts}
                  onChange={handleChange}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="settings-card">
          <div className="card-header">
            <FaBell className="card-icon" />
            <h3>Notification Preferences</h3>
          </div>
          <div className="card-content">
            <div className="setting-item">
              <label>Email Notifications</label>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  name="emailNotifications"
                  checked={settings.emailNotifications}
                  onChange={handleChange}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="setting-item">
              <label>Stock Alert Notifications</label>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  name="stockAlerts"
                  checked={settings.stockAlerts}
                  onChange={handleChange}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="setting-item">
              <label>Order Update Notifications</label>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  name="orderUpdates"
                  checked={settings.orderUpdates}
                  onChange={handleChange}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        {/* Regional Settings */}
        <div className="settings-card">
          <div className="card-header">
            <FaGlobe className="card-icon" />
            <h3>Regional Settings</h3>
          </div>
          <div className="card-content">
            <div className="setting-item">
              <label>Currency</label>
              <select 
                name="currency" 
                value={settings.currency}
                onChange={handleChange}
                className="setting-input"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="JPY">JPY (¥)</option>
              </select>
            </div>
            <div className="setting-item">
              <label>Date Format</label>
              <select 
                name="dateFormat" 
                value={settings.dateFormat}
                onChange={handleChange}
                className="setting-input"
              >
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>
            <div className="setting-item">
              <label>Time Zone</label>
              <select 
                name="timezone" 
                value={settings.timezone}
                onChange={handleChange}
                className="setting-input"
              >
                <option value="UTC">UTC</option>
                <option value="EST">EST</option>
                <option value="PST">PST</option>
                <option value="GMT">GMT</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="settings-footer">
        <button className="save-settings-btn" onClick={saveSettings}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Settings;
