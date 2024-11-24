import React, { useState } from "react";
import "../styles/Register.css";
import userIcon from "../components/assets/person.png";
import emailIcon from "../components/assets/email.png";
import passwordIcon from "../components/assets/password.png";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const goHome = () => {
    window.location.href = window.location.origin;
  };

  const register = async (e) => {
    e.preventDefault();
    try {
      console.log('Sending registration data:', {
        username: userName,
        password: password,
        email: email,
        first_name: firstName,
        last_name: lastName
      });

      const response = await fetch('http://127.0.0.1:8000/api/auth/register/', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userName,
          password: password,
          email: email,
          first_name: firstName,
          last_name: lastName
        }),
      });
      
      const data = await response.json();
      console.log('Registration response:', data);

      if (response.ok) {
        // Store the tokens
        localStorage.setItem('access_token', data.tokens.access);
        localStorage.setItem('refresh_token', data.tokens.refresh);
        localStorage.setItem('username', data.user.username);
        window.location.href = '/';
      } else {
        alert(data.detail || JSON.stringify(data));
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Create Account</h2>
        <form onSubmit={register}>
          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter first name"
                required
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter last name"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Choose a username"
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              required
            />
          </div>
          <button type="submit" className="register-button">Register</button>
        </form>
        <div className="signin-link">
          Already have an account?
          <a href="/signin">Sign In</a>
        </div>
      </div>
    </div>
  );
};

export default Register;
