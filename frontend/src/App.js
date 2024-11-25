import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import Settings from './pages/Settings';
import Orders from './pages/Orders';
import Invoices from './pages/Invoices';
import Customers from './pages/Customers';
import Reports from './pages/Reports';
import Warehouses from './pages/Warehouses';
import StockAlerts from './pages/StockAlerts';
import InventoryHistory from './pages/InventoryHistory';
import BarcodeScanner from './pages/BarcodeScanner';
import Returns from './pages/Returns';
import Suppliers from './pages/Suppliers';
import AboutUs from './pages/AboutUs';
import NewFeatures from './pages/NewFeatures';
import './App.css';

// To only protect certain actions, not the entire route
const ProtectedComponent = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('access_token');
  
  // If user is not authenticated, show sign-in prompt
  if (!isAuthenticated) {
    return (
      <div className="auth-prompt">
        <p>Please sign in to perform this action</p>
        <button onClick={() => window.location.href = '/signin'}>Sign In</button>
      </div>
    );
  }

  return children;
};

function App() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  return (
    <Router>
      <div className="app-container">
        <Sidebar 
          isExpanded={isSidebarExpanded} 
          onToggle={() => setIsSidebarExpanded(!isSidebarExpanded)} 
        />
        <div className={`main-content ${!isSidebarExpanded ? 'sidebar-collapsed' : ''}`}>
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />            
            {/* Dashboard route */}
            <Route path="/dashboard" element={<Dashboard />} />            
            {/* Inventory route */}
            <Route path="/inventory" element={<Inventory />} />
            {/* Warehouses route */}
            <Route path="/warehouses" element={<Warehouses />} />
            {/* Stock Alerts route */}
            <Route path="/stock-alerts" element={<StockAlerts />} />
            {/* Inventory History route */}
            <Route path="/inventory-history" element={<InventoryHistory />} />
            {/* Barcode Scanner route */}
            <Route path="/barcode-scanner" element={<BarcodeScanner />} />
            {/* Returns route */}
            <Route path="/returns" element={<Returns />} />
            {/* Suppliers route */}
            <Route path="/suppliers" element={<Suppliers />} />
            {/* Orders route */}
            <Route path="/orders" element={<Orders />} />
            {/* Invoices route */}
            <Route path="/invoices" element={<Invoices />} />
            {/* Customers route */}
            <Route path="/customers" element={<Customers />} />
            {/* Reports route */}
            <Route path="/reports" element={<Reports />} />
            {/* Settings route */}
            <Route path="/settings" element={<Settings />} />
            {/* Authentication routes */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/register" element={<Register />} />
            {/* Add new routes */}
            <Route path="/about" element={<AboutUs />} />
            <Route path="/new-features" element={<NewFeatures />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;