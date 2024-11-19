import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Orders from './pages/Orders';
import Invoices from './pages/Invoices';
import Customers from './pages/Customers';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Header />
          <Routes>
            {/* Redirect from '/' to '/dashboard' */}
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<h2>404 - Page Not Found</h2>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
