// settings.js
import React, { useState } from 'react';
import '../styles/Settings.css';

const Settings = () => {
  const [preferences, setPreferences] = useState({
    theme: 'light',
    language: 'en',
    notifications: true,
    currency: 'USD',
    autoUpdate: true,
  });

  // Sample account information
  const [account, setAccount] = useState({
    name: 'John Doe', // Replace with dynamic name (from session or auth context)
    organization: 'Inventory Corp', // Replace with organization name or relevant info
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPreferences({ ...preferences, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setPreferences({ ...preferences, [name]: checked });
  };

  const handleSignOut = () => {
    // Handle sign-out logic here (clear session, token, etc.)
    alert('You have been signed out!');
  };

  const saveSettings = () => {
    // Save preferences to backend or local storage
    alert('Settings saved successfully!');
  };

  return (
    <div className="settings-container">
      <h2>Settings</h2>

      {/* Account Section */}
      <div className="settings-section account-section">
        <h3>Account</h3>
        <div className="setting-item">
          <p>Hello, {account.name || account.organization}!</p>
        </div>
        <div className="setting-item">
          <button className="sign-out-button" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      </div>

      {/* User Preferences Section */}
      <div className="settings-section">
        <h3>User Preferences</h3>
        <div className="setting-item">
          <label>Theme:</label>
          <select name="theme" value={preferences.theme} onChange={handleInputChange}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <div className="setting-item">
          <label>Language:</label>
          <select name="language" value={preferences.language} onChange={handleInputChange}>
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </div>
      </div>

      {/* System Settings Section */}
      <div className="settings-section">
        <h3>System Settings</h3>
        <div className="setting-item">
          <label>Currency:</label>
          <select name="currency" value={preferences.currency} onChange={handleInputChange}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="JPY">JPY</option>
          </select>
        </div>

        <div className="setting-item">
          <label>Auto Update:</label>
          <input
            type="checkbox"
            name="autoUpdate"
            checked={preferences.autoUpdate}
            onChange={handleCheckboxChange}
          />
        </div>
      </div>

      {/* Notification Settings Section */}
      <div className="settings-section">
        <h3>Notification Settings</h3>
        <div className="setting-item">
          <label>Email Notifications:</label>
          <input
            type="checkbox"
            name="notifications"
            checked={preferences.notifications}
            onChange={handleCheckboxChange}
          />
        </div>

        <div className="setting-item">
          <label>Push Notifications:</label>
          <input
            type="checkbox"
            name="pushNotifications"
            checked={preferences.notifications}
            onChange={handleCheckboxChange}
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="save-settings">
        <button onClick={saveSettings}>Save Settings</button>
      </div>
    </div>
  );
};

export default Settings;
