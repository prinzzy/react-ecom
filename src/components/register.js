import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import "./register.css";
import "./notification.css";

function Register({ closeModal, openLogin }) {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Password tidak cocok");
      setSuccessMessage("");
      return;
    }

    try {
      const response = await register(email, password);
      console.log("Register response:", response); // untuk debugging

      setSuccessMessage("Registrasi berhasil! Silakan login.");
      setErrorMessage("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      // Redirect ke login setelah 2 detik
      setTimeout(() => {
        openLogin();
      }, 2000);
    } catch (error) {
      console.error("Register error in component:", error);
      setErrorMessage(error.message || "Registrasi gagal, silakan coba lagi.");
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
          <label htmlFor="confirmPassword">Konfirmasi Password</label>
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

      {successMessage && (
        <div className="notification success">{successMessage}</div>
      )}
      {errorMessage && <div className="notification error">{errorMessage}</div>}

      <div className="back-link">
        <button onClick={openLogin} className="back-button">
          Kembali ke Login
        </button>
      </div>
    </div>
  );
}

export default Register;
