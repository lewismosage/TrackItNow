import React from 'react';
import { useNavigate } from 'react-router-dom';

export const ProtectedComponent = ({ children }) => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('access_token');

  if (!isAuthenticated) {
    return (
      <div className="auth-prompt">
        <p>Please sign in to access this feature</p>
        <button onClick={() => navigate('/signin')}>Sign In</button>
      </div>
    );
  }

  return children;
}; 