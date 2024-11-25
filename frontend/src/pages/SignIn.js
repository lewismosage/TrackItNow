import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SignIn.css';

const SignIn = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Sending login data:', {
        username: userName,
        password: password
      });

      const response = await fetch('http://127.0.0.1:8000/api/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: userName,
          password: password,
        }),
      });

      const data = await response.json();
      console.log('Login response:', data);

      if (response.ok) {
        localStorage.setItem('access_token', data.tokens.access);
        localStorage.setItem('refresh_token', data.tokens.refresh);
        localStorage.setItem('username', data.username);
        navigate('/dashboard');
      } else {
        alert(data.detail || 'Invalid credentials');
      }
    } catch (error) {
      console.error("Login error:", error);
      alert('Error logging in');
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-box">
        <h2>Welcome Back</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit">Sign In</button>
        </form>
        <div className="signup-link">
          Don't have an account?
          <a href="/register">Sign Up</a>
        </div>
      </div>
    </div>
  );
};

export default SignIn; 