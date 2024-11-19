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
    const registerUrl = `${window.location.origin}/djangoapp/register`;

    try {
      const response = await fetch(registerUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName,
          password,
          firstName,
          lastName,
          email,
        }),
      });
      const json = await response.json();
      if (json.status) {
        sessionStorage.setItem("username", json.userName);
        goHome();
      } else if (json.error === "Already Registered") {
        alert("User with this username is already registered");
        goHome();
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return React.createElement("div", { className: "register-container" },
    React.createElement("div", { className: "header" },
      React.createElement("span", { className: "header-text" }, "Sign Up"),
      React.createElement("span", { className: "close-icon", onClick: goHome }, "\u00D7")
    ),
    React.createElement("hr"),
    React.createElement("form", { onSubmit: register, className: "register-form" },
      React.createElement("div", { className: "entry-group" },
        React.createElement("img", { src: userIcon, className: "input-icon", alt: "Username" }),
        React.createElement("input", {
          type: "text",
          name: "username",
          placeholder: "Username",
          className: "input-field",
          onChange: (e) => setUserName(e.target.value),
          required: true
        })
      ),
      React.createElement("div", { className: "entry-group" },
        React.createElement("img", { src: userIcon, className: "input-icon", alt: "First Name" }),
        React.createElement("input", {
          type: "text",
          name: "first_name",
          placeholder: "First Name",
          className: "input-field",
          onChange: (e) => setFirstName(e.target.value),
          required: true
        })
      ),
      React.createElement("div", { className: "entry-group" },
        React.createElement("img", { src: userIcon, className: "input-icon", alt: "Last Name" }),
        React.createElement("input", {
          type: "text",
          name: "last_name",
          placeholder: "Last Name",
          className: "input-field",
          onChange: (e) => setLastName(e.target.value),
          required: true
        })
      ),
      React.createElement("div", { className: "entry-group" },
        React.createElement("img", { src: emailIcon, className: "input-icon", alt: "Email" }),
        React.createElement("input", {
          type: "email",
          name: "email",
          placeholder: "Email",
          className: "input-field",
          onChange: (e) => setEmail(e.target.value),
          required: true
        })
      ),
      React.createElement("div", { className: "entry-group" },
        React.createElement("img", { src: passwordIcon, className: "input-icon", alt: "Password" }),
        React.createElement("input", {
          type: "password",
          name: "password",
          placeholder: "Password",
          className: "input-field",
          onChange: (e) => setPassword(e.target.value),
          required: true
        })
      ),
      React.createElement("button", { type: "submit", className: "submit-button" }, "Register")
    )
  );
};

export default Register;
