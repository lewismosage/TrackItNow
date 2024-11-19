import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/SignIn.css';

import Header from '../components/Header'; 

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(true); 
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', {
        username: email,
        password,
      });

      if (response.data.success) {
        localStorage.setItem('username', email);
        navigate('/');
      } else {
        alert('Invalid Credentials');
      }
    } catch (error) {
      console.error(error);
      alert('Error logging in');
    }
  };

  return (
    open && (
      <div>
        <Header />
        <div 
          className="modalBackdrop"
          onClick={() => {
            setOpen(false);
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()} 
            className="modalContainer"
          >
            <form onSubmit={handleSubmit}>
              <div className="login_panel">
              <h3>Welcome back</h3>
                {/* Username input*/}
                <div className="input-group">
                  <input
                    type="text"
                    name="username"
                    value={userName}
                    className="input_field"
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Username"
                    required
                  />
                  <label className="floating-label">Username</label>
                </div>

                {/* Password input */}
                <div className="input-group">
                  <input
                    type="password"
                    name="password"
                    value={password}
                    className="input_field"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                  />
                  <label className="floating-label">Password</label>
                </div>

                <div>
                  <input className="action_button" type="submit" value="Login" />
                  <input
                    className="action_button"
                    type="button"
                    value="Cancel"
                    onClick={() => setOpen(false)}
                  />
                </div>
                <a className="loginlink" href="/register">
                  <span className="normal-text">Don't have an account? </span>
                  <span className="signup-text">Sign Up</span>
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default SignIn; 