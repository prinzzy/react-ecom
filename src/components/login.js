import React, { useState } from "react";
import { useAuth } from "../context/authContext"; // Import useAuth from the correct file
import "./login.css"; // Make sure to have styles here
import "./notification.css";

function Login({ openRegister, closeModal }) {
  const { login } = useAuth(); // Get the login function from context
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for error
  const [successMessage, setSuccessMessage] = useState(""); // State for success

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password); // Call the login function from context
      setSuccessMessage("Login successful!"); // Set success message
      setErrorMessage(""); // Clear error message
      setEmail(""); // Clear form fields
      setPassword(""); // Clear form fields

      // Close the modal after success
      setTimeout(() => {
        closeModal(); // Close modal after success
      }, 2000); // Close modal after 2 seconds to show success message
    } catch (error) {
      setErrorMessage("Login failed, please try again."); // Set error message
      setSuccessMessage(""); // Clear success message
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>

      {/* Show success or error message */}
      {successMessage && (
        <div className="notification success">{successMessage}</div>
      )}
      {errorMessage && <div className="notification error">{errorMessage}</div>}

      {/* Register link */}
      <div className="register-link">
        <p>
          Don't have an account?{" "}
          <span onClick={openRegister} className="register-button">
            Register here
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
