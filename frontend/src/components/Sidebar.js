import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaHome, FaBox, FaShoppingCart, FaFileInvoice, 
         FaUsers, FaChartBar, FaCog } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation(); 

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  // Function to check if link is active
  const isLinkActive = (path) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="sidebar-header">
        {isExpanded && <h2>TrackItNow</h2>}
        <button className="toggle-button" onClick={toggleSidebar}>
          <FaBars />
        </button>
      </div>
      <ul>
        <li>
          <Link to="/" className={isLinkActive('/') ? 'active' : ''}>
            <FaHome className="icon" />
            <span className="link-text">{isExpanded && 'Dashboard'}</span>
          </Link>
        </li>
        <li>
          <Link to="/inventory" className={isLinkActive('/inventory') ? 'active' : ''}>
            <FaBox className="icon" />
            <span className="link-text">{isExpanded && 'Inventory'}</span>
          </Link>
        </li>
        <li>
          <Link to="/orders" className={isLinkActive('/orders') ? 'active' : ''}>
            <FaShoppingCart className="icon" />
            <span className="link-text">{isExpanded && 'Orders'}</span>
          </Link>
        </li>
        <li>
          <Link to="/invoices" className={isLinkActive('/invoices') ? 'active' : ''}>
            <FaFileInvoice className="icon" />
            <span className="link-text">{isExpanded && 'Invoices'}</span>
          </Link>
        </li>
        <li>
          <Link to="/customers" className={isLinkActive('/customers') ? 'active' : ''}>
            <FaUsers className="icon" />
            <span className="link-text">{isExpanded && 'Customers'}</span>
          </Link>
        </li>
        <li>
          <Link to="/reports" className={isLinkActive('/reports') ? 'active' : ''}>
            <FaChartBar className="icon" />
            <span className="link-text">{isExpanded && 'Reports'}</span>
          </Link>
        </li>
        <li>
          <Link to="/settings" className={isLinkActive('/settings') ? 'active' : ''}>
            <FaCog className="icon" />
            <span className="link-text">{isExpanded && 'Settings'}</span>
          </Link>
        </li>
      </ul>

      <div className="sidebar-footer">
        <div className="version-info">
          {isExpanded ? 'Version 0.1' : 'v0.1'}
        </div>
        <div className="footer-links">
          {isExpanded && (
            <>
              <Link to="/about">About Us</Link>
              <Link to="/new-features">What's New</Link>
              <div className="copyright">© 2024 TrackItNow</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
