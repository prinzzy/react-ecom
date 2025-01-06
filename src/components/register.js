import React, { useState } from "react";
import { useAuth } from "../context/authContext"; // Import the useAuth context
import "./register.css"; // Ensure your styles are defined
import "./notification.css";

function Register({ closeModal, openLogin }) {
  const { register } = useAuth(); // Get the register function from context
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setSuccessMessage("");
      return;
    }

    try {
      await register(email, password); // Call the register function from context
      setSuccessMessage("Registration successful!");
      setErrorMessage("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        closeModal(); // Close the modal after 2 seconds
      }, 2000);
    } catch (error) {
      setErrorMessage("Registration failed, please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>

      {/* Show success or error message */}
      {successMessage && (
        <div className="notification success">{successMessage}</div>
      )}
      {errorMessage && <div className="notification error">{errorMessage}</div>}

      <div className="back-link">
        <button onClick={openLogin} className="back-button">
          Back to Login
        </button>
      </div>
    </div>
  );
}

export default Register;
