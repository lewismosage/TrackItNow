import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import axios from 'axios';

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const loggedInUser = localStorage.getItem('username');
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username');
    setUser(null);
    navigate('/signin');
  };

  return (
    <header className="header">
      <h2>Inventory Management System</h2>
      {user ? (
        <>
          <span>{user}</span>
          <button onClick={handleLogout}>Log Out</button>
        </>
      ) : (
        <Link to="/signin">
          <button>Sign In</button>
        </Link>
      )}
    </header>
  );
};

export default Header;
