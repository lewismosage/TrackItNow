import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const isAuthenticated = !!localStorage.getItem('token');
  const username = localStorage.getItem('username');
  const navigate = useNavigate();

  // Get alerts count from localStorage or default to 0
  const alertsCount = JSON.parse(localStorage.getItem('stockAlerts'))?.length || 0;

  const handleNotificationClick = () => {
    navigate('/stock-alerts');
  };

  const handleBrandClick = () => {
    navigate('/dashboard');
  };

  return (
    <nav className="navbar">
      <span 
        className="navbar-brand" 
        onClick={handleBrandClick}
        style={{ cursor: 'pointer' }}
      >
        TrackItNow
      </span>
      
      <div className="navbar-right">
        <div className="notification-container" onClick={handleNotificationClick} style={{ cursor: 'pointer' }}>
          <FaBell className="notification-icon" />
          <span className="notification-badge">{alertsCount}</span>
        </div>
        
        {isAuthenticated ? (
          <div className="auth-container">
            <span className="username">{username}</span>
            
          </div>
        ) : (
          <div className="auth-container">
            <Link to="/signin" className="sign-in-btn">Sign In</Link>
            
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
