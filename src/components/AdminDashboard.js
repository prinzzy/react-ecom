import React from "react";
import "./AdminDashboard.css";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-sidebar">
        <h2>Admin Panel</h2>
        <nav>
          <ul>
            <li>
              <a href="#products">Kelola Produk</a>
            </li>
            <li>
              <a href="#orders">Pesanan</a>
            </li>
            <li>
              <a href="#users">Pengguna</a>
            </li>
            <li>
              <a href="#settings">Pengaturan</a>
            </li>
          </ul>
        </nav>
        <div className="logout-container">
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </div>
      <div className="admin-content">
        <h1>Selamat Datang, Admin!</h1>
        <div className="admin-stats">
          <div className="stat-card">
            <h3>Total Produk</h3>
            <p>150</p>
          </div>
          <div className="stat-card">
            <h3>Pesanan Hari Ini</h3>
            <p>24</p>
          </div>
          <div className="stat-card">
            <h3>Total Pengguna</h3>
            <p>1,234</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
